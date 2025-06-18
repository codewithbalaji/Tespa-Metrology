import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Pencil, Trash2, Calendar, MapPin, Clock } from 'lucide-react'
import { toast } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { backendUrl } from '../App'
import axios, { AxiosError } from 'axios'
import { ApiError } from '../types/api'

interface NewsProps {
  token: string
}

interface NewsItem {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string[]
  category: string
  createdAt: string
}

interface NewsFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  image: File | string
  category: string
}

const initialFormData: NewsFormData = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  image: '',
  category: ''
}

export default function News({ token }: NewsProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<NewsFormData>(initialFormData)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      fetchNews()
    }
  }, [token])

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/dashboard/news`, {
        headers: { 
          token,
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        setNews(response.data.data)
      } else {
        throw new Error(response.data.message || 'Failed to fetch news')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      console.error('Error fetching news:', axiosError)
      toast.error(axiosError.response?.data?.message || 'Failed to fetch news')
      setNews([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const url = editingId 
        ? `${backendUrl}/api/dashboard/news/${editingId}`
        : `${backendUrl}/api/dashboard/news/add`
      
      const method = editingId ? 'put' : 'post'

      const formDataToSend = new FormData()
      
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('date', formData.date)
      formDataToSend.append('time', formData.time)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('category', formData.category)
      
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
        toast.success(`News ${editingId ? 'updated' : 'created'} successfully`)
        setShowModal(false)
        setFormData(initialFormData)
        setEditingId(null)
        await fetchNews()
      } else {
        throw new Error(response.data.message || `Failed to ${editingId ? 'update' : 'create'} news`)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      toast.error(axiosError.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} news`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return

    try {
      const response = await axios.delete(`${backendUrl}/api/dashboard/news/${id}`, {
        headers: { 
          token,
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        toast.success('News deleted successfully')
        await fetchNews()
      } else {
        throw new Error(response.data.message || 'Failed to delete news')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      toast.error(axiosError.response?.data?.message || 'Failed to delete news')
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
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage news and events</p>
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
          Add New News
        </Button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {news.map(item => (
            <motion.div
              key={item._id}
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
                      <span className="px-2 py-1 bg-[#27a3d4]/10 text-[#27a3d4] rounded-full text-sm">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    {item.image && item.image.length > 0 && (
                      <img 
                        src={item.image[0]} 
                        alt={item.title} 
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFormData({
                          title: item.title,
                          description: item.description,
                          date: item.date,
                          time: item.time,
                          location: item.location,
                          category: item.category,
                          image: item.image[0] || ''
                        })
                        setEditingId(item._id)
                        setShowModal(true)
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(item._id)}
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
              {editingId ? 'Edit News' : 'Add New News'}
            </Dialog.Title>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="News title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="News description"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="News category"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <Input
                  value={formData.time}
                  onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  placeholder="Event time (e.g., 10:00 AM - 2:00 PM)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Event location"
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
                      className="w-32 h-24 object-cover rounded-lg"
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

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#27a3d4] hover:bg-[#1d8cb8]">
                  {editingId ? 'Update News' : 'Create News'}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}