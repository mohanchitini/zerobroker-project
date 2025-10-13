import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, Upload, X, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ListProperty = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [listingType, setListingType] = useState("sale");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to list a property",
          variant: "destructive",
        });
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    };
    checkAuth();
  }, [navigate, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive",
      });
      return;
    }

    setImageFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Upload images first
    const imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);

        if (uploadError) {
          toast({
            title: "Image upload failed",
            description: uploadError.message,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);
        
        imageUrls.push(publicUrl);
      }
    }
    
    const propertyData = {
      user_id: user.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      price: parseFloat(formData.get("price") as string),
      property_type: formData.get("propertyType") as string,
      listing_type: listingType,
      bedrooms: parseInt(formData.get("bedrooms") as string),
      bathrooms: parseInt(formData.get("bathrooms") as string),
      area: parseInt(formData.get("area") as string),
      images: imageUrls.length > 0 ? imageUrls : null,
      status: "active",
    };

    const { error } = await supabase.from("properties").insert([propertyData]);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Property Listed Successfully!",
        description: "Your property has been listed. Buyers will contact you directly.",
      });
      navigate("/");
    }
    setLoading(false);
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
                  name="title"
                  placeholder="e.g., Luxury 3BHK Apartment in Whitefield"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="property-type">Property Type *</Label>
                <Select name="propertyType" required>
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
                    name="bedrooms"
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
                    name="bathrooms"
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
                    name="area"
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
                  name="price"
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
                  name="location"
                  placeholder="e.g., Whitefield, Bangalore"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Property Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your property, nearby amenities, special features..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Property Images (Max 5)</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WEBP (MAX. 5MB each)
                        </p>
                      </div>
                      <input
                        id="images"
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" variant="hero" className="w-full" disabled={loading}>
                  {loading ? "Listing..." : "List Property for FREE"}
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
