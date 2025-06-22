import { Card, CardContent } from "@/components/ui/card";
import { Settings, Shield, Headphones } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Settings,
      title: "Computer Repair",
      description: "Expert diagnosis and repair services for all computer issues",
      color: "sai-primary"
    },
    {
      icon: Shield,
      title: "CCTV Installation",
      description: "Professional security camera installation and setup",
      color: "sai-secondary"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "24/7 technical support and maintenance services",
      color: "sai-accent"
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sai-text mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">Professional installation and support services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-sai-text">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
