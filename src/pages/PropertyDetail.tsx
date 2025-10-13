import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContactSellerDialog from "@/components/ContactSellerDialog";
import { sampleProperties } from "@/data/sampleProperties";
import { MapPin, BedDouble, Bath, Maximize, Phone, Mail, ArrowLeft } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = sampleProperties.find((p) => p.id === id);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

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
          <Link to={property.type === "sale" ? "/buy" : "/rent"}>
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
                src={property.image}
                alt={property.title}
                className="w-full h-96 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                For {property.type === "sale" ? "Sale" : "Rent"}
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
                  This {property.propertyType.toLowerCase()} offers excellent living space in the prime location of {property.location}. 
                  With {property.bedrooms} bedrooms and {property.bathrooms} bathrooms, it provides comfortable accommodation 
                  {property.type === "rent" ? " for families and working professionals" : " for modern living"}.
                  The property spans {property.area} square feet and comes with modern amenities.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Spacious {property.propertyType}</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Prime Location</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>24/7 Security</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Power Backup</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Car Parking</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Gym & Pool</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="p-6 sticky top-24 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {property.type === "sale" ? "Total Price" : "Monthly Rent"}
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
        sellerId="sample-seller-id"
        propertyTitle={property.title}
      />
    </div>
  );
};

export default PropertyDetail;
