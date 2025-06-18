import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

interface Enquiry {
  _id: string;
  productId: string;
  productName: string;
  email: string;
  quantity: number;
  measurementUnits?: string;
  mobileNo: string;
  country: string;
  purpose?: string;
  requirementDetails?: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
  userId?: string;
}

interface EnquiriesProps {
  token: string;
}

const Enquiries = ({ token }: EnquiriesProps) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/enquiry/get`, {
        headers: { token }
      });
      if (response.data.success) {
        setEnquiries(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error((error as Error).message);
    }
  };

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/enquiry/update`,
        { 
          enquiryId,
          status: newStatus 
        },
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success('Status updated successfully');
        await fetchEnquiries();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Enquiries</h2>
      </div>

      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-4">
              {/* Enquiry Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Enquiry ID: {enquiry._id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{enquiry.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {enquiry.quantity} {enquiry.measurementUnits || 'units'}
                  </p>
                </div>
              </div>

              {/* Enquiry Details */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* Contact Information */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Contact Details</h3>
                  <div className="space-y-1 text-sm">
                    <p>Email: {enquiry.email}</p>
                    <p>Phone: {enquiry.mobileNo}</p>
                    <p>Country: {enquiry.country}</p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Requirements</h3>
                  <div className="space-y-1 text-sm">
                    {enquiry.purpose && <p>Purpose: {enquiry.purpose}</p>}
                    {enquiry.requirementDetails && (
                      <p>Details: {enquiry.requirementDetails}</p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Enquiry Status</h3>
                  <select
                    value={enquiry.status}
                    onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No enquiries found
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiries; 