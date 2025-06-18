import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ProductFormData } from './types';

interface AdditionalDetailsProps {
  register: UseFormRegister<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
}

const businessTypes = [
  'Trading Company',
  'Manufacturer',
  'Distributor',
  'Service Provider'
];

export const AdditionalDetails = ({ register, watch, setValue }: AdditionalDetailsProps) => {
  const handleBusinessTypeChange = (type: string) => {
    const currentTypes = watch('businessType') || [];
    
    if (currentTypes.includes(type)) {
      setValue('businessType', currentTypes.filter(item => item !== type));
    } else {
      setValue('businessType', [...currentTypes, type]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register('certification')}
          placeholder="Certification"
          className="border p-2 w-full rounded-md"
        />
        <input
          {...register('measuringRange')}
          placeholder="Measuring Range"
          className="border p-2 w-full rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register('accuracy')}
          placeholder="Accuracy"
          className="border p-2 w-full rounded-md"
        />
        <input
          {...register('software')}
          placeholder="Software"
          className="border p-2 w-full rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Business Type</label>
        <div className="grid grid-cols-2 gap-2">
          {businessTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={(watch('businessType') || []).includes(type)}
                onChange={() => handleBusinessTypeChange(type)}
                className="rounded border-gray-300"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails; 