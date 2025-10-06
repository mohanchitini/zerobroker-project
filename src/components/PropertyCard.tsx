import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Bath, Maximize, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "sale" | "rent";
  propertyType: string;
  image: string;
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-elevated)] transition-all duration-300 group">
      <Link to={`/property/${property.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {property.featured && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            For {property.type === "sale" ? "Sale" : "Rent"}
          </Badge>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to={`/property/${property.id}`}>
          <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-primary">
              ₹{property.price.toLocaleString("en-IN")}
            </p>
            {property.type === "rent" && (
              <p className="text-xs text-muted-foreground">per month</p>
            )}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/property/${property.id}`}>
              <Phone className="h-4 w-4" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
