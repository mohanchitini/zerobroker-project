import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  property_id: string | null;
  is_read: boolean;
  created_at: string;
  sender?: {
    full_name: string;
  };
  receiver?: {
    full_name: string;
  };
}

interface MessagesProps {
  userId: string;
}

const Messages = ({ userId }: MessagesProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchMessages();
      setupRealtimeSubscription();
    }
  }, [userId]);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchMessages = async () => {
    setLoading(true);
    const { data: messagesData, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Fetch sender and receiver profiles separately
    const userIds = new Set<string>();
    messagesData?.forEach(msg => {
      userIds.add(msg.sender_id);
      userIds.add(msg.receiver_id);
    });

    const { data: profilesData } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", Array.from(userIds));

    const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

    const messagesWithProfiles = messagesData?.map(msg => ({
      ...msg,
      sender: profilesMap.get(msg.sender_id),
      receiver: profilesMap.get(msg.receiver_id),
    })) || [];

    setMessages(messagesWithProfiles);
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading messages...</p>;
  }

  if (messages.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No messages yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Your Messages</h3>
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isReceived = message.receiver_id === userId;
            const otherUser = isReceived ? message.sender : message.receiver;

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isReceived ? '' : 'flex-row-reverse'}`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${isReceived ? '' : 'text-right'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {otherUser?.full_name || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(message.created_at)}
                    </span>
                  </div>
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      isReceived
                        ? 'bg-muted'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default Messages;