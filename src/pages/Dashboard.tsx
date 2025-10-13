import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard, { Property } from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import Messages from "@/components/Messages";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    fetchUserProperties(session.user.id);
  };

  const fetchUserProperties = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load your properties",
        variant: "destructive",
      });
    } else {
      const formattedProperties: Property[] = (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        price: parseFloat(p.price),
        location: p.location,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area,
        type: p.listing_type as "sale" | "rent",
        propertyType: p.property_type,
        image: p.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800",
        featured: p.featured,
      }));
      setProperties(formattedProperties);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage your properties and messages
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-6">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  Your Listings ({properties.length})
                </h2>
                <Button onClick={() => navigate("/list-property")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Property
                </Button>
              </div>

              {loading ? (
                <p className="text-center text-muted-foreground">Loading properties...</p>
              ) : properties.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    You haven't listed any properties yet
                  </p>
                  <Button onClick={() => navigate("/list-property")}>
                    <Plus className="mr-2 h-4 w-4" />
                    List Your First Property
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
              <Messages userId={user?.id} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;