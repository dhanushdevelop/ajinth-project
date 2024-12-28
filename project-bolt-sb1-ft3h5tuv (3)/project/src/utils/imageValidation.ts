import { toast } from 'react-hot-toast';

export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return contentType?.startsWith('image/') ?? false;
  } catch {
    return false;
  }
};

export const handleImageValidation = async (imageUrl: string): Promise<boolean> => {
  try {
    if (!imageUrl) {
      throw new Error('Please enter an image URL');
    }

    const isValid = await validateImageUrl(imageUrl);
    if (!isValid) {
      throw new Error('Please enter a valid image URL');
    }
    return true;
  } catch (error: any) {
    toast.error(error.message || 'Error validating image URL');
    return false;
  }
};