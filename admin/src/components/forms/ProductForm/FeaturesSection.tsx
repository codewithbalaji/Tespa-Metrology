import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ProductFormData } from './types';

interface FeaturesSectionProps {
  register: UseFormRegister<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
}

export const FeaturesSection = ({ register, watch, setValue }: FeaturesSectionProps) => {
  const features = watch('features') || [];

  const addFeature = () => {
    setValue('features', [...features, '']);
  };

  const removeFeature = (index: number) => {
    setValue(
      'features',
      features.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="w-full space-y-4">
      {features.map((_, index: number) => (
        <div key={index} className="flex gap-4 items-center">
          <input
            {...register(`features.${index}`)}
            placeholder="Enter feature"
            className="border p-2 w-2/3"
          />
          <button
            type="button"
            onClick={() => removeFeature(index)}
            className="bg-red-500 text-white px-3 py-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addFeature}
        className="bg-black text-white px-4 py-2"
      >
        Add Feature
      </button>
    </div>
  );
}; 