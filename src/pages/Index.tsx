import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { sampleProperties } from "@/data/sampleProperties";
import heroImage from "@/assets/hero-real-estate.jpg";

const Index = () => {
  const featuredProperties = sampleProperties.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(25, 118, 130, 0.9) 0%, rgba(25, 118, 130, 0.7) 100%), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Property, Your Profit
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            No Middlemen. No Commission. Direct Connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/buy">Browse Properties</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/list-property">List Your Property Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ZeroBroker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero Commission</h3>
              <p className="text-muted-foreground">
                Save thousands by connecting directly with property owners
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
              <p className="text-muted-foreground">
                Chat directly with sellers and make informed decisions
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Search className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-muted-foreground">
                Advanced filters to find your perfect property quickly
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-muted-foreground">
                All properties verified for genuine and secure transactions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Button variant="outline" asChild>
              <Link to="/buy">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied users who found their perfect property without paying any commission
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/buy">Start Searching Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 ZeroBroker. Your Property, Your Profit – No Middlemen, No Commission.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
