import { Helmet } from 'react-helmet-async'
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const About = () => {
  const companyDetails = [
    { title: 'Nature of Business', value: 'Manufacturer, Supplier, Exporter' },
    { title: 'Number of Employees', value: '86 Employees' },
    { title: 'Year of Establishment', value: '1983' },
    { title: 'Market Covered', value: 'Asia, Middle East and European Countries' },
    { title: 'Name of Founder', value: 'Mr. Kolyar Sudendranath Shetty' },
    { title: 'GST No', value: '33AAACT2870N1Z5' },
    { title: 'Annual Turnover', value: 'Rs. 9 Crore Approx' },
    { title: 'Legal Status of Firm', value: 'Private Limited Company' },
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
                      Established in the year 1983, Tespa Tools Pvt Ltd is among the leading and trustworthy organizations of this domain, engaged in Manufacturers, Exporters, Supplier a wide range of products.
                    </p>
                    
                    <p className="text-gray-700 mb-5 leading-relaxed">
                      Our offered assortment of products is comprises of Exato 565 Coordinate Measuring Machine, Exato 785 Coordinate Measuring Machine, Exato 7106 Coordinate Measuring Machine, Exato 9158 Coordinate Measuring Machine, Exato 10209 Coordinate Measuring Machine, Orama 2015 Video Measuring Machine, Orama 3020 Video Measuring Machine, Orama 4030 Video Measuring Machine, Metra 450 Mm 2D Height Gauge, Metra 700mm 2D Height Gauge etc.
                    </p>
                    
                    <p className="text-gray-700 mb-5 leading-relaxed">
                      Offered products are manufactured from supreme grade basic material by using modern tools and technology. All these products are made as per the industry approved parameters with the supervision of our skilled and experienced workforce. Our offered products are highly demanded across the market for their optimum quality.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Our organization is growing with a fast rate because of valuable assistance of our mentor, Mr. Kolyar Sudendranath Shetty. His management skills, ability to handle crucial situation and regular motivation, enabled us to achieve such a remarkable peak of success in the market.
                    </p>
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
