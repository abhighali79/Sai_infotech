import { Card, CardContent } from "@/components/ui/card";
import { Settings, Shield, Headphones, Wrench, Monitor, Camera } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Monitor,
      title: "Computer & Laptop Sales",
      description: "Premium quality computers and laptops from leading brands with warranty",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Camera,
      title: "CCTV Installation",
      description: "Professional security camera systems with expert installation and setup",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Wrench,
      title: "Repair & Maintenance", 
      description: "Expert diagnosis and repair services for all your technology needs",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Security Solutions",
      description: "Comprehensive security systems to protect your home and business",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Settings,
      title: "System Configuration",
      description: "Professional setup and optimization of your technology systems",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock technical support and assistance when you need it",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-700">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Complete <span className="text-blue-600">Technology Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sales to installation, maintenance to support - we provide comprehensive technology services to keep your business running smoothly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  
                  {/* Decorative gradient */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
