
import { useRef } from 'react';
import { motion } from 'framer-motion';

const ClientsCarousel = () => {
  const clientLogos = [
    { name: 'Client 1', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client1' },
    { name: 'Client 2', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client2' },
    { name: 'Client 3', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client3' },
    { name: 'Client 4', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client4' },
    { name: 'Client 5', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client5' },
    { name: 'Client 6', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client6' },
    { name: 'Client 7', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client7' },
    { name: 'Client 8', logo: 'https://via.placeholder.com/150x60/ffffff/333333?text=Client8' },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="clients" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Valuable Clients</h2>
          <div className="w-20 h-1 bg-[#27a3d4] mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We're proud to work with industry leaders who trust our precision tools and services
          </p>
        </motion.div>
        
        <div className="overflow-hidden relative">
          <motion.div 
            className="flex items-center justify-start space-x-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              }
            }}
          >
            {clientLogos.map((client, index) => (
              <motion.div 
                key={`${client.name}-${index}`} 
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-16 md:h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
            
            {/* Duplicate for seamless looping */}
            {clientLogos.map((client, index) => (
              <motion.div 
                key={`${client.name}-copy-${index}`} 
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src={client.logo}
                  alt={client.name} 
                  className="h-16 md:h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;
