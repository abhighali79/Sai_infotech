import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I would like to know more about your products and services.";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-sai-primary to-blue-700 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Trusted Technology Partner
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Premium computers, laptops, and CCTV solutions with expert installation and support services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToProducts}
              className="bg-white text-sai-primary px-8 py-3 hover:bg-gray-100 touch-target"
              size="lg"
            >
              <ArrowDown className="h-5 w-5 mr-2" />
              Browse Products
            </Button>
            <Button 
              onClick={handleWhatsAppContact}
              className="bg-sai-secondary text-white px-8 py-3 hover:bg-sai-secondary-dark touch-target"
              size="lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
