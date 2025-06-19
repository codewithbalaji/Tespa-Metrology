import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { Accordion } from '../components/forms/ProductForm/Accordion';
import { ImageUpload } from '../components/forms/ProductForm/ImageUpload';
import { ProductFormData } from '../components/forms/ProductForm/types';
import { FlexibleSection } from '../components/forms/ProductForm/FlexibleSection';
import { FeaturesSection } from '../components/forms/ProductForm/FeaturesSection';
import { ApiError } from '../types/api';

export const backendUrls = import.meta.env.VITE_BACKEND_URL

interface AddProps {
  token: string;
}

// Available options for dropdowns
const companies = [
  'Tespa',
  'Inprocess Gauging', 
  'Sylvac', 
  'Mahr', 
  'SCANTECH 3D'
];

const categories = [
  'Height Gauge',
  'Video Measuring Machine',
  'Coordinate Measuring Machine',
  'Others'
];

// Default specifications that will be pre-filled
const defaultSpecifications = [
  { key: 'Voltage', value: '220V' },
  { key: 'Resolution', value: '0.0001mm' },
  { key: 'Weight', value: '2 Ton' },
  { key: 'Power', value: '50 Hz' },
  { key: 'Material', value: 'Granite' },
  { key: 'Display Type', value: 'Monitor' },
  { key: 'Driven', value: 'Servo Motor' },
  { key: 'Warranty', value: '1year' },
  { key: 'Application', value: '3d Measurement' },
  { key: 'Accuracy', value: '2.1+l/250µm' },
  { key: 'Brand Name', value: 'Tespa' },
  { key: 'Color', value: 'Grey' },
  { key: 'Delivery Time', value: '3 - 4 Weeks' },
  { key: 'Feature', value: '3d Comparison' },
  { key: 'Software', value: 'Arcocad, Cmm Manager' },
  { key: 'Control', value: 'Renishaw Controller' },
  { key: 'Working Temp', value: '20 °c' },
  { key: 'Probing System', value: 'Renishaw TTP' },
  { key: 'Structure', value: 'Granite' },
  { key: 'Max Load Capacity', value: '1 Ton' },
  { key: 'Operating Mode', value: 'Cnc' }
];

const Add = ({ token }: AddProps) => {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: 'Coordinate Measuring Machine',
      stock: '0',
      model: '',
      company: 'Tespa',
      specifications: defaultSpecifications,
      features: []
    }
  });

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the form?')) {
      reset({
        ...{
          name: '',
          description: '',
          price: '',
          category: 'Coordinate Measuring Machines',
          stock: '0',
          model: '',
          company: 'Tespa',
          features: []
        },
        specifications: defaultSpecifications
      });
      toast.success('Form cleared successfully');
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      
      // Handle basic fields
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('stock', data.stock);
      formData.append('model', data.model);
      formData.append('company', data.company);

      // Handle images
      if (data.image1) formData.append('image1', data.image1);
      if (data.image2) formData.append('image2', data.image2);
      if (data.image3) formData.append('image3', data.image3);
      if (data.image4) formData.append('image4', data.image4);

      // Convert additional fields to specifications
      const additionalSpecs = [
        { key: 'Warranty', value: data.warranty || '' },
        { key: 'Driven', value: data.driven || '' },
        { key: 'Power', value: data.power || '' },
        { key: 'Weight', value: data.weight || '' },
        { key: 'Resolution', value: data.resolution || '' },
        { key: 'Voltage', value: data.voltage || '' },
        { key: 'Material', value: data.material || '' },
        { key: 'Display Type', value: data.displayType || '' },
        { key: 'Control', value: data.control || '' },
        { key: 'Working Temp', value: data.workingTemp || '' },
        { key: 'Probing System', value: data.probingSystem || '' },
        { key: 'After Sales Service', value: data.afterSalesService || '' },
        { key: 'Color', value: data.color || '' },
        { key: 'Brand Name', value: data.brandName || '' },
        { key: 'Application', value: data.application || '' },
        { key: 'Country of Origin', value: data.countryOfOrigin || '' },
        { key: 'Measuring Range', value: data.measuringRange || '' },
        { key: 'Accuracy', value: data.accuracy || '' },
        { key: 'Software', value: data.software || '' },
        { key: 'Certification', value: data.certification || '' },
      ].filter(spec => spec.value !== '');

      // Combine with existing specifications
      const allSpecifications = [...data.specifications, ...additionalSpecs];
      
      // Handle flexible sections
      formData.append('specifications', JSON.stringify(allSpecifications));
      formData.append('features', JSON.stringify(data.features));

 

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        reset({
          ...{
            name: '',
          description: '',
          price: '',
          category: 'Coordinate Measuring Machine',
          stock: '0',
          model: '',
          company: 'Tespa',
          features: []
          },
          specifications: defaultSpecifications
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      console.error("Error submitting form:", axiosError);
      toast.error(axiosError.response?.data?.message || axiosError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-start gap-3'>
      <ImageUpload 
        register={register}
        watch={watch}
        setValue={setValue}
        error={errors.image1?.message}
      />

      <Accordion title="Basic Information" defaultOpen={true}>
        <div className="w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Product Name"
              className="border p-2 w-full rounded-md"
            />
            <input
              {...register('model', { required: 'Model is required' })}
              placeholder="Model Number"
              className="border p-2 w-full rounded-md"
            />
          </div>
          <textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Description"
            className="border p-2 w-full h-24 rounded-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('price', { required: 'Price is required' })}
              placeholder="Price"
              type="number"
              className="border p-2 w-full rounded-md"
            />
            <input
              {...register('stock', { required: 'Stock is required' })}
              placeholder="Stock"
              type="number"
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              {...register('company')}
              className="border p-2 w-full rounded-md"
            >
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            <select
              {...register('category')}
              className="border p-2 w-full rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </Accordion>

      <Accordion title="Specifications" defaultOpen={false}>
        <FlexibleSection
          sectionName="specifications"
          register={register}
          watch={watch}
          setValue={setValue}
        />
      </Accordion>

      <Accordion title="Features" defaultOpen={false}>
        <FeaturesSection
          register={register}
          watch={watch}
          setValue={setValue}
        />
      </Accordion>

      <div className='flex gap-4 mt-4'>
        <button 
          type="submit" 
          className='w-28 py-3 bg-black text-white disabled:bg-gray-400 cursor-pointer rounded-md'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'ADDING...' : 'ADD'}
        </button>

        <button 
          type="button" 
          onClick={handleClear}
          className='w-28 py-3 bg-red-500 text-white hover:bg-red-600 cursor-pointer rounded-md'
        >
          CLEAR
        </button>
      </div>
    </form>
  );
};

export default Add;
