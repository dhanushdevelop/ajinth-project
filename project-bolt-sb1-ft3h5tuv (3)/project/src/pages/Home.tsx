import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import ImageSlider from '../components/ImageSlider';
import { Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const categories = [
  'all',
  'Sofa',
  'Furniture',
  'Furniture Cushion',
  'Cot headboard cushion',
  'Home appliances',
  'Sofa Repair and service',
  'Electronics',
  'Kitchenware',
  'Tv stand',
  'Cupboard',
  'Utensils',
  'Curtains'
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  async function loadProducts() {
    setLoading(true);
    let query = supabase.from('products').select('*');
    
    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Please login to add items to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <ImageSlider />

      {/* Search Bar */}
      <div className="bg-white shadow-md py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400" size={24} />
          </div>
        </div>
      </div>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-600">
                  No products found
                </h2>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or category filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}