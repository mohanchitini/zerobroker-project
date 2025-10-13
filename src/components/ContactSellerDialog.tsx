import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface ContactSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  sellerId: string;
  propertyTitle: string;
}

const ContactSellerDialog = ({
  open,
  onOpenChange,
  propertyId,
  sellerId,
  propertyTitle,
}: ContactSellerDialogProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to contact the seller",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("messages").insert({
      sender_id: session.user.id,
      receiver_id: sellerId,
      property_id: propertyId,
      content: message,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
      setMessage("");
      onOpenChange(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
          <DialogDescription>
            Send a message about: {propertyTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="I'm interested in this property..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendMessage} disabled={loading}>
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSellerDialog;