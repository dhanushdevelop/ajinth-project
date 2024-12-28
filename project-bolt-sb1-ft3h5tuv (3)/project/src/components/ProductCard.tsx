import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  onAddToCart: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  category,
  image_url,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className="relative group">
        <img
          src={image_url}
          alt={name}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2 text-gray-800">{name}</h3>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-secondary-400 fill-secondary-400" />
          ))}
          <span className="text-sm text-gray-500 ml-2">(5.0)</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex items-baseline mb-4">
          <span className="text-xs text-gray-500">₹</span>
          <span className="text-2xl font-bold text-primary-600">{price.toLocaleString()}</span>
        </div>
        <button 
          onClick={() => onAddToCart(id)}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}