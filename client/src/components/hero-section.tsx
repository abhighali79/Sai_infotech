import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Monitor, Camera, Shield, Award } from "lucide-react";

export default function HeroSection() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I would like to know more about your products and services.";
    const whatsappUrl = `https://wa.me/917411180528?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-blue-500/5 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
          {/* Left side - Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full mb-6">
              <Award className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium text-blue-100">Trusted Technology Partner</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Sai Infotech
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Your one-stop destination for premium computers, laptops, and comprehensive CCTV security solutions with professional installation services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={scrollToProducts}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                size="lg"
              >
                Explore Products
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                onClick={handleWhatsAppContact}
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Get Quote
              </Button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Monitor className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-300">Computers & Laptops</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-300">CCTV Systems</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-300">Expert Support</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Visual elements */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Main hero graphic */}
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40 animate-pulse"></div>
                
                {/* Tech icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/10">SAI</div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-300/20 flex items-center justify-center animate-bounce">
                  <Monitor className="h-8 w-8 text-blue-300" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-300/20 flex items-center justify-center animate-bounce">
                  <Camera className="h-8 w-8 text-purple-300" />
                </div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-green-500/20 rounded-lg backdrop-blur-sm border border-green-300/20 flex items-center justify-center animate-bounce">
                  <Shield className="h-6 w-6 text-green-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
