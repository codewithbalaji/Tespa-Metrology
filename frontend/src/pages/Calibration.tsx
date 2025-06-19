import { Helmet } from 'react-helmet-async'
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Truck, Check, Calendar, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const publicUrl = import.meta.env.VITE_PUBLIC_URL

// Image Modal Component
const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="relative max-w-4xl w-full">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

const CalibrationFacility = () => {
  const [activeLocation, setActiveLocation] = useState('chennai');
  const [modalImage, setModalImage] = useState({
    isOpen: false,
    src: '',
    alt: ''
  });
  
  const openModal = (src, alt) => {
    setModalImage({
      isOpen: true,
      src,
      alt
    });
  };
  
  const closeModal = () => {
    setModalImage({
      isOpen: false,
      src: '',
      alt: ''
    });
  };

  const locations = [
    {
      id: 'chennai',
      name: 'Chennai',
      title: 'Chennai Calibration',
      description: 'Tespa Calibration Centre located in Anna Nagar East, Chennai was established in the year 1995. Tespa Calibration Center is accredited by NABL for the ISO/IEC 17025. Our NABL Lab is fully equipped with latest computerized equipment from Switzerland, Italy and UK and all Primary and Secondary master Standards. We Offer high-quality calibration in the field of Mechanical (Dimension and Pressure), Electro-Technical or Electrical, and Thermal.',
      image1: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740736332/chennai-1_q5srhx.jpg',
      image2: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740736366/chennai-2_edpc8g.jpg',
      year: '1995',
    },
    {
      id: 'bangalore',
      name: 'Bangalore',
      title: 'Bangalore Calibration',
      description: 'Tespa Calibration Centre accredited by NABL for the ISO / IEC 17025 is located in Bommasandra Industrial Area, Bangalore was established in the year 2004. We provide Calibration Services, Third Party Inspection Services, Cmm Inspection Services and Instrument Calibration Services.',
      image1: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740738307/banglore-2_unfyr0.jpg',
      image2: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740738307/banglore-1_q8hwzb.jpg',
      year: '2004',
    },
    {
      id: 'coimbatore',
      name: 'Coimbatore',
      title: 'Coimbatore Calibration',
      description: 'Tespa Calibration Centre accredited by NABL for the ISO / IEC 17025 is located in Sidhapudur, Coimbatore was establised in the year 2007. TCC Coimbatore act as an one-stop destination servicing more than 200 customers both local and from other parts of Coimbatore. Apart from Calibration, we also carry out Layout Inspection and Component Inspection.',
      image1: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740738343/coimbatore-1_q2ovgs.jpg',
      image2: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740738343/coimbatore-2_lfjsne.jpg',
      year: '2007',
    },
    {
      id: 'mobile',
      name: 'Mobile Calibration',
      title: 'Mobile Calibration',
      description: 'Calibration on wheels is the first in its kind of service started by TESPA in India to serve customers for calibration services at the premises. The mobile calibration reaches the doorsteps of the Customers to calibrate the measuring instruments and gauges. Automotive, Aerospace, Precision Engg. and Tool Room are some of the customers using the mobile services. We TESPA have two mobile labs.',
      image1: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740738383/mobile-1_s21n1e.jpg', 
      image2: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740738382/mobile-2_tzummq.jpg',
      year: null,
    },
  ];

  const activeLocationData = locations.find(loc => loc.id === activeLocation);

  return (
    <>
      <Helmet>
        <title>Calibration Facilities | Tespa Metrology</title>
        <meta name="description" content="Tespa Metrology Calibration Centre is NABL accredited and offers high-quality calibration services in Chennai, Bangalore, Coimbatore, and on-site mobile labs." />
        <link rel="canonical" href={`${publicUrl}/calibration`} />
      </Helmet>
      <MainLayout>
        {/* Image Modal */}
        <ImageModal 
          isOpen={modalImage.isOpen}
          onClose={closeModal}
          imageSrc={modalImage.src}
          imageAlt={modalImage.alt}
        />
        <div className="bg-[#f8f9fa] min-h-screen">
          {/* Header Section */}
          <div className="bg-white shadow-sm py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Calibration Facilities</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Link to="/" className="hover:text-[#27a3d4]">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-700 font-medium">Calibration</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-16">
            {/* Location Tabs */}
            <div className="mb-12">
              <motion.div 
                className="flex flex-wrap space-x-1 md:space-x-3 bg-white rounded-lg p-2 shadow-md justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {locations.map((location) => (
                  <motion.button
                    key={location.id}
                    onClick={() => setActiveLocation(location.id)}
                    className={cn(
                      "px-5 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-300 flex items-center space-x-2",
                      activeLocation === location.id 
                        ? "bg-[#27a3d4] text-white shadow-lg" 
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {location.id === 'mobile' ? (
                      <Truck size={18} />
                    ) : (
                      <MapPin size={18} />
                    )}
                    <span>{location.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Location Content */}
            {activeLocationData && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Text Content */}
                <motion.div 
                  className="lg:col-span-6"
                  key={activeLocationData.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      {activeLocationData.id === 'mobile' ? (
                        <Truck size={24} className="text-[#27a3d4]" />
                      ) : (
                        <MapPin size={24} className="text-[#27a3d4]" />
                      )}
                      <h2 className="text-2xl font-bold text-gray-800">{activeLocationData.title}</h2>
                    </div>
                    
                    <div className="w-20 h-1 bg-[#27a3d4] mb-6"></div>
                    
                    {activeLocationData.year && (
                      <div className="flex items-center mb-4 text-gray-600">
                        <Calendar size={18} className="mr-2 text-[#27a3d4]" />
                        <span>Established in {activeLocationData.year}</span>
                      </div>
                    )}
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {activeLocationData.description}
                    </p>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Services & Certifications</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check size={18} className="mr-2 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">NABL Accredited for ISO/IEC 17025</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={18} className="mr-2 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">High-quality calibration services</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={18} className="mr-2 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">State-of-the-art equipment</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={18} className="mr-2 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Experienced technical staff</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Link 
                      to="/contact" 
                      className="inline-block mt-8 bg-[#27a3d4] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#1d8cb8] transition-colors duration-300"
                    >
                      Request Calibration Service
                    </Link>
                  </div>
                </motion.div>
                
                {/* Images */}
                <motion.div 
                  className="lg:col-span-6"
                  key={`${activeLocationData.id}-images`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="bg-white p-3 shadow-lg rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openModal(activeLocationData.image1, `${activeLocationData.name} Calibration Facility 1`)}
                    >
                      <img 
                        src={activeLocationData.image1} 
                        alt={`${activeLocationData.name} Calibration Facility 1`} 
                        className="w-full h-56 object-cover rounded"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white p-3 shadow-lg rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openModal(activeLocationData.image2, `${activeLocationData.name} Calibration Facility 2`)}
                    >
                      <img 
                        src={activeLocationData.image2} 
                        alt={`${activeLocationData.name} Calibration Facility 2`} 
                        className="w-full h-56 object-cover rounded"
                      />
                    </motion.div>
                    
                    {/* Certification Image */}
                    {activeLocationData.id !== 'mobile' && (
                      <motion.div 
                        className="md:col-span-2 bg-white p-3 shadow-lg rounded-lg overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                          const certSrc = activeLocationData.id === 'chennai' 
                            ? 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1750287729/chennai_qazndu.jpg' 
                            : activeLocationData.id === 'bangalore' 
                            ? 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1750287777/bengaluru_g6rflw.jpg' 
                            : 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1750287715/coimbatore_a5ojjn.jpg';
                          openModal(certSrc, `${activeLocationData.name} NABL Certification`);
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-3 text-center text-gray-800">NABL Certification</h3>
                        <img 
                          src={activeLocationData.id === 'chennai' ? 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1750287729/chennai_qazndu.jpg' : 
                               activeLocationData.id === 'bangalore' ? 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1750287777/bengaluru_g6rflw.jpg' : 
                               activeLocationData.id === 'coimbatore' ? 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1750287715/coimbatore_a5ojjn.jpg' : ''} 
                          alt={`${activeLocationData.name} NABL Certification`}
                          className="w-full object-contain rounded"
                          style={{ height: '300px' }}
                        />
                      </motion.div>
                    )}
                    
                    <motion.div 
                      className="md:col-span-2 bg-[#27a3d4]/10 p-6 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="md:w-1/2 mb-4 md:mb-0">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">Need On-Site Calibration?</h3>
                          <p className="text-gray-700">
                            Our mobile calibration units can come to your facility for on-site calibrations.
                          </p>
                        </div>
                        <div className="md:w-1/2 md:text-right">
                          <Link 
                            to="/contact" 
                            className="inline-block bg-[#27a3d4] text-white font-medium py-2 px-6 rounded-md hover:bg-[#1d8cb8] transition-colors duration-300"
                          >
                            Contact Us
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Additional Info Section */}
            <motion.div
              className="mt-16 bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Tespa Calibration?</h2>
                <div className="w-20 h-1 bg-[#27a3d4] mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-[#27a3d4]/10 rounded-full flex items-center justify-center mb-4">
                      <Check size={24} className="text-[#27a3d4]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">NABL Accredited</h3>
                    <p className="text-gray-600">All our calibration centers are NABL accredited for ISO/IEC 17025, ensuring highest quality standards.</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-[#27a3d4]/10 rounded-full flex items-center justify-center mb-4">
                      <MapPin size={24} className="text-[#27a3d4]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Multiple Locations</h3>
                    <p className="text-gray-600">With facilities in Chennai, Bangalore and Coimbatore, we offer convenient access across South India.</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-[#27a3d4]/10 rounded-full flex items-center justify-center mb-4">
                      <Truck size={24} className="text-[#27a3d4]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Mobile Calibration</h3>
                    <p className="text-gray-600">Our unique mobile calibration service brings our expertise directly to your doorstep.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CalibrationFacility;
