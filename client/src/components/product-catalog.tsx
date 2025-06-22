import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductCard from "./product-card";
import ProductDetailModal from "./product-detail-modal";
import type { ProductWithCategory } from "@shared/schema";

interface ProductCatalogProps {
  categoryFilter: string;
}

export default function ProductCatalog({ categoryFilter }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localCategoryFilter, setLocalCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the prop categoryFilter if it's set, otherwise use local state
  const activeCategoryFilter = categoryFilter || localCategoryFilter;
  // Filter out "all" value for API call
  const apiCategoryFilter = activeCategoryFilter === "all" ? "" : activeCategoryFilter;

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products", { search: searchQuery, category: apiCategoryFilter }],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const handleProductClick = (product: ProductWithCategory) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="py-16 bg-sai-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-sai-text">Featured Products</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64 form-input"
              />
            </div>
            <Select value={localCategoryFilter} onValueChange={setLocalCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="w-full h-48 bg-gray-200 image-loading"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded image-loading"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 image-loading"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 image-loading"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">No products found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
