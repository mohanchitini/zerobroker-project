import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Building2, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Home className="h-6 w-6" />
            <span>ZeroBroker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/buy" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Buy Property
            </Link>
            <Link to="/rent" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Rent Property
            </Link>
            <Link to="/list-property" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              List Property
            </Link>
            <Button variant="hero" size="sm" asChild>
              <Link to="/list-property">Post Free Ad</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link
              to="/buy"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buy Property
            </Link>
            <Link
              to="/rent"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rent Property
            </Link>
            <Link
              to="/list-property"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              List Property
            </Link>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <Link to="/list-property">Post Free Ad</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
