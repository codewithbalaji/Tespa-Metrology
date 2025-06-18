import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ProductFormData, KeyValuePair } from './types';

interface FlexibleSectionProps {
  sectionName: keyof Pick<ProductFormData, 'specifications' | 'features'>;
  register: UseFormRegister<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
}

export const FlexibleSection = ({ sectionName, register, watch, setValue }: FlexibleSectionProps) => {
  const fields = watch(sectionName) || [];
  const isSpecifications = sectionName === 'specifications';

  const addField = () => {
    if (isSpecifications) {
      setValue(sectionName, [...(fields as KeyValuePair[]), { key: '', value: '' }] as any);
    } else {
      setValue(sectionName, [...(fields as string[]), ''] as any);
    }
  };

  const removeField = (index: number) => {
    setValue(
      sectionName,
      fields.filter((_: any, i: number) => i !== index) as any
    );
  };

  return (
    <div className="w-full space-y-4">
      {isSpecifications ? (
        // Specifications fields (key-value pairs)
        (fields as KeyValuePair[]).map((_, index: number) => (
          <div key={index} className="flex gap-4 items-center">
            <input
              {...register(`${sectionName}.${index}.key` as const)}
              placeholder="Key"
              className="border p-2 w-1/3 rounded-md"
            />
            <input
              {...register(`${sectionName}.${index}.value` as const)}
              placeholder="Value"
              className="border p-2 w-1/3 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeField(index)}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        // Features fields (simple strings)
        (fields as string[]).map((_, index: number) => (
          <div key={index} className="flex gap-4 items-center">
            <input
              {...register(`${sectionName}.${index}` as const)}
              placeholder="Enter feature"
              className="border p-2 w-2/3 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeField(index)}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))
      )}
      <button
        type="button"
        onClick={addField}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
      >
        Add {isSpecifications ? 'Specification' : 'Feature'}
      </button>
    </div>
  );
}; 