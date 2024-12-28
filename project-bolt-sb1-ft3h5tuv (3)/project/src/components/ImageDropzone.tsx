import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { handleImageValidation } from '../utils/imageValidation';
import ImagePreview from './ImagePreview';
import ImageUrlForm from './ImageUrlForm';

interface ImageDropzoneProps {
  onImageUploaded: (url: string) => void;
}

export default function ImageDropzone({ onImageUploaded }: ImageDropzoneProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isValid = await handleImageValidation(imageUrl);
      if (isValid) {
        setPreview(imageUrl);
        onImageUploaded(imageUrl);
        toast.success('Image URL added successfully!');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setImageUrl('');
    onImageUploaded('');
  };

  return (
    <div className="w-full">
      {preview ? (
        <ImagePreview url={preview} onClear={clearPreview} />
      ) : (
        <ImageUrlForm
          imageUrl={imageUrl}
          onUrlChange={setImageUrl}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}