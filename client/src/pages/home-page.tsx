import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProductCatalog from "@/components/product-catalog";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ProductWithCategory } from "@shared/schema";
import ProductDetailModal from "@/components/product-detail-modal";

export default function HomePage() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Check for product parameter on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productSlug = urlParams.get('product');
    if (productSlug) {
      // Find and open the product modal
      fetch(`/api/products?slug=${productSlug}`)
        .then(res => res.json())
        .then(products => {
          if (products.length > 0) {
            setSelectedProduct(products[0]);
            setIsProductModalOpen(true);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    // Scroll to products section
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
    // Remove product parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProductCatalog categoryFilter={categoryFilter} />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
    </div>
  );
}
