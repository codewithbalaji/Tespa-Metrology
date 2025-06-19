import { useState, useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, MessageSquareHeart } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import EnquiryModal from '../EnquiryModal';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string[];
  category: string;
  description: string;
  model: string;
  createdAt: string;
  inStock: boolean;
  rating?: number;
}

const ProductCard = ({ product, index }: { product: Product, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const { isIndianUser } = useContext(ShopContext);
  
  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `$${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  return (
    <>
      <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden" style={{ height: '280px' }}>
          <div className="absolute top-3 left-3 z-10 bg-[#27a3d4]/80 text-white text-xs font-medium py-1 px-2 rounded-full">
            New
          </div>
          <img 
            src={product.image[0]} 
            alt={product.name} 
            className={`w-full h-full object-contain p-4 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}></div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'High-precision measuring instrument with exceptional accuracy and reliability.'}</p>
          {isIndianUser ? (
            <Button 
              onClick={() => setShowEnquiryModal(true)}
              className="flex items-center justify-center gap-1 bg-[#27a3d4] hover:bg-[#1d8cb8] text-white w-full text-sm rounded-full"
            >
              <MessageSquareHeart size={16} />
              <span>Send Enquiry</span>
            </Button>
          ) : (
            <>
              {product.price > 0 ? (
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[#27a3d4] font-semibold">{formatPrice(product.price)}</div>
                  <div className="text-xs text-gray-500">{product.model}</div>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-600 text-sm italic">Enquire for price</div>
                  <div className="text-xs text-gray-500">{product.model}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="col-span-2">
                  <Link to={`/product/${product._id}`}>
                    <Button className="flex items-center justify-center gap-1 bg-[#27a3d4] hover:bg-[#1d8cb8] text-white w-full text-sm rounded-full">
                      <span>View Details</span>
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </motion.div>
      
      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        productName={product.name}
        productId={product._id}
      />
    </>
  );
};

const ProductsSection = () => {
  const { products, isIndianUser } = useContext(ShopContext);
  const [tespaProducts, setTespaProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter for Tespa company products and take the first 4
    if (products && products.length > 0) {
      const filtered = products
        .filter(product => product.company === 'Tespa')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);
      
      setTespaProducts(filtered);
    }
  }, [products]);

  // The ProductCard component already has a Link to view product details
  // No need for additional navigation function

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-[#27a3d4] mb-2">
            Precision Instruments
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Our Products</h2>
          <div className="w-20 h-1 bg-[#27a3d4] mx-auto"></div>
          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Explore our range of high-precision metrology and measurement tools designed for industrial excellence
          </p>
        </motion.div>
        
        {tespaProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tespaProducts.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                index={index} 
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27a3d4]"></div>
          </div>
        )}
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/products">
            <Button className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white px-8 py-3 rounded-full flex items-center gap-2 text-base font-medium">
              View All Products
              <ChevronRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
