import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  url: string;
  onClear: () => void;
}

export default function ImagePreview({ url, onClear }: ImagePreviewProps) {
  return (
    <div className="relative">
      <img 
        src={url} 
        alt="Preview" 
        className="w-full h-48 object-cover rounded-lg"
      />
      <button
        onClick={onClear}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}