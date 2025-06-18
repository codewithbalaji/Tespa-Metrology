import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ProductFormData } from './types';
import { assets } from '../../../assets/assets.js';
import { useEffect } from 'react';

interface ImageUploadProps {
  register: UseFormRegister<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  error?: string;
  initialImages?: string[];
}

export const ImageUpload = ({ register, watch, setValue, error, initialImages = [] }: ImageUploadProps) => {
  // Store object URLs to clean them up later
  const objectUrls: string[] = [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ProductFormData) => {
    if (e.target.files?.[0]) {
      setValue(field, e.target.files[0]);
    }
  };

  const getImageSrc = (imageFile: File | null | undefined, index: number): string => {
    if (imageFile && imageFile instanceof File) {
      try {
        const objectUrl = URL.createObjectURL(imageFile);
        objectUrls.push(objectUrl);
        return objectUrl;
      } catch (error) {
        console.error('Error creating object URL:', error);
        return assets.upload_area;
      }
    }
    // If no file, but initial image exists for this slot, show it
    if (initialImages[index]) {
      return initialImages[index];
    }
    return assets.upload_area;
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div>
      <p className='mb-2'>Upload Image <span className="text-red-500">*</span></p>
      <div className='flex gap-2'>
        {[1, 2, 3, 4].map((num, idx) => {
          const fieldName = `image${num}` as keyof ProductFormData;
          const imageFile = watch(fieldName);
          return (
            <label key={num} htmlFor={`image${num}`}>
              <img 
                className='w-25' 
                src={getImageSrc(imageFile as File, idx)}
                alt="" 
              />
              <input
                {...register(fieldName)}
                type="file"
                accept="image/*"
                id={`image${num}`}
                onChange={(e) => handleImageChange(e, fieldName)}
                hidden
              />
            </label>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}; 