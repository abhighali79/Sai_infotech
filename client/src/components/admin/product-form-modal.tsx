import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { CloudUpload, X, Package } from "lucide-react";
import type { ProductWithCategory, InsertProduct, UpdateProduct } from "@shared/schema";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductWithCategory | null;
}

export default function ProductFormModal({ isOpen, onClose, product }: ProductFormModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    sku: "",
    categoryId: "",
    images: [] as string[],
    specifications: "",
    stockStatus: "in-stock",
    featured: false,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/admin/products", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Product created",
        description: "Product has been successfully created.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Creation failed",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateProduct }) => {
      const response = await apiRequest("PUT", `/api/admin/products/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Product updated",
        description: "Product has been successfully updated.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Initialize form with product data when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription || "",
        fullDescription: product.fullDescription || "",
        price: product.price,
        sku: product.sku,
        categoryId: product.categoryId?.toString() || "",
        images: product.images || [],
        specifications: product.specifications ? JSON.stringify(product.specifications) : "",
        stockStatus: product.stockStatus,
        featured: product.featured || false,
      });
    } else {
      // Reset form for new product
      setFormData({
        name: "",
        slug: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        sku: "",
        categoryId: "",
        images: [],
        specifications: "",
        stockStatus: "in-stock",
        featured: false,
      });
    }
    setSelectedFiles([]);
  }, [product, isOpen]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum 5 images allowed per product.",
        variant: "destructive",
      });
      return;
    }
    setSelectedFiles(files);
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) return formData.images;

    setIsUploading(true);
    try {
      const uploadPromises = selectedFiles.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...formData.images, ...uploadedUrls];
      setFormData(prev => ({ ...prev, images: newImages }));
      setSelectedFiles([]);
      return newImages;
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
      return formData.images;
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload new images first
    const finalImages = await uploadImages();

    // Validate specifications JSON
    let specifications = null;
    if (formData.specifications.trim()) {
      try {
        specifications = JSON.parse(formData.specifications);
      } catch (error) {
        toast({
          title: "Invalid specifications",
          description: "Specifications must be valid JSON format.",
          variant: "destructive",
        });
        return;
      }
    }

    const productData = {
      name: formData.name,
      slug: formData.slug,
      shortDescription: formData.shortDescription || null,
      fullDescription: formData.fullDescription || null,
      price: formData.price,
      sku: formData.sku,
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      images: finalImages,
      specifications,
      stockStatus: formData.stockStatus,
      featured: formData.featured,
    };

    if (product) {
      updateProductMutation.mutate({ id: product.id, data: productData });
    } else {
      createProductMutation.mutate(productData as InsertProduct);
    }
  };

  const isLoading = createProductMutation.isPending || updateProductMutation.isPending || isUploading;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sai-text">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter product name"
                required
                className="form-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                placeholder="Enter SKU"
                required
                className="form-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                required
                className="form-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Brief product description"
              className="form-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Detailed product description"
              rows={4}
              className="form-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <CloudUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images here or click to browse</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                onClick={() => document.getElementById('image-upload')?.click()}
                className="bg-sai-primary text-white hover:bg-sai-primary-dark"
                disabled={isLoading}
              >
                Choose Images
              </Button>
              <p className="text-sm text-gray-500 mt-2">Maximum 5 images, up to 10MB each</p>
            </div>
            
            {/* Image Preview Grid */}
            {(formData.images.length > 0 || selectedFiles.length > 0) && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-sai-accent text-white rounded-full w-6 h-6 p-0 hover:bg-red-700"
                      size="sm"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {selectedFiles.map((file, index) => (
                  <div key={`new-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                      <span className="text-white text-xs">Pending upload</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications (JSON format)</Label>
            <Textarea
              id="specifications"
              value={formData.specifications}
              onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
              placeholder='{"processor": "Intel i5", "ram": "8GB", "storage": "512GB SSD"}'
              rows={3}
              className="form-input font-mono text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stockStatus">Stock Status</Label>
              <Select value={formData.stockStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, stockStatus: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="limited">Limited Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Featured Product</Label>
              <div className="flex items-center space-x-2 h-10">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
                />
                <Label htmlFor="featured" className="text-sm">Mark as featured product</Label>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-sai-primary text-white hover:bg-sai-primary-dark touch-target"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : product ? "Update Product" : "Create Product"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 touch-target"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
