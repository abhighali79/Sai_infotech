import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Package, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Show 20 products per page for optimal loading

  // Use the prop categoryFilter if it's set, otherwise use local state
  const activeCategoryFilter = categoryFilter || localCategoryFilter;
  // Filter out "all" value for API call
  const apiCategoryFilter = activeCategoryFilter === "all" ? "" : activeCategoryFilter;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, apiCategoryFilter]);

  const { data: allProducts = [], isLoading } = useQuery<ProductWithCategory[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories = [] } = useQuery<Array<{id: number; name: string; slug: string}>>({
    queryKey: ["/api/categories"],
  });

  // Client-side filtering and pagination for optimal performance
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.shortDescription?.toLowerCase().includes(query) ||
          product.category?.name.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (apiCategoryFilter) {
      filtered = filtered.filter(
        (product) => product.category?.slug === apiCategoryFilter
      );
    }

    return filtered;
  }, [allProducts, searchQuery, apiCategoryFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

        {/* Product Grid - Mobile: 2 cols, Tablet: 3 cols, Desktop: 4+ cols */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-200 image-loading"></div>
                <div className="p-2 sm:p-3 lg:p-4 space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded image-loading"></div>
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-3/4 image-loading"></div>
                  <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-1/2 image-loading"></div>
                </div>
              </div>
            ))}
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">No products found</p>
              <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t">
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-10 w-10 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(pageNum)}
                          className="h-10 w-10 p-0 text-sm"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 w-10 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
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
