import { useState, useContext } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}

const EnquiryModal = ({ isOpen, onClose, productName, productId }: EnquiryModalProps) => {
  const { backendUrl, token } = useContext(ShopContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    quantity: 1,
    measurementUnits: '',
    mobileNo: '',
    country: '',
    purpose: '',
    requirementDetails: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    quantity: '',
    mobileNo: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Quantity validation
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
      isValid = false;
    }
    
    // Mobile number validation
    if (!formData.mobileNo) {
      newErrors.mobileNo = 'Mobile number is required';
      isValid = false;
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.mobileNo.replace(/\s/g, ''))) {
      newErrors.mobileNo = 'Please enter a valid mobile number';
      isValid = false;
    }
    
    // Country validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await axios.post(`${backendUrl}/api/enquiry/submit`, {
        productId,
        productName,
        ...formData,
        userId: token || undefined
      });
      
      if (response.data.success) {
        toast.success('Enquiry submitted successfully! We will contact you soon.');
        onClose();
        // Reset form
        setFormData({
          email: '',
          quantity: 1,
          measurementUnits: '',
          mobileNo: '',
          country: '',
          purpose: '',
          requirementDetails: ''
        });
        setErrors({
          email: '',
          quantity: '',
          mobileNo: '',
          country: ''
        });
      } else {
        toast.error(response.data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#27a3d4] text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Product Enquiry</h2>
                <button 
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Product Info */}
              <div className="bg-gray-50 px-6 py-3 border-b">
                <p className="font-medium text-gray-800">{productName}</p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]`}
                    />
                    {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
                  </div>
                  <div>
                    <label htmlFor="measurementUnits" className="block text-sm font-medium text-gray-700 mb-1">
                      Measurement Units
                    </label>
                    <input
                      type="text"
                      id="measurementUnits"
                      name="measurementUnits"
                      value={formData.measurementUnits}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]"
                      placeholder="e.g., mm, cm, inches"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]`}
                    placeholder="Your contact number"
                  />
                  {errors.mobileNo && <p className="mt-1 text-xs text-red-500">{errors.mobileNo}</p>}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]`}
                    placeholder="Your country"
                  />
                  {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
                </div>
                
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose
                  </label>
                  <input
                    type="text"
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]"
                    placeholder="e.g., Industrial, Laboratory, Educational"
                  />
                </div>
                
                <div>
                  <label htmlFor="requirementDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Requirement Details
                  </label>
                  <textarea
                    id="requirementDetails"
                    name="requirementDetails"
                    rows={3}
                    value={formData.requirementDetails}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]"
                    placeholder="Please provide any specific requirements or questions"
                  />
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#27a3d4] hover:bg-[#1d8cb8] text-white py-2 flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Enquiry</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal; 