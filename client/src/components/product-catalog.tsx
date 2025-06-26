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

  const { data: products = [], isLoading } = useQuery<ProductWithCategory[]>({
    queryKey: ["/api/products", { search: searchQuery, category: apiCategoryFilter }],
  });

  const { data: categories = [] } = useQuery<Array<{id: number; name: string; slug: string}>>({
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
    <section id="products" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-blue-700">Our Products</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Our <span className="text-blue-600">Premium Collection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our carefully curated selection of high-quality computers, laptops, and CCTV systems designed to meet all your technology needs.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg"
            />
          </div>
          <Select value={localCategoryFilter} onValueChange={setLocalCategoryFilter}>
            <SelectTrigger className="w-64 h-12 border-2 border-gray-200 rounded-xl text-lg">
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
