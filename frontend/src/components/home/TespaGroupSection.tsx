
import { motion, useInView } from 'framer-motion';
import { Building, Users, Truck, Target } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const TespaGroupSection = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  // State for animated counters
  const [counters, setCounters] = useState({
    years: 0,
    clients: 0,
    locations: 0,
    products: 0
  });

  const features = [
    {
      title: "PRODUCTS",
      description: "Manufacturers worldwide depend on Inprocess gauging in their pursuit of excellence in order to improve productivity and reliability and to save time and cost.",
      delay: 0.2,
      icon: Truck
    },
    {
      title: "CALIBRATION",
      description: "TESPA established the Calibration Centre in the year 1995 in the first lab to get Accreditation in 1999 in its part of India.",
      delay: 0.4,
      icon: Target
    },
    {
      title: "PRECISION",
      description: "Our commitment to precision and accuracy has made us a trusted partner for industries across India.",
      delay: 0.6,
      icon: Building
    }
  ];

  const stats = [
    { value: 40, label: "Years Experience", delay: 0.3, stateKey: 'years' },
    { value: 5000, label: "Satisfied Clients", delay: 0.4, stateKey: 'clients' },
    { value: 5, label: "Locations", delay: 0.5, stateKey: 'locations' },
    { value: 10000, label: "Products Delivered", delay: 0.6, stateKey: 'products' }
  ];

  useEffect(() => {
    if (isInView) {
      // Animate counters when section comes into view
      stats.forEach(stat => {
        const key = stat.stateKey as keyof typeof counters;
        const finalValue = stat.value;
        let startValue = 0;
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const valueIncrement = finalValue / totalFrames;
        
        let currentFrame = 0;
        
        const timer = setInterval(() => {
          currentFrame++;
          const progress = currentFrame / totalFrames;
          const easedProgress = easeOutCubic(progress);
          const currentValue = Math.min(Math.round(easedProgress * finalValue), finalValue);
          
          setCounters(prev => ({
            ...prev,
            [key]: currentValue
          }));
          
          if (currentFrame === totalFrames) {
            clearInterval(timer);
          }
        }, frameDuration);
        
        return () => clearInterval(timer);
      });
    }
  }, [isInView]);

  // Easing function for a smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };

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

  // Function to format numbers with plus sign or commas as needed
  const formatValue = (value: number, key: string): string => {
    if (value === 0) return "0";
    
    if (key === 'years' || key === 'locations') {
      return `${value}+`;
    } else {
      return value.toLocaleString() + '+';
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">TESPA GROUP OF COMPANIES</h2>
          <div className="w-24 h-1 bg-[#27a3d4] mx-auto mb-6"></div>
          <p className="text-gray-600 md:text-lg leading-relaxed">
          TESPA Group of Companies, established in 1983, pioneers precision with innovation. We deliver excellence across metrology, robotics, and automation—empowering industries with trusted solutions and decades of engineering expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#27a3d4]"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="p-4 bg-[#27a3d4]/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <feature.icon size={32} className="text-[#27a3d4]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative py-16 px-6 bg-gradient-to-r from-[#1d8cb8] to-[#27a3d4] rounded-xl shadow-xl overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-white/10"></div>
            <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-white/5"></div>
            <div className="absolute bottom-10 left-1/3 w-32 h-32 rounded-full bg-white/5"></div>
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: stat.delay + 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-3 flex justify-center items-center h-16"
                  >
                    {isInView ? formatValue(counters[stat.stateKey as keyof typeof counters], stat.stateKey) : "0"}
                  </motion.div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TespaGroupSection;
