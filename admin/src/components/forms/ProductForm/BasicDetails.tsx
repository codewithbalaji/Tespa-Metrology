import { UseFormRegister } from 'react-hook-form';
import { ProductFormData } from './types';

interface BasicDetailsProps {
  register: UseFormRegister<ProductFormData>;
}

export const BasicDetails = ({ register }: BasicDetailsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div>
        <p className='mb-2'>Warranty</p>
        <input {...register('warranty')} className='w-full px-3 py-2' type="text" placeholder='1 year' />
      </div>
      
      <div>
        <p className='mb-2'>Driven</p>
        <input {...register('driven')} className='w-full px-3 py-2' type="text" placeholder='Servo Motor' />
      </div>
      
      <div>
        <p className='mb-2'>Power</p>
        <input {...register('power')} className='w-full px-3 py-2' type="text" placeholder='50 Hz' />
      </div>
      
      <div>
        <p className='mb-2'>Weight</p>
        <input {...register('weight')} className='w-full px-3 py-2' type="text" placeholder='2 Ton' />
      </div>
      
      <div>
        <p className='mb-2'>Resolution</p>
        <input {...register('resolution')} className='w-full px-3 py-2' type="text" placeholder='0.0001mm' />
      </div>
      
      <div>
        <p className='mb-2'>Voltage</p>
        <input {...register('voltage')} className='w-full px-3 py-2' type="text" placeholder='220V' />
      </div>
    </div>
  );
}; 