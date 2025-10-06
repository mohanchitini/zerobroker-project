import { useState } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { sampleProperties } from "@/data/sampleProperties";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const RentProperties = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const rentProperties = sampleProperties.filter((p) => p.type === "rent");

  const filteredProperties = rentProperties.filter((property) => {
    const matchesLocation = property.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesType = propertyType === "all" || property.propertyType === propertyType;
    
    let matchesPrice = true;
    if (priceRange === "0-15") matchesPrice = property.price < 15000;
    else if (priceRange === "15-25") matchesPrice = property.price >= 15000 && property.price < 25000;
    else if (priceRange === "25-35") matchesPrice = property.price >= 25000 && property.price < 35000;
    else if (priceRange === "35+") matchesPrice = property.price >= 35000;

    return matchesLocation && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-secondary/10 to-primary/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Properties for Rent</h1>
          <p className="text-lg text-muted-foreground">
            Find your perfect rental home without broker fees
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="House">House</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Monthly Rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-15">Under ₹15,000</SelectItem>
                <SelectItem value="15-25">₹15,000 - ₹25,000</SelectItem>
                <SelectItem value="25-35">₹25,000 - ₹35,000</SelectItem>
                <SelectItem value="35+">Above ₹35,000</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchLocation("");
              setPropertyType("all");
              setPriceRange("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
            </p>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No properties found matching your criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RentProperties;
