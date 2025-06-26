import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from "lucide-react";

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
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+91 74111 80528",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "saiinfotech406@gmail.com",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Store Hours",
      content: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 border border-purple-200 rounded-full mb-6">
            <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-purple-700">Contact Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's <span className="text-blue-600">Connect</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our store or reach out to us for personalized technology solutions and expert advice.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="group flex items-start p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className={`w-14 h-14 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{info.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-2">Ready to Get Started?</h4>
                  <p className="text-green-100">Chat with us on WhatsApp for instant assistance</p>
                </div>
                <Button 
                  onClick={handleWhatsAppContact}
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl shadow-lg"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-1"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl min-h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.284632001825!2d74.94509207514537!3d16.511721984233727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0cbc33d85e78b%3A0xa06691430d32aaed!2sSAI%20INFOTECH!5e0!3m2!1sen!2sin!4v1750590639729!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '500px' }}
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
