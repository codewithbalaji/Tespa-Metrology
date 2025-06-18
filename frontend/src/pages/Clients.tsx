import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ChevronRight, Building, Users, Globe, Link } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import EnquirySection from '@/components/home/EnquirySection';
import { Helmet } from 'react-helmet-async'

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const Clients = () => {
  const clientCategories = [
    {
      category: "Automotive",
      clients: [
        { name: "Auto Company 1", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733286/cli60_occmis.png" },
        { name: "Auto Company 2", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733286/cli58_fksx7l.png" },
        { name: "Auto Company 3", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733286/cli56_rkpi5a.png" },
        { name: "Auto Company 4", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733286/cli59_snl2c0.png" },
        { name: "Auto Company 5", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733286/cli57_r44imo.png" },
      ]
    },
    {
      category: "Aerospace",
      clients: [
        { name: "Aerospace Company 1", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733285/cli53_r0qbkq.png" },
        { name: "Aerospace Company 2", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733286/cli54_zf6gzl.png" },
        { name: "Aerospace Company 3", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733285/cli55_eo9dqp.png" },
        { name: "Aerospace Company 4", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733285/cli52_w0azqv.png" },
      ]
    },
    {
      category: "Manufacturing",
      clients: [
        { name: "Manufacturing Company 1", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733285/cli51_qgyipl.png" },
        { name: "Manufacturing Company 2", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733285/cli50_mqtwhd.png" },
        { name: "Manufacturing Company 3", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733285/cli49_abgnvr.png" },
        { name: "Manufacturing Company 4", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733284/cli47_ixfsd2.png" },
        { name: "Manufacturing Company 5", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733284/cli48_h3dfqm.png" },
      ]
    },
    {
      category: "Technology",
      clients: [
        { name: "Tech Company 1", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733284/cli43_ntw1u3.png" },
        { name: "Tech Company 2", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733284/cli44_r1udiy.png" },
        { name: "Tech Company 3", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733284/cli46_ws2vkm.png" },
        { name: "Tech Company 4", logo: "https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733284/cli45_jxoyx4.png" },
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Clients | Tespa Metrology</title>
        <meta name="description" content="Tespa Metrology is trusted by industry leaders for precision tools and calibration services. See our valued clients across automotive, aerospace, manufacturing, and technology sectors." />
        <link rel="canonical" href={`${publicUrl}/clients`} />
      </Helmet>
      <MainLayout>
        <div className="bg-[#f8f9fa] min-h-screen">
          {/* Header Section */}
          <div className="bg-white shadow-sm py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Our Clients</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <RouterLink to="/" className="hover:text-[#27a3d4]">Home</RouterLink>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-700 font-medium">Clients</span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <motion.div 
            className="py-16 bg-gradient-to-r from-[#1d8cb8] to-[#27a3d4] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Globe size={48} className="mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Industry Leaders</h2>
                <p className="text-lg md:text-xl opacity-90">
                  For over 40 years, TESPA has been providing high-precision tools and calibration services 
                  to leading companies across various industries. Our commitment to quality and precision 
                  has made us the preferred partner for businesses worldwide.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Clients Section */}
          <div className="container mx-auto px-4 py-16">
            <motion.div 
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Valued Clients</h2>
              <div className="w-24 h-1 bg-[#27a3d4] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We take pride in our long-standing relationships with clients across diverse sectors.
                Here are some of the organizations that trust TESPA for their precision measurement needs.
              </p>
            </motion.div>

            {clientCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <Building className="text-[#27a3d4] mr-3" size={24} />
                  <h3 className="text-2xl font-bold text-gray-800">{category.category} Sector</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.clients.map((client, index) => (
                    <motion.div 
                      key={client.name}
                      className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-36 hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + categoryIndex * 0.1 }}
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievements Section */}
          <motion.div 
            className="bg-white py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Client Achievements</h2>
                <div className="w-24 h-1 bg-[#27a3d4] mx-auto mb-6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-gray-50 rounded-lg p-8 text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-[#27a3d4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-[#27a3d4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">500+</h3>
                  <p className="text-gray-600">Satisfied Clients</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 rounded-lg p-8 text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-[#27a3d4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe size={32} className="text-[#27a3d4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">20+</h3>
                  <p className="text-gray-600">Countries Served</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 rounded-lg p-8 text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-[#27a3d4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Link size={32} className="text-[#27a3d4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">40+</h3>
                  <p className="text-gray-600">Years of Excellence</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enquiry Section */}
          <EnquirySection />
        </div>
      </MainLayout>
    </>
  );
};

export default Clients;
