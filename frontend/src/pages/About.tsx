import { Helmet } from 'react-helmet-async'
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ChevronRight, Gauge, Wrench, BarChart3, Microscope, Ruler, Settings, Clipboard, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const About = () => {

  
  const companyDetails = [
  { title: "Company Name", value: "TESPA METROLOGY" },
  { title: "Year Established", value: "1983" },
  { title: "Business Type", value: "Manufacturer, Importer, Distributor" },
  { title: "Main Products", value: "Precision Metrology Instruments" },
  { title: "Location", value: "Chennai, Bangalore, Coimbatore" },
  { title: "Employees", value: "50-100 People" },
];

const businessActivities = [
  {
    title: "Calibration Services",
    icon: Gauge,
  },
  {
    title: "Repair & Maintenance",
    icon: Wrench,
  },
  {
    title: "Quality Control",
    icon: BarChart3,
  },
  {
    title: "Laboratory Services",
    icon: Microscope,
  },
  {
    title: "Dimensional Metrology",
    icon: Ruler,
  },
  {
    title: "Equipment Sales",
    icon: Settings,
  },
  {
    title: "Documentation",
    icon: Clipboard,
  },
  {
    title: "Facility Management",
    icon: Building,
  },
];

  return (
    <>
      <Helmet>
        <title>About Us | Tespa Metrology</title>
        <meta name="description" content="Learn about Tespa Metrology, a leading manufacturer and supplier of precision measurement tools since 1983." />
        <link rel="canonical" href={`${publicUrl}/about`} />
      </Helmet>
      <MainLayout>
        <div className="bg-[#f8f9fa] min-h-screen">
          <div className="bg-white shadow-sm py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Link to="/" className="hover:text-[#27a3d4]">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-700 font-medium">About Us</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 gap-8">
              {/* Company Overview */}
              <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
                    <div className="w-20 h-1 bg-[#27a3d4] mb-6"></div>
                    
                    <p className="text-gray-700 mb-5 leading-relaxed">
                      Welcome to TESPA METROLOGY, a pioneering force in the field of metrology since 1983. As esteemed manufacturers, importers and distributors of metrology instruments, we have consistently upheld a commitment to precision, accuracy, and innovation throughout our illustrious journey.
                    </p>
                    
                    <p className="text-gray-700 mb-5 leading-relaxed">
                      Discover a comprehensive selection of precision tools designed to cater to various industry needs. From advanced measuring instruments to user-friendly tools, Tespa Tools Pvt. Ltd., is your go-to source for precision without compromise.
                    </p>
                    
                    <p className="text-gray-700 mb-5 leading-relaxed">
                      Beyond our core focus on metrology, we have successfully diversified our business activities to cater to the multifaceted needs of our clients. Our commitment to excellence extends to every facet of our operations, whether it be in product quality, customer service, or exploring new avenues for growth.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Business Activities */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Activities</h2>
                    <div className="w-20 h-1 bg-[#27a3d4] mb-8"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {businessActivities.map((activity, index) => {
                        const IconComponent = activity.icon;
                        return (
                          <motion.div
                            key={index}
                            className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center hover:shadow-md transition-shadow"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-16 h-16 bg-[#27a3d4]/10 rounded-full flex items-center justify-center mb-4">
                              <IconComponent size={24} className="text-[#27a3d4]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Company Details */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Details</h2>
                    <div className="w-20 h-1 bg-[#27a3d4] mb-8"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {companyDetails.map((detail, index) => (
                        <div key={index} className="border-l-4 border-[#27a3d4] pl-4 py-2">
                          <h3 className="text-sm font-medium text-gray-500">{detail.title}</h3>
                          <p className="text-lg font-semibold text-gray-800">{detail.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
               {/* Call to Action */}
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-[#27a3d4] text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Ready to experience the TESPA difference?</h3>
                <p className="mb-6">
                  Join hundreds of satisfied customers who have improved their measurement capabilities 
                  with our precision tools and expert support.
                </p>
                <Link 
                  to="/contact"
                  className="inline-block bg-white text-[#27a3d4] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Contact Us Today
                </Link>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default About;
