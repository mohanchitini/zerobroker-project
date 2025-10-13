import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">ZeroBroker</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your Property, Your Profit – No Middlemen, No Commission. 
              Revolutionizing real estate transactions in India.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/buy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link to="/rent" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link to="/list-property" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  List Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <a href="mailto:info@zerobroker.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@zerobroker.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <a href="tel:+911234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Mumbai, Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 ZeroBroker. All rights reserved. Your Property, Your Profit – No Middlemen, No Commission.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;