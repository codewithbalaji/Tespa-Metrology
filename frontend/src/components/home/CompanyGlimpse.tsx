
import { Building, Users, Calendar, Globe, User } from 'lucide-react';
import { motion } from 'framer-motion';

const CompanyGlimpse = () => {
  const companyDetails = [
    {
      title: 'Nature of Business',
      value: 'Manufacturer, Supplier, Exporter',
      icon: Building,
      delay: 0.1,
    },
    {
      title: 'Number of Employees',
      value: '86 Employees',
      icon: Users,
      delay: 0.2,
    },
    {
      title: 'Year of Establishment',
      value: '1983',
      icon: Calendar,
      delay: 0.3,
    },
    {
      title: 'Market Covered',
      value: 'Asia, Middle East and European Countries',
      icon: Globe,
      delay: 0.4,
    },
    {
      title: 'Name of Founder',
      value: 'Mr. Koliyar Suddernath Shetty',
      icon: User,
      delay: 0.5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Glimpse of Our Company</h2>
          <div className="w-20 h-1 bg-[#27a3d4] mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Building excellence in precision tools since 1983
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {companyDetails.map((detail, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
              transition={{ duration: 0.4, delay: detail.delay }}
            >
              <div className="mb-6 p-4 rounded-full bg-[#27a3d4]/10 text-[#27a3d4]">
                <detail.icon size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{detail.title}</h3>
              <p className="text-gray-600">{detail.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyGlimpse;
