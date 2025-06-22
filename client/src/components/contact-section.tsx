import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I would like to know more about your products and services.";
    const whatsappUrl = `https://wa.me/917411180528?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Store Address",
      content: "Athani-Gokak Rd, near HVH College, Harugeri, Karnataka 591220",
      color: "sai-primary"
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+91 74111 80528",
      color: "sai-secondary"
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "saiinfotech406@gmail.com",
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
            <div className="w-full h-full rounded-xl shadow-md overflow-hidden min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.284632001825!2d74.94509207514537!3d16.511721984233727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0cbc33d85e78b%3A0xa06691430d32aaed!2sSAI%20INFOTECH!5e0!3m2!1sen!2sin!4v1750590639729!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="SAI INFOTECH Store Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
