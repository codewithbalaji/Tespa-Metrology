import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Pencil, Trash2, X, Briefcase, MapPin, GraduationCap, ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'
import * as Accordion from '@radix-ui/react-accordion'
import { motion, AnimatePresence } from 'framer-motion'
import { backendUrl } from '../App'
import axios, { AxiosError } from 'axios'
import { ApiError } from '../types/api'

interface CareersProps {
  token: string
}

interface Job {
  _id: string
  title: string
  location: string
  qualification: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

interface JobFormData {
  title: string
  location: string
  qualification: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

const initialFormData: JobFormData = {
  title: '',
  location: '',
  qualification: '',
  description: '',
  responsibilities: [''],
  requirements: ['']
}

const locations = [
  'Chennai, Tamil Nadu',
  'Bangalore, Karnataka',
  'Mumbai, Maharashtra',
  'Delhi, NCR',
  'Hyderabad, Telangana',
  'Pune, Maharashtra',
  'Coimbatore, Tamil Nadu'
]

const qualifications = [
  'B.E/B.Tech in Mechanical Engineering',
  'B.E/B.Tech in Industrial Engineering',
  'Diploma in Mechanical Engineering',
  'M.E/M.Tech in Mechanical Engineering',
  'B.E/B.Tech in Mechatronics'
]

export default function Careers({ token }: CareersProps) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<JobFormData>(initialFormData)
  const [editingId, setEditingId] = useState<string | null>(null)
  

  useEffect(() => {
    if (token) {
      fetchJobs()
    }
  }, [token])

  const fetchJobs = async () => {
    try {
      console.log('Fetching jobs with token:', token)
      const response = await axios.get(`${backendUrl}/api/dashboard/careers`, {
        headers: { 
          token,
          'Content-Type': 'application/json'
        }
      })

      // Log the full response for debugging
      console.log('Full API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      })

      if (response.data.success) {
        if (Array.isArray(response.data.data)) {
          console.log('Jobs array received:', response.data.data)
          setJobs(response.data.data)
          console.log('Jobs set to state:', response.data.data)
        } else if (response.data.data === null || response.data.data === undefined) {
          console.warn('Jobs data is null or undefined:', response.data)
          setJobs([])
        } else {
          console.error('Jobs data is not an array:', response.data.data)
          setJobs([])
        }
      } else {
        console.error('API returned success: false', response.data)
        throw new Error(response.data.message || 'Failed to fetch jobs')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      console.error("Error fetching jobs:", {
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        error: axiosError.message,
        stack: axiosError.stack
      })
      toast.error(axiosError.response?.data?.message || 'Failed to fetch jobs')
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const url = editingId 
        ? `${backendUrl}/api/dashboard/careers/${editingId}`
        : `${backendUrl}/api/dashboard/careers/add`
      
      const method = editingId ? 'put' : 'post'
      
      // Filter out empty strings from arrays
      const cleanedFormData = {
        ...formData,
        responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
        requirements: formData.requirements.filter(r => r.trim() !== '')
      }

      console.log(`${editingId ? 'Updating' : 'Creating'} job with data:`, {
        url,
        method,
        headers: {
          token: token.substring(0, 20) + '...', // Log partial token for security
          'Content-Type': 'application/json'
        },
        data: cleanedFormData
      })

      const response = await axios({
        method,
        url,
        headers: { 
          token,
          'Content-Type': 'application/json'
        },
        data: cleanedFormData
      })

      console.log(`Job ${editingId ? 'update' : 'create'} response:`, {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      })

      if (response.data.success) {
        toast.success(`Job ${editingId ? 'updated' : 'created'} successfully`)
        setShowModal(false)
        setFormData(initialFormData)
        setEditingId(null)
        
        // Add delay before fetching to ensure database is updated
        await new Promise(resolve => setTimeout(resolve, 1000))
        await fetchJobs() // Fetch updated job list
      } else {
        throw new Error(response.data.message || `Failed to ${editingId ? 'update' : 'create'} job`)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      console.error(`Error ${editingId ? 'updating' : 'saving'} job:`, {
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        error: axiosError.message,
        stack: axiosError.stack
      })
      toast.error(
        axiosError.response?.data?.message || 
        `Failed to ${editingId ? 'update' : 'create'} job. ${axiosError.message}`
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return

    try {
      const response = await axios.delete(`${backendUrl}/api/dashboard/careers/${id}`, {
        headers: { 
          token,
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success) {
        toast.success('Job deleted successfully')
        await fetchJobs() // Use await to ensure jobs are fetched after deletion
      } else {
        throw new Error(response.data.message || 'Failed to delete job')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>
      console.error("Error deleting job:", axiosError.response?.data || axiosError.message)
      toast.error(axiosError.response?.data?.message || 'Failed to delete job')
    }
  }

  const addListItem = (field: 'responsibilities' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeListItem = (field: 'responsibilities' | 'requirements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const updateListItem = (field: 'responsibilities' | 'requirements', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
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
          <h1 className="text-2xl font-bold text-gray-900">Career Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage job openings and applications</p>
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
          Add New Job
        </Button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {jobs.map(job => (
            <motion.div
              key={job._id}
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
                      <Briefcase className="w-5 h-5 text-[#27a3d4]" />
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{job.qualification}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFormData({
                          title: job.title,
                          location: job.location,
                          qualification: job.qualification,
                          description: job.description,
                          responsibilities: job.responsibilities,
                          requirements: job.requirements
                        })
                        setEditingId(job._id)
                        setShowModal(true)
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(job._id)}
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
              {editingId ? 'Edit Job' : 'Add New Job'}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-4">
              Fill in the job details below. All fields are required.
            </Dialog.Description>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Accordion.Root type="single" collapsible defaultValue="basic">
                <Accordion.Item value="basic">
                  <Accordion.Trigger className="flex w-full justify-between py-2 text-left font-medium">
                    Basic Information
                    <ChevronDown className="h-4 w-4" />
                  </Accordion.Trigger>
                  <Accordion.Content className="pt-2 pb-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Job Title</label>
                        <Input
                          value={formData.title}
                          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Senior Quality Engineer"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          value={formData.location}
                          onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          required
                        >
                          <option value="">Select Location</option>
                          {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Qualification</label>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          value={formData.qualification}
                          onChange={e => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
                          required
                        >
                          <option value="">Select Qualification</option>
                          {qualifications.map(qual => (
                            <option key={qual} value={qual}>{qual}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                          value={formData.description}
                          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter detailed job description"
                          className="min-h-[100px]"
                          required
                        />
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="responsibilities">
                  <Accordion.Trigger className="flex w-full justify-between py-2 text-left font-medium">
                    Responsibilities
                    <ChevronDown className="h-4 w-4" />
                  </Accordion.Trigger>
                  <Accordion.Content className="pt-2 pb-4">
                    <div className="space-y-4">
                      {formData.responsibilities.map((resp, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={resp}
                            onChange={e => updateListItem('responsibilities', index, e.target.value)}
                            placeholder="Enter responsibility"
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeListItem('responsibilities', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addListItem('responsibilities')}
                      >
                        Add Responsibility
                      </Button>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="requirements">
                  <Accordion.Trigger className="flex w-full justify-between py-2 text-left font-medium">
                    Requirements
                    <ChevronDown className="h-4 w-4" />
                  </Accordion.Trigger>
                  <Accordion.Content className="pt-2 pb-4">
                    <div className="space-y-4">
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={req}
                            onChange={e => updateListItem('requirements', index, e.target.value)}
                            placeholder="Enter requirement"
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeListItem('requirements', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addListItem('requirements')}
                      >
                        Add Requirement
                      </Button>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#27a3d4] hover:bg-[#1d8cb8]">
                  {editingId ? 'Update Job' : 'Create Job'}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}