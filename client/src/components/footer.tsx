import { Laptop, Facebook, Instagram, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#home" },
        { name: "Products", href: "#products" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Laptops", href: "#" },
        { name: "Desktop Computers", href: "#" },
        { name: "CCTV Systems", href: "#" },
        { name: "Accessories", href: "#" }
      ]
    }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-sai-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Laptop className="h-8 w-8 text-sai-primary mr-3" />
              <span className="text-xl font-bold">Sai Infotech</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for computers, laptops, and CCTV security solutions with expert installation and support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-sai-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sai-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sai-primary transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-sai-primary transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                123 Tech Street, Electronics Market
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                +91 98765 43210
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                info@saiinfotech.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 Sai Infotech. All rights reserved. | Designed for excellence in technology solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
