import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star, Package } from "lucide-react";
import type { ProductWithCategory } from "@shared/schema";

interface ProductCardProps {
  product: ProductWithCategory;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in the ${product.name}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStockBadge = () => {
    switch (product.stockStatus) {
      case "in-stock":
        return <Badge className="bg-sai-success text-white">In Stock</Badge>;
      case "limited":
        return <Badge className="bg-yellow-500 text-white">Limited</Badge>;
      case "out-of-stock":
        return <Badge className="bg-sai-accent text-white">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="bg-white hover:shadow-xl transition-all cursor-pointer card-hover" onClick={onClick}>
      <div className="relative">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          {getStockBadge()}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-sai-text line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.shortDescription || "High-quality product with excellent features"}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-sai-primary">
            ₹{parseFloat(product.price).toLocaleString()}
          </span>
          <div className="flex items-center space-x-1">
            <div className="flex">
              {renderStars(parseFloat(product.rating || "0"))}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        </div>
        
        <Button 
          onClick={handleWhatsAppInquiry}
          className="w-full bg-sai-secondary text-white hover:bg-sai-secondary-dark touch-target"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Inquire on WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
}
