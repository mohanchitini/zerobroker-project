import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContactSellerDialog from "@/components/ContactSellerDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, BedDouble, Bath, Maximize, Phone, Mail, ArrowLeft } from "lucide-react";

interface PropertyDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  property_type: string;
  listing_type: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  user_id: string;
}

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  useEffect(() => {
    checkAuthAndFetch();
  }, [id]);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    await fetchProperty();
  };

  const fetchProperty = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load property details",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setProperty(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to={property.listing_type === "sale" ? "/buy" : "/rent"}>
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800"}
                alt={property.title}
                className="w-full h-96 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                For {property.listing_type === "sale" ? "Sale" : "Rent"}
              </Badge>
              {property.featured && (
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                  Featured
                </Badge>
              )}
            </div>

            {/* Property Details */}
            <Card className="p-6 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-border">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-primary" />
                  <span className="font-medium">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="font-medium">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-primary" />
                  <span className="font-medium">{property.area} sqft</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">About this Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="p-6 sticky top-24 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {property.listing_type === "sale" ? "Total Price" : "Monthly Rent"}
                </p>
                <p className="text-4xl font-bold text-primary">
                  ₹{property.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-semibold text-lg">Contact Seller</h3>
                <p className="text-sm text-muted-foreground">
                  Interested in this property? Contact the owner directly - No broker fees!
                </p>
                
                <Button variant="hero" className="w-full" size="lg">
                  <Phone className="h-5 w-5" />
                  Call Owner
                </Button>
                
                <Button variant="outline" className="w-full" size="lg" onClick={() => setContactDialogOpen(true)}>
                  <Mail className="h-5 w-5" />
                  Send Message
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-accent font-medium">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span>Zero Commission Guaranteed</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ContactSellerDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        propertyId={property.id}
        sellerId={property.user_id}
        propertyTitle={property.title}
      />
    </div>
  );
};

export default PropertyDetail;
