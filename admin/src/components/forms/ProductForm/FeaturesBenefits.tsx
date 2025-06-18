import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ProductFormData } from './types';

interface FeaturesBenefitsProps {
  register?: UseFormRegister<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  errors: Record<string, any>;
}

export const FeaturesBenefits = ({ watch, setValue, errors }: FeaturesBenefitsProps) => {
  const features = watch('features');

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setValue('features', updatedFeatures);
  };

  const addFeature = () => {
    setValue('features', [...features, '']);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setValue('features', updatedFeatures);
  };

  return (
    <div>
      {features.map((feature, index) => (
        <div key={index} className='flex items-center gap-2 mb-2'>
          <input 
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
            className={`w-full max-w-[600px] px-3 py-2 ${errors.features ? 'border-red-500' : ''}`}
            type="text"
            placeholder='Enter feature or benefit'
          />
          <button 
            type="button" 
            onClick={() => removeFeature(index)}
            className='px-3 py-2 bg-red-500 text-white'
          >
            Remove
          </button>
        </div>
      ))}
      {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features.message}</p>}
      
      <button 
        type="button" 
        onClick={addFeature}
        className='px-3 py-2 bg-blue-500 text-white mt-2'
      >
        Add Feature
      </button>
    </div>
  );
}; 