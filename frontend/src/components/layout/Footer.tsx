import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/calibration' },
    { name: 'Clients', href: '#clients' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!scriptAdded.current) {
      // Load Google Translate script
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      scriptAdded.current = true;

      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          "google_translate_element"
        );
      };

      return () => {
        // Cleanup Google Translate elements
        const translateContainer = document.getElementById("google_translate_element");
        if (translateContainer) translateContainer.innerHTML = "";
        if (script.parentNode) script.parentNode.removeChild(script);
        delete window.googleTranslateElementInit;
      };
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">ABOUT US</h3>
            <p className="text-gray-300 text-sm">
              TESPA TECHNOGRAM ENGINEERED SPECIAL PURPOSE APPLICATIONS was promoted by Technicraft Pvt. Ltd & S. Koliyar Shetty, Graduate Engineer of College of Engg, Guindy, Chennai in the year 1983.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">QUICK LINKS</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name} className="flex items-center">
                  <ChevronRight size={14} className="text-[#27a3d4] mr-2" />
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* QR Code */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">QR CODE</h3>
            <div className="bg-white p-2 rounded-lg w-32 h-32">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tespatools.com" 
                alt="TESPA TOOLS QR Code" 
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-400">Scan to visit our website</p>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">CONTACT US</h3>
            <p className="font-semibold">M/S. TESPA TOOLS PVT LTD</p>
            <p className="text-sm text-gray-400">(A GROUP COMPANY OF TESPA)</p>
            
            <div className="flex items-start mt-4">
              <MapPin size={16} className="mr-2 text-[#27a3d4] mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                No.123, Industrial Area, Chennai - 600001, Tamil Nadu, India
              </p>
            </div>
            
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-[#27a3d4] flex-shrink-0" />
              <p className="text-sm text-gray-300">
                +91 9842 9430 / +91 9443 76392
              </p>
            </div>
            
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-[#27a3d4] flex-shrink-0" />
              <p className="text-sm text-gray-300">
                sales@tespatools.com
              </p>
            </div>
            
            <Link to="/contact">
              <Button className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white mt-2 w-full rounded-full">
                Contact Now
              </Button>
            </Link>
            
            {/* Add Google Translate */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-2">Select Language</p>
              <div id="google_translate_element" className="google-translate-footer"></div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} TESPA TOOLS PRIVATE LIMITED. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
