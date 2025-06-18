import { UseFormRegister } from 'react-hook-form';
import { ProductFormData } from './types';

interface SpecificationsProps {
  register: UseFormRegister<ProductFormData>;
  errors: Record<string, any>;
}

export const Specifications = ({ register, errors }: SpecificationsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div>
        <p className='mb-2'>Model <span className="text-red-500">*</span></p>
        <input 
          {...register('model', { required: 'Model is required' })}
          className={`w-full px-3 py-2 ${errors.model ? 'border-red-500' : ''}`}
          type="text" 
          placeholder='EXATO 785' 
        />
        {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
      </div>

      <div>
        <p className='mb-2'>After Sales Service Provided</p>
        <select {...register('afterSalesService')} className='w-full px-3 py-2'>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <p className='mb-2'>Material</p>
        <input {...register('material')} className='w-full px-3 py-2' type="text" placeholder='Granite' />
      </div>

      <div>
        <p className='mb-2'>Display Type</p>
        <input {...register('displayType')} className='w-full px-3 py-2' type="text" placeholder='Monitor' />
      </div>

      <div>
        <p className='mb-2'>Accuracy <span className="text-red-500">*</span></p>
        <input 
          {...register('accuracy', { required: 'Accuracy is required' })}
          className={`w-full px-3 py-2 ${errors.accuracy ? 'border-red-500' : ''}`}
          type="text" 
          placeholder='2.1+L/250µm' 
        />
        {errors.accuracy && <p className="text-red-500 text-sm mt-1">{errors.accuracy.message}</p>}
      </div>

      <div>
        <p className='mb-2'>Software <span className="text-red-500">*</span></p>
        <input 
          {...register('software', { required: 'Software is required' })}
          className={`w-full px-3 py-2 ${errors.software ? 'border-red-500' : ''}`}
          type="text" 
          placeholder='Arcocad, Cmm Manager' 
        />
        {errors.software && <p className="text-red-500 text-sm mt-1">{errors.software.message}</p>}
      </div>

      <div>
        <p className='mb-2'>Control</p>
        <input {...register('control')} className='w-full px-3 py-2' type="text" placeholder='Renishaw Controller' />
      </div>

      <div>
        <p className='mb-2'>Working Temperature</p>
        <input {...register('workingTemp')} className='w-full px-3 py-2' type="text" placeholder='20 °C' />
      </div>

      <div>
        <p className='mb-2'>Probing System</p>
        <input {...register('probingSystem')} className='w-full px-3 py-2' type="text" placeholder='Renishaw TTP' />
      </div>
    </div>
  );
}; 