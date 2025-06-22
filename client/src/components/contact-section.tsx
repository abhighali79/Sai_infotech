import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I would like to know more about your products and services.";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Store Address",
      content: "123 Tech Street, Electronics Market, City - 123456",
      color: "sai-primary"
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+91 98765 43210",
      color: "sai-secondary"
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "info@saiinfotech.com",
      color: "sai-accent"
    },
    {
      icon: Clock,
      title: "Store Hours",
      content: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
      color: "sai-success"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-sai-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sai-text mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600">Visit our store or contact us for any inquiries</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="bg-white shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-sai-text">Contact Information</h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-center">
                        <div className={`w-12 h-12 bg-${info.color} rounded-lg flex items-center justify-center mr-4`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sai-text">{info.title}</p>
                          <p className="text-gray-600">{info.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-8">
                  <Button 
                    onClick={handleWhatsAppContact}
                    className="w-full bg-sai-secondary text-white hover:bg-sai-secondary-dark touch-target"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="w-full h-full bg-gray-200 rounded-xl shadow-md flex items-center justify-center min-h-[400px]">
              <div className="text-center text-gray-500">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Store Location</p>
                <p>Visit us at our electronics store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
