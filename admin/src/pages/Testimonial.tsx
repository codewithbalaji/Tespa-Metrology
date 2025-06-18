import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Pencil, Trash2, Star, User, Briefcase } from 'lucide-react'
import { toast } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { backendUrl } from '../App'
import axios, { AxiosError } from 'axios'
import { ApiError } from '../types/api'


interface TestimonialProps {
  token: string
}

interface Testimonial {
  _id: string
  name: string
  position: string
  content: string
  image: string
  videoUrl?: string
  stars: number
  createdAt: string
}

interface TestimonialFormData {
  name: string
  position: string
  content: string
  image: File | string
  videoUrl?: string
  stars: number
}

const initialFormData: TestimonialFormData = {
  name: '',
  position: '',
  content: '',
  image: '',
  videoUrl: '',
  stars: 5
}

export default function Testimonial({ token }: TestimonialProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<TestimonialFormData>(initialFormData)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      fetchTestimonials()
    }
  }, [token])

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/dashboard/testimonials`, {
        headers: { 
          token,
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        setTestimonials(response.data.data)
      } else {
        throw new Error(response.data.message || 'Failed to fetch testimonials')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      console.error('Error fetching testimonials:', axiosError)
      toast.error(axiosError.response?.data?.message || 'Failed to fetch testimonials')
      setTestimonials([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const url = editingId 
        ? `${backendUrl}/api/dashboard/testimonials/${editingId}`
        : `${backendUrl}/api/dashboard/testimonials/add`
      
      const method = editingId ? 'put' : 'post'

      const formDataToSend = new FormData()
      
      console.log('Form data being sent:', {
        name: formData.name,
        position: formData.position,
        content: formData.content,
        stars: formData.stars,
        videoUrl: formData.videoUrl,
        image: formData.image
      })

      formDataToSend.append('name', formData.name)
      formDataToSend.append('position', formData.position)
      formDataToSend.append('content', formData.content)
      formDataToSend.append('stars', formData.stars.toString())
      
      if (formData.videoUrl) {
        formDataToSend.append('videoUrl', formData.videoUrl)
      }
      
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image)
      } else if (typeof formData.image === 'string' && formData.image) {
        formDataToSend.append('imageUrl', formData.image)
      }

      const response = await axios({
        method,
        url,
        headers: { 
          token,
          'Content-Type': 'multipart/form-data'
        },
        data: formDataToSend
      })

      if (response.data.success) {
        toast.success(`Testimonial ${editingId ? 'updated' : 'created'} successfully`)
        setShowModal(false)
        setFormData(initialFormData)
        setEditingId(null)
        await fetchTestimonials()
      } else {
        throw new Error(response.data.message || `Failed to ${editingId ? 'update' : 'create'} testimonial`)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      toast.error(axiosError.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} testimonial`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await axios.delete(`${backendUrl}/api/dashboard/testimonials/${id}`, {
        headers: { 
          token,
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        toast.success('Testimonial deleted successfully')
        await fetchTestimonials()
      } else {
        throw new Error(response.data.message || 'Failed to delete testimonial')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      toast.error(axiosError.response?.data?.message || 'Failed to delete testimonial')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#27a3d4]"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonial Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer testimonials and reviews</p>
        </div>
        <Button 
          onClick={() => {
            setFormData(initialFormData)
            setEditingId(null)
            setShowModal(true)
          }}
          className="bg-[#27a3d4] hover:bg-[#1d8cb8]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Testimonial
        </Button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {testimonials.map(testimonial => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-[#27a3d4]" />
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{testimonial.position}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{testimonial.stars}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{testimonial.content}</p>
                    {testimonial.image && (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-20 h-20 object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFormData({
                          name: testimonial.name,
                          position: testimonial.position,
                          content: testimonial.content,
                          image: testimonial.image,
                          videoUrl: testimonial.videoUrl,
                          stars: testimonial.stars
                        })
                        setEditingId(testimonial._id)
                        setShowModal(true)
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(testimonial._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto bg-white rounded-lg p-6">
            <Dialog.Title className="text-xl font-bold mb-4">
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </Dialog.Title>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <Input
                  value={formData.position}
                  onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="Customer position/role"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Testimonial content"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="flex items-center gap-4">
                  {(typeof formData.image === 'string' && formData.image) && (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFormData(prev => ({ ...prev, image: file }))
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Video URL (Optional)</label>
                <Input
                  value={formData.videoUrl}
                  onChange={e => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="Video URL"
                  type="url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rating (1-5 stars)</label>
                <Input
                  value={formData.stars}
                  onChange={e => setFormData(prev => ({ ...prev, stars: parseInt(e.target.value) || 5 }))}
                  type="number"
                  min={1}
                  max={5}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#27a3d4] hover:bg-[#1d8cb8]">
                  {editingId ? 'Update Testimonial' : 'Create Testimonial'}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}