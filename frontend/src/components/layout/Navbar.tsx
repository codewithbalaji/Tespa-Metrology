import { useState, useEffect, useContext } from 'react';
import { Menu, X, ShoppingCart, User, LogOut, Package, Building2, Users, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import AuthModal from '../auth/AuthModal';

// Define available companies
const companies = [
  'Tespa',
  'Sylvac',
  'Mahr'
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { getCartCount, cartItems, token, setToken, setCartItems, isIndianUser } = useContext(ShopContext);

  const logout = () => {
    navigate('/');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setShowUserDropdown(false);
  };

  const openAuthModal = () => {
    setShowUserDropdown(false);
    setShowAuthModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown') && !target.closest('.user-icon')) {
        setShowUserDropdown(false);
      }
      if (!target.closest('.nav-dropdown') && !target.closest('.nav-dropdown-button')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products',
      items: [
        { name: 'TESPA Products', href: '/products?company=Tespa', icon: 'https://res.cloudinary.com/dryhpaq1t/image/upload/e_background_removal/f_png/v1740752141/tespa_logo_fvfey9.jpg', description: 'Precision measurement tools and gauges' },
        { name: 'Sylvac Products', href: '/products?company=Sylvac', icon: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1741707087/logo-sylvac-metrology-hd_bmtjbl.png', description: 'Digital measuring instruments' },
        { name: 'Mahr Products', href: '/products?company=Mahr', icon: 'https://res.cloudinary.com/dryhpaq1t/image/upload/v1741707108/logo-mahr_ymbv9o.svg', description: 'High-precision metrology solutions' }
      ],
      isDropdown: true,
      id: 'products'
    },
    { name: 'Calibration Facilities', href: '/calibration' },
    { name: 'Clients', href: '/clients' },
    { 
      name: 'Company',
      items: [
        { name: 'About', href: '/about', icon: <Building2 className="w-5 h-5 text-[#27a3d4]" />, description: 'Learn about our company history and values' },
        { name: 'Testimonials', href: '/testimonial', icon: <MessageSquare className="w-5 h-5 text-[#27a3d4]" />, description: 'What our clients say about us' },
        { name: 'News', href: '/news', icon: <Calendar className="w-5 h-5 text-[#27a3d4]" />, description: 'Upcoming events and exhibitions' },
      ],
      isDropdown: true,
      id: 'company'
    },
    { name: 'Careers', href: '/careers' }
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleProductClick = (href: string) => {
    navigate(href);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 backdrop-blur-sm bg-white/90 shadow-md' : 'py-4 bg-white/95'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/dyj3rywju/image/upload/v1742822875/tespalogob_yuewe1.png" 
                alt="TESPA TOOLS Logo" 
                className="tespa-logo h-14 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <motion.nav 
              className="flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  className="relative"
                >
                  {link.isDropdown ? (
                    <div className="nav-dropdown">
                      <button 
                        className={`nav-dropdown-button text-gray-600 hover:text-[#27a3d4] text-lg font-medium transition-colors duration-300 relative flex items-center gap-1
                          ${activeDropdown === link.id ? 'text-[#27a3d4]' : ''}`}
                        onClick={() => toggleDropdown(link.id!)}
                      >
                        {link.name}
                        <svg 
                          className={`w-4 h-4 transition-transform ${activeDropdown === link.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === link.id && (
                        <motion.div 
                          className="absolute left-0 mt-2 w-[320px] bg-white rounded-xl shadow-lg py-3 z-50 border border-gray-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 py-2 mb-2 border-b border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900">{link.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">Select an option</p>
                          </div>
                          {link.items?.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => {
                                handleProductClick(item.href);
                                setActiveDropdown(null);
                              }}
                              className="flex items-start w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 group"
                            >
                              {typeof item.icon === 'string' ? (
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                                  <img 
                                    src={item.icon} 
                                    alt={item.name} 
                                    className="w-full h-full object-contain p-1"
                                  />
                                </div>
                              ) : (
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100">
                                  {item.icon}
                                </div>
                              )}
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-[#27a3d4]">
                                  {item.name}
                                </p>
                                {item.description && (
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={link.href!} 
                      className={`text-gray-600 hover:text-[#27a3d4] text-lg font-medium transition-colors duration-300 relative
                        ${location.pathname === link.href ? 'text-[#27a3d4]' : ''}`}
                    >
                      {link.name}
                      {location.pathname === link.href && (
                        <motion.div
                          className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#27a3d4]"
                          layoutId="underline"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>
          </div>
          
          {/* Right Side - User, Cart, Contact */}
          <div className="hidden md:flex items-center space-x-5">
            {/* User Icon with Dropdown */}
            <div className="relative user-dropdown">
              <motion.div
                className="user-icon cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <User size={24} className="text-gray-600 hover:text-[#27a3d4]" />
              </motion.div>
              
              {showUserDropdown && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {token ? (
                    <>
                      <Link 
                        to="/orders" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#27a3d4]"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <Package size={16} className="mr-2" />
                        My Orders
                      </Link>
                      <button 
                        onClick={logout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={openAuthModal}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#27a3d4]"
                    >
                      <User size={16} className="mr-2" />
                      Login / Register
                    </button>
                  )}
                </motion.div>
              )}
            </div>
            
            {/* Cart Icon with Count (hide if Indian user) */}
            {!isIndianUser && (
              <Link to="/cart" className="relative">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <ShoppingCart size={24} className="text-gray-600 hover:text-[#27a3d4]" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#27a3d4] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </motion.div>
              </Link>
            )}
            
            {/* Contact Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/contact">
                <Button className={`bg-[#27a3d4] hover:bg-[#1d8cb8] text-white rounded-full px-8 py-2.5 text-lg font-medium transition-all duration-300 ${location.pathname === '/contact' ? 'bg-[#1d8cb8]' : ''}`}>
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Navigation Toggle and Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Cart Icon with Count (hide if Indian user) */}
            {!isIndianUser && (
              <Link to="/cart" className="relative">
                <ShoppingCart size={22} className="text-gray-600" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#27a3d4] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            )}
            
            {/* User Icon */}
            <div className="relative user-dropdown">
              <div 
                className="user-icon cursor-pointer"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <User size={22} className="text-gray-600" />
              </div>
              
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {token ? (
                    <>
                      <Link 
                        to="/orders" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <Package size={16} className="mr-2" />
                        My Orders
                      </Link>
                      <button 
                        onClick={logout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={openAuthModal}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-2" />
                      Login / Register
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Menu Toggle */}
            <button
              className="text-[#27a3d4]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white w-full animate-slide-down shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-4 py-4">
                {navLinks.map((link) => (
                  link.isDropdown ? (
                    <div key={link.name} className="space-y-3">
                      <div className="text-gray-900 font-medium">{link.name}</div>
                      <div className="space-y-2">
                        {link.items?.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              handleProductClick(item.href);
                              setIsOpen(false);
                            }}
                            className="flex items-center w-full py-2 space-x-3 text-gray-600 hover:text-[#27a3d4]"
                          >
                            {typeof item.icon === 'string' ? (
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                                <img 
                                  src={item.icon} 
                                  alt={item.name} 
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100">
                                {item.icon}
                              </div>
                            )}
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-medium">{item.name}</span>
                              {item.description && (
                                <span className="text-xs text-gray-500">{item.description}</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href!}
                      className={`text-gray-700 hover:text-[#27a3d4] py-3 text-lg font-medium relative
                        ${location.pathname === link.href ? 'text-[#27a3d4]' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      {location.pathname === link.href && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-[#27a3d4]"
                          layoutId="underline-mobile"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  )
                ))}
                
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white w-full rounded-full mt-2 py-3 text-lg">
                    Contact Us
                  </Button>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
