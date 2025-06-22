import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Video, Keyboard } from "lucide-react";

interface CategoriesSectionProps {
  onCategorySelect: (category: string) => void;
}

export default function CategoriesSection({ onCategorySelect }: CategoriesSectionProps) {
  const categories = [
    {
      id: "laptops",
      name: "Laptops & Computers",
      description: "High-performance laptops and desktop computers for every need",
      icon: Laptop,
      color: "sai-primary"
    },
    {
      id: "cctv",
      name: "CCTV Systems",
      description: "Complete security camera solutions with professional installation",
      icon: Video,
      color: "sai-secondary"
    },
    {
      id: "accessories",
      name: "Accessories",
      description: "Keyboards, mice, cables, and other computer accessories",
      icon: Keyboard,
      color: "sai-accent"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sai-text mb-4">Our Product Categories</h2>
          <p className="text-lg text-gray-600">Explore our comprehensive range of technology solutions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="bg-sai-background hover:shadow-lg transition-all cursor-pointer card-hover touch-target"
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-sai-text">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
