import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Laptop, Menu } from "lucide-react";
import saiInfotechLogo from "@assets/IMG-20241029-WA0001-removebg-preview_1750591030985.png";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={saiInfotechLogo} alt="Sai Infotech Logo" className="h-10 w-10 mr-3" />
            <span className="text-xl font-bold text-sai-text">Sai Infotech</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sai-text hover:text-sai-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link href="/auth">
              <Button className="bg-sai-primary text-white hover:bg-sai-primary-dark">
                Admin
              </Button>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-sai-text hover:text-sai-primary transition-colors touch-target"
                  >
                    {item.label}
                  </button>
                ))}
                <Link href="/auth">
                  <Button className="w-full bg-sai-primary text-white hover:bg-sai-primary-dark touch-target">
                    Admin Login
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
