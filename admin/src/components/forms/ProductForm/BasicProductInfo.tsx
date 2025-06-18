import { UseFormRegister } from 'react-hook-form';
import { ProductFormData } from './types';

interface BasicProductInfoProps {
  register: UseFormRegister<ProductFormData>;
  errors: Record<string, any>;
}

export const BasicProductInfo = ({ register, errors }: BasicProductInfoProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full'>
        <p className='mb-2'>Product Name <span className="text-red-500">*</span></p>
        <input 
          {...register('name', { required: 'Product name is required' })}
          className={`w-full max-w-[500px] px-3 py-2 ${errors.name ? 'border-red-500' : ''}`} 
          type="text" 
          placeholder='Exato 565 Coordinate Measuring Machine' 
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description <span className="text-red-500">*</span></p>
        <textarea 
          {...register('description', { required: 'Description is required' })}
          className={`w-full max-w-[500px] px-3 py-2 ${errors.description ? 'border-red-500' : ''}`} 
          placeholder='Type context here' 
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select {...register('category')} className='w-full px-3 py-2'>
            <option value="Tespa">Tespa</option>
            <option value="MICROREP">MICROREP</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select {...register('subCategory')} className='w-full px-3 py-2'>
            <option value="Metrology Measuring Equipments">Metrology Measuring Equipments</option>
            <option value="Electronic Grinding Gauges">Electronic Grinding Gauges</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price <span className="text-red-500">*</span></p>
          <input 
            {...register('price', { required: 'Price is required' })}
            className={`w-full px-3 py-2 sm:w-[120px] ${errors.price ? 'border-red-500' : ''}`} 
            type="text" 
            placeholder='100000' 
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
      </div>
    </div>
  );
}; 