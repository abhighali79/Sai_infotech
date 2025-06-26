import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Star, Package } from "lucide-react";
import type { ProductWithCategory } from "@shared/schema";
import { useState } from "react";

interface ProductDetailModalProps {
  product: ProductWithCategory | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const handleWhatsAppInquiry = () => {
    const productUrl = `${window.location.origin}/?product=${product.slug}`;
    const message = `Hi! I'm interested in the following product:

*${product.name}*
Price: ₹${parseFloat(product.price).toLocaleString()}
Category: ${product.category?.name || 'General'}

${product.shortDescription || 'High-quality product with excellent features.'}

Product Link: ${productUrl}

Can you provide more details about pricing, availability, and specifications?`;
    
    const whatsappUrl = `https://wa.me/917411180528?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallStore = () => {
    window.open('tel:+917411180528', '_self');
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

  const renderSpecifications = () => {
    if (!product.specifications) return null;

    const specs = typeof product.specifications === 'string' 
      ? JSON.parse(product.specifications) 
      : product.specifications;

    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key}>
            <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {String(value)}
          </div>
        ))}
      </div>
    );
  };

  const mainImage = product.images && product.images.length > 0 
    ? product.images[selectedImageIndex] 
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="product-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sai-text">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-colors ${
                      index === selectedImageIndex ? 'border-sai-primary' : 'border-transparent hover:border-sai-primary'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              {product.category && (
                <Badge className="bg-sai-primary text-white mb-2">
                  {product.category.name}
                </Badge>
              )}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(parseFloat(product.rating || "0"))}
                </div>
                <span className="text-gray-600">
                  ({parseFloat(product.rating || "0").toFixed(1)} stars, {product.reviewCount || 0} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-sai-primary mb-6">
                ₹{parseFloat(product.price).toLocaleString()}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Product Description</h3>
              <p id="product-description" className="text-gray-600 leading-relaxed">
                {product.fullDescription || product.shortDescription || "High-quality product with excellent features and reliable performance."}
              </p>
            </div>
            
            {product.specifications && renderSpecifications() && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                {renderSpecifications()}
              </div>
            )}
            
            <div className="space-y-3">
              <Button 
                onClick={handleWhatsAppInquiry}
                className="w-full bg-sai-secondary text-white hover:bg-sai-secondary-dark touch-target"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Inquire on WhatsApp
              </Button>
              <Button 
                onClick={handleCallStore}
                className="w-full bg-sai-primary text-white hover:bg-sai-primary-dark touch-target"
                size="lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Store: +91 7411180528
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
