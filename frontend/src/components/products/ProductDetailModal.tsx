
import { useState } from 'react';
import { X, PhoneCall, MessageSquare, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

type ExpandedSections = {
  [key: string]: boolean;
};

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState('1');
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    details: true,
    specifications: false,
    features: false,
  });
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    mobile: '',
    quantity: '1',
    purpose: '',
  });

  // Function to handle enquiry form submission
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast({
      title: "Enquiry Submitted",
      description: "We'll get back to you soon regarding your inquiry.",
      duration: 5000,
    });
    
    // Reset form
    setEnquiryForm({
      name: '',
      email: '',
      mobile: '',
      quantity: '1',
      purpose: '',
    });
  };

  // Handle input change for enquiry form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({ ...prev, [name]: value }));
  };

  // Toggle expanded sections
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Example similar products for "More Products" section
  const similarProducts = [
    { id: 1, name: 'Exato 565 Coordinate Measuring Machine', image: 'https://via.placeholder.com/100x100/ffffff/333333?text=CMM+565' },
    { id: 2, name: 'Exato 765 Coordinate Measuring Machine', image: 'https://via.placeholder.com/100x100/ffffff/333333?text=CMM+765' },
    { id: 3, name: 'Exato 7106 Coordinate Measuring Machine', image: 'https://via.placeholder.com/100x100/ffffff/333333?text=CMM+7106' },
  ];

  // Product specifications
  const specifications = {
    'Warranty': '1 year',
    'Driven': 'Servo Motor',
    'Power': '50 Hz',
    'Weight': '2 Ton',
    'Resolution': '0.0001mm',
    'Voltage': '220V',
    'Certification': 'ISO 17025',
    'Country of Origin': 'India',
    'Model': 'EXATO 785',
    'Measuring Range/size': '700mm x 800mm x 500mm',
    'After Sales, Service Provided': 'Yes',
    'Material': 'Granite',
    'Display Type': 'Monitor',
    'Accuracy': '2.1+L/250µm',
    'Delivery Time': '3 - 4 Weeks',
    'Feature': '3D Comparison',
    'Software': 'Arcocad, Cmm Manager',
    'Control': 'Renishaw Controller',
    'Working Temp': '20 °C',
    'Probing System': 'Renishaw TTP',
    'Structure': 'Granite',
    'Max Load Capacity': '1 Ton',
    'Operating Mode': 'CNC',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center">
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
          >
            <X size={24} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Product Image and Basic Info */}
            <div className="p-6 bg-gray-50">
              <div className="flex flex-col h-full">
                <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-center h-80">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h2>
                  
                  <div className="mb-4">
                    <p className="text-xl font-bold text-[#27a3d4]">{product.price} / piece</p>
                    <p className="text-sm text-gray-600">1 piece (MOQ)</p>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-sm text-gray-700">Quantity: </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-20 text-center border-gray-300"
                        />
                        <span className="ml-2 text-gray-600">piece</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mb-4">
                    <Button className="flex-1 bg-[#27a3d4] hover:bg-[#1d8cb8]">
                      Get Best Price
                    </Button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Business Type:</span> 
                      <span className="text-gray-600 ml-2">Manufacturer, Exporter, Supplier</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Color:</span> 
                      <span className="text-gray-600 ml-2">Grey</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Brand Name:</span> 
                      <span className="text-gray-600 ml-2">Tespa</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Application:</span> 
                      <span className="text-gray-600 ml-2">3D Measurement</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="font-medium text-gray-700 mb-2">Preferred Buyer From:</div>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                      India (Tamil Nadu, Telangana, Andhra Pradesh, Kerala, Karnataka only) & All other countries
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Button variant="outline" className="flex items-center justify-center">
                        <PhoneCall size={16} className="mr-2" />
                        Request to Call
                      </Button>
                      <Button className="bg-[#27a3d4] hover:bg-[#1d8cb8] flex items-center justify-center">
                        <MessageSquare size={16} className="mr-2" />
                        Send Enquiry
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Product Details and Enquiry Form */}
            <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <div className="mb-6">
                <div className="font-bold text-lg text-gray-800 mb-4">Product Details</div>
                
                {/* Product Details Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleSection('details')}
                  >
                    <div className="font-medium flex items-center">
                      <Info size={18} className="mr-2 text-[#27a3d4]" />
                      Basic Details
                    </div>
                    {expandedSections.details ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  {expandedSections.details && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {Object.entries(specifications).slice(0, 8).map(([key, value]) => (
                          <div key={key} className="flex items-start py-1">
                            <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-gray-700">{key}</div>
                              <div className="text-sm text-gray-600">{value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Specifications Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleSection('specifications')}
                  >
                    <div className="font-medium flex items-center">
                      <Info size={18} className="mr-2 text-[#27a3d4]" />
                      Specifications
                    </div>
                    {expandedSections.specifications ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  {expandedSections.specifications && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {Object.entries(specifications).slice(8).map(([key, value]) => (
                          <div key={key} className="flex items-start py-1">
                            <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-gray-700">{key}</div>
                              <div className="text-sm text-gray-600">{value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Features Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleSection('features')}
                  >
                    <div className="font-medium flex items-center">
                      <Info size={18} className="mr-2 text-[#27a3d4]" />
                      Features & Benefits
                    </div>
                    {expandedSections.features ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  {expandedSections.features && (
                    <div className="p-4 border-t border-gray-200">
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Advanced measuring capabilities with high precision</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Reliable operation in industrial environments</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Compatible with industry-standard software systems</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Comprehensive service and support package included</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Excellent value for performance and quality</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enquiry Form */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Looking for "{product.name}"?
                </h3>
                
                <form onSubmit={handleEnquirySubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={enquiryForm.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                        className="w-full border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={enquiryForm.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        required
                        className="w-full border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
                      <div className="flex">
                        <div className="bg-gray-100 border border-gray-300 rounded-l-md px-3 flex items-center text-gray-600">
                          +91
                        </div>
                        <Input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          value={enquiryForm.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter Mobile No."
                          required
                          className="w-full border-gray-300 rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <div className="flex items-center">
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="1"
                          value={enquiryForm.quantity}
                          onChange={handleInputChange}
                          placeholder="Estimated Quantity"
                          required
                          className="w-1/2 border-gray-300"
                        />
                        <span className="ml-2 text-gray-600">piece</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose of Requirement</label>
                      <Input
                        id="purpose"
                        name="purpose"
                        value={enquiryForm.purpose}
                        onChange={handleInputChange}
                        placeholder="Briefly describe your requirement"
                        className="w-full border-gray-300"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#27a3d4] hover:bg-[#1d8cb8] text-white"
                    >
                      Yes! I am interested
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Explore More Products */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Explore More Products
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {similarProducts.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded p-2 hover:border-[#27a3d4] transition-colors">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-24 object-contain mb-2"
                      />
                      <p className="text-xs text-gray-700 line-clamp-2">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailModal;
