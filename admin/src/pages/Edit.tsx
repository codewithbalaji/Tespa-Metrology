import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { Accordion } from '../components/forms/ProductForm/Accordion'
import { ImageUpload } from '../components/forms/ProductForm/ImageUpload'
import { ProductFormData } from '../components/forms/ProductForm/types'
import { FlexibleSection } from '../components/forms/ProductForm/FlexibleSection'
import { FeaturesSection } from '../components/forms/ProductForm/FeaturesSection'
import { ApiError } from '../types/api'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const companies = [
  'Tespa',
  'Inprocess Gauging',
  'Sylvac',
  'Mahr',
  'SCANTECH 3D'
]

const categories = [
  'Height Gauge',
  'Video Measuring Machine',
  'Coordinate Measuring Machine',
  'Others'
]

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
]

function generateSlug (name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

const Edit = ({ token }: { token: string }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [initialImages, setInitialImages] = useState<string[]>([])

  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: '',
      category: 'Coordinate Measuring Machine',
      stock: '0',
      model: '',
      company: 'Tespa',
      specifications: defaultSpecifications,
      features: []
    }
  })

  useEffect(() => {
    async function fetchProduct () {
      try {
        const res = await axios.post(backendUrl + '/api/product/single', { productId: id })
        if (res.data.success && res.data.product) {
          const p = res.data.product
          setInitialImages(p.image || [])
          reset({
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price.toString(),
            category: p.category,
            stock: p.stock.toString(),
            model: p.model,
            company: p.company,
            specifications: p.specifications || defaultSpecifications,
            features: p.features || []
          })
        } else {
          toast.error('Product not found')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id, reset])

  // Auto-generate slug from name
  useEffect(() => {
    const sub = watch((value, { name: changed }) => {
      if (changed === 'name' && value.name) {
        setValue('slug', generateSlug(value.name))
      }
    })
    return () => sub.unsubscribe()
  }, [watch, setValue])

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData()
      formData.append('id', id as string)
      formData.append('name', data.name)
      formData.append('slug', data.slug || generateSlug(data.name))
      formData.append('description', data.description)
      formData.append('price', data.price)
      formData.append('category', data.category)
      formData.append('stock', data.stock)
      formData.append('model', data.model)
      formData.append('company', data.company)
      if (data.image1) formData.append('image1', data.image1)
      if (data.image2) formData.append('image2', data.image2)
      if (data.image3) formData.append('image3', data.image3)
      if (data.image4) formData.append('image4', data.image4)
      formData.append('specifications', JSON.stringify(data.specifications))
      formData.append('features', JSON.stringify(data.features))
      // Add additional fields as needed

      const response = await axios.post(backendUrl + '/api/product/edit', formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data.success) {
        toast.success('Product updated successfully')
        navigate('/list')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      toast.error(axiosError.response?.data?.message || axiosError.message)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-start gap-3'>
      <ImageUpload 
        register={register}
        watch={watch}
        setValue={setValue}
        error={errors.image1?.message}
        initialImages={initialImages}
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
          <input
            {...register('slug', { required: 'Slug is required' })}
            placeholder="Slug"
            className="border p-2 w-full rounded-md"
            readOnly
          />
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
          {isSubmitting ? 'UPDATING...' : 'UPDATE'}
        </button>
      </div>
    </form>
  )
}

export default Edit
