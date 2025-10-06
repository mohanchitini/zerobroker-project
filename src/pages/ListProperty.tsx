import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2 } from "lucide-react";

const ListProperty = () => {
  const { toast } = useToast();
  const [listingType, setListingType] = useState("sale");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Property Listed Successfully!",
      description: "Your property has been listed. Buyers will contact you directly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">List Your Property</h1>
            <p className="text-lg text-muted-foreground">
              Post your property for FREE - No commission, No hidden charges
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="listing-type">Listing Type *</Label>
                <Select value={listingType} onValueChange={setListingType}>
                  <SelectTrigger id="listing-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="property-title">Property Title *</Label>
                <Input
                  id="property-title"
                  placeholder="e.g., Luxury 3BHK Apartment in Whitefield"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="property-type">Property Type *</Label>
                <Select required>
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="house">Independent House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="1"
                    placeholder="3"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    placeholder="2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sqft) *</Label>
                  <Input
                    id="area"
                    type="number"
                    min="100"
                    placeholder="1450"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  {listingType === "sale" ? "Sale Price (₹) *" : "Monthly Rent (₹) *"}
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="1000"
                  placeholder={listingType === "sale" ? "8500000" : "25000"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Whitefield, Bangalore"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Property Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property, nearby amenities, special features..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-name">Your Name *</Label>
                <Input
                  id="contact-name"
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone Number *</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" variant="hero" className="w-full">
                  List Property for FREE
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-3">
                  By listing, you agree to be contacted by interested buyers directly
                </p>
              </div>
            </form>
          </Card>

          <div className="mt-8 p-6 bg-accent/10 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-accent">💡 Pro Tip</h3>
            <p className="text-muted-foreground">
              Add high-quality photos and detailed descriptions to get more buyer inquiries. 
              Properties with complete information get 3x more responses!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
