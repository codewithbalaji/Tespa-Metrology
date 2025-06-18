import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

interface Application {
  _id: string
  name: string
  email: string
  qualification: string
  position: string
  mobile: string
  message: string
  resumeUrl?: string
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected'
  createdAt: string
}

interface ApplicationsProps {
  token: string
}

const Applications = ({ token }: ApplicationsProps) => {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${backendUrl}/api/careers/applications/get`, {
        headers: { token }
      })
      if (response.data.success) {
        setApplications(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/careers/applications/update`,
        { applicationId, status: newStatus },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Status updated successfully')
        await fetchApplications()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error((error as Error).message)
    }
  }

  const handleDelete = async (applicationId: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return
    try {
      const response = await axios.delete(
        `${backendUrl}/api/careers/applications/delete/${applicationId}`,
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Application deleted successfully')
        await fetchApplications()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    fetchApplications()
    // eslint-disable-next-line
  }, [token])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Job Applications</h2>
      </div>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-4">
              {/* Application Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Application ID: {app._id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{app.position}</p>
                  <p className="text-sm text-muted-foreground">{app.qualification}</p>
                </div>
              </div>
              {/* Application Details */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* Contact Information */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Contact Details</h3>
                  <div className="space-y-1 text-sm">
                    <p>Name: {app.name}</p>
                    <p>Email: {app.email}</p>
                    <p>Phone: {app.mobile}</p>
                  </div>
                </div>
                {/* Message & Resume */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Message</h3>
                  <div className="space-y-1 text-sm">
                    <p>{app.message}</p>
                  </div>
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                      View Resume
                    </a>
                  )}
                </div>
                {/* Status & Actions */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Application Status</h3>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="mt-2 w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {applications.length === 0 && !loading && (
          <div className="text-center py-10 text-muted-foreground">
            No applications found
          </div>
        )}
        {loading && (
          <div className="text-center py-10 text-muted-foreground">
            Loading applications...
          </div>
        )}
      </div>
    </div>
  )
}

export default Applications