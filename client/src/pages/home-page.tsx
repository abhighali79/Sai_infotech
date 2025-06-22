import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CategoriesSection from "@/components/categories-section";
import ProductCatalog from "@/components/product-catalog";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { useState } from "react";

export default function HomePage() {
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    // Scroll to products section
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <CategoriesSection onCategorySelect={handleCategoryFilter} />
        <ProductCatalog categoryFilter={categoryFilter} />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
