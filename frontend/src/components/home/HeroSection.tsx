import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const imagesRef = useRef<HTMLDivElement>(null);

  const heroImages = [
    {
      url: 'https://res.cloudinary.com/dyj3rywju/image/upload/v1750310886/0I5A4859_n08oev-min_vqo8tz.webp',
      title: 'Precision Metrology',
      subtitle: 'Advanced measurement solutions for quality control'
    },
    {
      url: 'https://res.cloudinary.com/dyj3rywju/image/upload/v1750310886/0I5A4896_ui7syb-min_y7t9o7.webp',
      title: 'Coordinate Measuring',
      subtitle: 'High-accuracy dimensional inspection systems'
    },
    {
      
      url: 'https://res.cloudinary.com/dyj3rywju/image/upload/v1750310886/0I5A4902_ymfoty-min_xc5nnp.webp',
      title: 'Industrial Quality',
      subtitle: 'Comprehensive inspection tools for manufacturing'
    }
  ];

  const clientLogos = [
    { name: 'Client 1', logo: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733278/client-1_iehmud.jpg' },
    { name: 'Client 2', logo: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733278/client-2_xesl1v.jpg' },
    { name: 'Client 3', logo: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733286/cli56_rkpi5a.png' },
    { name: 'Client 4', logo: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733283/client-41_ofeuje.jpg' },
    { name: 'Client 5', logo: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733283/client-36_f1xoql.jpg' },
    { name: 'Client 6', logo: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1740733282/client-33_gx506u.jpg' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div ref={imagesRef} className="hidden">
        {heroImages.map((image, index) => (
          <img key={index} src={image.url} alt="preload" />
        ))}
      </div>
      
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 z-0"
          initial={false}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 0 : -1
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
            zIndex: { delay: currentSlide === index ? 0 : 1.5 }
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${image.url})`,
              willChange: 'opacity',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-[#27a3d4] w-10' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center pb-32 md:pb-0">
        <div className="max-w-3xl">
          <motion.div 
            className="flex items-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-1 w-16 bg-[#27a3d4] mr-4"></div>
            <span className="text-[#27a3d4] font-medium tracking-wider uppercase text-sm">
              TESPA METROLOGY
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mb-2"
              >
                {heroImages[currentSlide].title}
              </motion.div>
            </AnimatePresence>
            
            <motion.div 
              className="text-[#27a3d4] mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Innovation Delivered
            </motion.div>
            <motion.div 
              className="text-2xl md:text-3xl font-medium text-white/80 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Since 1983
            </motion.div>
          </motion.h1>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentSlide}
              className="text-xl md:text-2xl mb-10 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {heroImages[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/products">
                <Button className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white px-8 py-6 text-base rounded-full shadow-lg w-full sm:w-auto">
                  <span>Explore Products</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/contact">
                <Button variant="outline" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full shadow-lg w-full sm:w-auto">
                  <span>Contact Us</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
        
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 py-4 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-3">
            <div className="h-1 w-10 bg-[#27a3d4] mr-3"></div>
            <h3 className="text-gray-800 font-medium text-sm uppercase tracking-wider">Trusted By Industry Leaders</h3>
            <div className="h-1 w-10 bg-[#27a3d4] ml-3"></div>
          </div>
          
          <div className="overflow-hidden h-16 flex items-center">
            <motion.div 
              className="flex items-center justify-start space-x-12"
              animate={{ 
                x: [0, -1500] 
              }}
              transition={{ 
                x: { 
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                  repeatDelay: 0
                } 
              }}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
                <motion.div 
                  key={`${client.name}-${index}`} 
                  className="flex-shrink-0" 
                  whileHover={{ scale: 1.1 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
