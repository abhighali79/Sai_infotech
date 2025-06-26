import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star, Package } from "lucide-react";
import type { ProductWithCategory } from "@shared/schema";
import { optimizeImageUrl } from "@/lib/cloudinary";

interface ProductCardProps {
  product: ProductWithCategory;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in the ${product.name}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/917411180528?text=${encodeURIComponent(message)}`;
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

  // Optimize image for different screen sizes to reduce data usage
  const getOptimizedImageUrl = (url: string) => {
    try {
      return optimizeImageUrl(url, {
        width: 300,
        height: 300,
        crop: 'fill',
        quality: 'auto:low',
        format: 'auto'
      });
    } catch {
      return url; // Fallback to original URL if optimization fails
    }
  };

  return (
    <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col" onClick={onClick}>
      <div className="relative flex-shrink-0">
        {product.images && product.images.length > 0 ? (
          <img 
            src={getOptimizedImageUrl(product.images[0])} 
            alt={product.name}
            className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-200 rounded-t-xl flex items-center justify-center">
            <Package className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
          {getStockBadge()}
        </div>
      </div>
      
      <CardContent className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-gray-900 line-clamp-2 flex-shrink-0">
          {product.name}
        </h3>
        
        {/* Show description only on larger screens to save space on mobile */}
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 hidden sm:block flex-grow">
          {product.shortDescription || "High-quality product with excellent features"}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-3 gap-1 sm:gap-0">
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
            ₹{parseFloat(product.price).toLocaleString()}
          </span>
          
          {/* Show ratings only on larger screens */}
          <div className="hidden sm:flex items-center space-x-1">
            <div className="flex">
              {renderStars(parseFloat(product.rating || "0"))}
            </div>
            <span className="text-xs lg:text-sm text-gray-500 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        </div>
        
        <Button 
          onClick={handleWhatsAppInquiry}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-2 sm:py-2.5 mt-auto"
          size="sm"
        >
          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Inquire on WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </Button>
      </CardContent>
    </Card>
  );
}
