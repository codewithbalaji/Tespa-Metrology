import { Helmet } from 'react-helmet-async'
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, Mail, Phone, MapPin, Send, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LocationData {
  name: string;
  mapUrl: string;
  address: string;
  phone: string;
  email: string;
}

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const Contact = () => {
  const { toast } = useToast();
  const [activeLocation, setActiveLocation] = useState('Chennai');

  const locations: LocationData[] = [
    {
      name: 'Chennai',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8533356186797!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52663e1eb6f2c1%3A0x9d5f6e4d37c5a5e1!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1614947546789!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nA-3, Rajalakshmi Annexe, N.G.Narayanaswamy Street\nChennai - 600017',
      phone: '+91 94449 91810',
      email: 'sales@tespaindia.com'
    },
    {
      name: 'Coimbatore',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62660.18193080448!2d76.97793900000002!3d11.019006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8584e204a61a1%3A0xf84b763be8833933!2sSiddhapudur%2C%20New%20Siddhapudur%2C%20Tamil%20Nadu%20641044!5e0!3m2!1sen!2sin!4v1740410146779!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nA-3, Rajalakshmi Annexe, N.G.Narayanaswamy Street\nNew Siddha Pudur, Coimbatore - 641044',
      phone: '+91 94449 27835',
      email: 'coimbatore@tespaindia.com'
    },
    {
      name: 'Bangalore',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.999!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1614947546789!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nBangalore Branch',
      phone: '+91 94449 91810',
      email: 'bangalore@tespaindia.com'
    },
    {
      name: 'Pune',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.99!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1614947546789!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nPune Branch',
      phone: '+91 94449 91810',
      email: 'pune@tespaindia.com'
    },
    {
      name: 'Delhi',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.799!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1614947546789!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nDelhi Branch',
      phone: '+91 94449 91810',
      email: 'delhi@tespaindia.com'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted",
      description: "Thank you for contacting us. We'll get back to you shortly.",
      duration: 5000,
    });
  };

  const activeLocationData = locations.find(loc => loc.name === activeLocation);

  return (
    <>
      <Helmet>
        <title>Contact Us | Tespa Metrology</title>
        <meta name="description" content="Get in touch with Tespa Metrology for product enquiries, calibration services, and support." />
        <link rel="canonical" href={`${publicUrl}/contact`} />
      </Helmet>
      <MainLayout>
        <div className="bg-[#f8f9fa] min-h-screen">
          {/* Header Section */}
          <div className="bg-white shadow-sm py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Link to="/" className="hover:text-[#27a3d4]">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-700 font-medium">Contact</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Contact Form Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Have a question or need more information? Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-700">
                        Product / Service Looking for *
                      </label>
                      <Input id="product" placeholder="What are you interested in?" required />
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                        Your Name *
                      </label>
                      <Input id="name" placeholder="Enter your full name" required />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email address" required />
                    </div>
                    
                    <div>
                      <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-700">
                        Mobile *
                      </label>
                      <Input id="mobile" placeholder="Enter your mobile number" required />
                    </div>
                    
                    <div>
                      <label htmlFor="enquiry" className="block mb-2 text-sm font-medium text-gray-700">
                        Enquiry Details *
                      </label>
                      <Textarea 
                        id="enquiry" 
                        placeholder="Enter your enquiry details" 
                        className="min-h-[80px]" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="requirement" className="block mb-2 text-sm font-medium text-gray-700">
                        Your Requirement
                      </label>
                      <Textarea 
                        id="requirement" 
                        placeholder="Describe your specific requirements" 
                        className="min-h-[120px]" 
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white w-full flex items-center justify-center"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Enquiry
                    </Button>
                  </form>
                </div>
              </motion.div>
              
              {/* Global Contacts Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden h-full"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                  
                  <div className="space-y-8 mb-8">
                    <div className="flex items-start">
                      <Phone className="text-[#27a3d4] mr-3 h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Phone</h3>
                        <p className="text-gray-600">{locations[0].phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="text-[#27a3d4] mr-3 h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">{locations[0].email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="text-[#27a3d4] mr-3 h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Headquarters</h3>
                        <p className="text-gray-600 whitespace-pre-line">{locations[0].address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <img 
                      src="https://res.cloudinary.com/dryhpaq1t/image/upload/v1740753676/tespa_headquarters_miewf2.jpg"
                      alt="tespa headquarters" 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Location Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Locate Us</h2>
                <p className="text-gray-600">Find our offices across India</p>
              </div>
              
              {/* Location Tabs */}
              <div className="flex flex-wrap justify-center mb-8">
                {locations.map((location) => (
                  <motion.button
                    key={location.name}
                    onClick={() => setActiveLocation(location.name)}
                    className={cn(
                      "px-6 py-3 m-2 rounded-md text-base font-medium transition-all duration-300",
                      activeLocation === location.name 
                        ? "bg-[#27a3d4] text-white shadow-md" 
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                    )}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {location.name}
                  </motion.button>
                ))}
              </div>
              
              {/* Active Location Details */}
              {activeLocationData && (
                <motion.div 
                  key={activeLocationData.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Map */}
                  <div className="lg:col-span-7">
                    <div className="bg-white p-3 shadow-lg rounded-lg h-full">
                      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded">
                        <iframe 
                          src={activeLocationData.mapUrl} 
                          className="absolute top-0 left-0 w-full h-full border-0" 
                          allowFullScreen={true} 
                          loading="lazy"
                          title={`${activeLocationData.name} Location Map`}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Details */}
                  <div className="lg:col-span-5">
                    <div className="bg-white p-8 shadow-lg rounded-lg h-full">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">{activeLocationData.name} Branch</h3>
                      
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <Building className="text-[#27a3d4] mr-3 h-5 w-5 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Address</h4>
                            <p className="text-gray-600 whitespace-pre-line">{activeLocationData.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="text-[#27a3d4] mr-3 h-5 w-5 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Phone</h4>
                            <p className="text-gray-600">{activeLocationData.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="text-[#27a3d4] mr-3 h-5 w-5 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Email</h4>
                            <a 
                              href={`mailto:${activeLocationData.email}`} 
                              className="text-[#27a3d4] hover:underline"
                            >
                              {activeLocationData.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-[#1d8cb8] to-[#27a3d4] text-white rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Our team of experts is ready to help you find the right solutions for your precision measurement needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href={`tel:${locations[0].phone}`} 
                  className="bg-white text-[#27a3d4] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center shadow-md"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </a>
                <a 
                  href={`mailto:${locations[0].email}`} 
                  className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center shadow-md"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Contact;
