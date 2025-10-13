import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, TrendingUp, Users, Target, Award, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About ZeroBroker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Revolutionizing the real estate market by eliminating unnecessary middlemen and commission fees
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                ZeroBroker was created with a simple yet powerful vision: to empower property owners 
                and buyers by removing the traditional broker model that adds unnecessary costs to 
                real estate transactions.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that in today's digital age, property owners should have the freedom to 
                list and manage their properties directly, while buyers should be able to connect 
                with sellers without paying hefty commission fees.
              </p>
              <p className="text-muted-foreground">
                Our platform provides all the tools needed for secure, transparent, and commission-free 
                property transactions - putting the power back in your hands.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800"
                alt="Modern building"
                className="rounded-lg shadow-[var(--shadow-elevated)]"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-12">Why ZeroBroker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 text-center hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Money</h3>
              <p className="text-muted-foreground">
                Save up to 5% on property value by eliminating broker commission fees. That's lakhs of rupees in your pocket!
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
              <p className="text-muted-foreground">
                Connect directly with genuine buyers and sellers. No middlemen, no confusion, just transparent communication.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-[var(--shadow-elevated)] transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-muted-foreground">
                All properties are verified to ensure authenticity. Deal with confidence knowing every listing is genuine.
              </p>
            </Card>
          </div>

          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                Clear communication, honest dealings, and no hidden charges. What you see is what you get.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We strive to provide the best platform experience with cutting-edge technology and features.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
              <p className="text-muted-foreground">
                Putting control back in the hands of property owners and buyers to make their own decisions.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Revolution</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of the movement that's changing how India buys, sells, and rents properties. 
              Start saving today!
            </p>
            <div className="flex justify-center gap-4">
              <a href="/buy" className="inline-block">
                <span className="text-primary hover:underline font-semibold">Browse Properties</span>
              </a>
              <span className="text-muted-foreground">or</span>
              <a href="/list-property" className="inline-block">
                <span className="text-primary hover:underline font-semibold">List Your Property</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;