import React from 'react';
import { Link2 } from 'lucide-react';

interface ImageUrlFormProps {
  imageUrl: string;
  onUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function ImageUrlForm({ 
  imageUrl, 
  onUrlChange, 
  onSubmit, 
  loading 
}: ImageUrlFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          disabled={loading}
        >
          <Link2 size={20} />
          {loading ? 'Adding...' : 'Add URL'}
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Tip: Use image URLs from Unsplash or other image hosting services
      </p>
    </form>
  );
}