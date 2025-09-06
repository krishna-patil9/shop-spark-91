import { useState, useEffect } from 'react';
import { sampleProducts } from '@/data/products';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  base_price?: number;
  current_price?: number;
  stock_quantity?: number;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock';
  min_stock_threshold?: number;
  image?: string;
  image_url?: string;
  category_id?: number;
  rating: number;
  reviews?: number;
  reviews_count?: number;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
  category?: string | { name: string };
  originalPrice?: number;
  badge?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // For now, use sample data until database is ready
      // TODO: Replace with actual Supabase query once migration is approved
      const mappedProducts = sampleProducts.map(product => ({
        ...product,
        current_price: product.price,
        base_price: product.originalPrice || product.price,
        stock_quantity: Math.floor(Math.random() * 50) + 5,
        stock_status: Math.random() > 0.7 ? 'low_stock' : 'in_stock' as any,
        image_url: product.image,
        reviews_count: product.reviews,
        description: `High-quality ${product.name}. Perfect for everyday use.`,
        category: product.category
      }));
      setProducts(mappedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (categoryId: number) => {
    return products.filter(product => product.category_id === categoryId);
  };

  const getSimilarProducts = (productId: number, categoryId: number, limit = 4) => {
    return products
      .filter(product => product.id !== productId && product.category_id === categoryId)
      .slice(0, limit);
  };

  const searchProducts = (query: string) => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => {
      const categoryName = typeof product.category === 'string' 
        ? product.category 
        : product.category?.name || '';
      
      return product.name.toLowerCase().includes(searchTerm) ||
        (product.description?.toLowerCase() || '').includes(searchTerm) ||
        categoryName.toLowerCase().includes(searchTerm);
    });
  };

  return {
    products,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    getSimilarProducts,
    searchProducts,
    refetch: fetchProducts
  };
}