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
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.88906244231006!2d80.22434962818444!3d13.084921987224039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642564fb8767%3A0xdfb45e82d800e951!2sTespa%20Tools%20Private%20Limited!5e0!3m2!1sen!2sin!4v1750242061533!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nD - 105, 1st Main Road, D Block, Anna Nagar East\nChennai - 600 102',
      phone: '+91 44 26632191, +91 9445008731, +91 9445282765',
      email: 'sales@tespaindia.com'
    },
    {
      name: 'Coimbatore',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.7680961166952!2d76.97248113181531!3d11.016889516290794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859e895d5f0e9%3A0x4d53bca064097ff7!2sDr.%20Rajalakshmi%20No%3A6%2C%20New%20sidhapudur%2C%20coimbatore!5e0!3m2!1sen!2sin!4v1750242120028!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nA-3, Rajalakshmi Annexe, N.G.Narayanswamy Street\nNew Siddha Pudur, Coimbatore - 641 044',
      phone: '0422 - 4388832',
      email: 'coimbatore@tespaindia.com'
    },
    {
      name: 'Bangalore',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15562.368480442676!2d77.68225884231752!3d12.804966682259192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6de210b86939%3A0x3b7365545df108dc!2sTespa%20calibration%20services!5e0!3m2!1sen!2sin!4v1750242283213!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nNo. 944, Opp. Hennagara Cross, Hosur Main Road\nChandapura, Anekal Taluk, Bangalore - 560 099',
      phone: '080 3271 2878, 4150 7293',
      email: 'bangalore@tespaindia.com'
    },
    {
      name: 'Pune',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7740049.930841319!2d64.58348047499999!3d18.694430100000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b700025f8863%3A0xa0589f296bccd18!2sMisty%20Woods!5e0!3m2!1sen!2sin!4v1750242507302!5m2!1sen!2sin',
      address: 'TESPA CALIBRATION CENTRE\nFlat No. 101, 1st Floor, Misty Woods Building\nPatil Nagar & Chinchwad - 411062',
      phone: '+91 93720 72215',
      email: 'pune@tespaindia.com'
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
