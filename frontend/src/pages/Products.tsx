import { useState, useEffect, useContext } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowRight, X, ChevronRight, MessageSquareHeart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import EnquiryModal from '@/components/EnquiryModal';
import { Helmet } from 'react-helmet-async';

// Define product type
interface Product {
  _id: string;
  slug: string;
  name: string;
  price: number;
  image: string[];
  category: string;
  company: string;
  description: string;
  model: string;
  stock: number;
  specifications: Array<{ key: string; value: string | number | boolean | string[] }>;
  features: string[];
}

// Define category type
interface Category {
  id: string;
  name: string;
  products: Product[];
}

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const Products = () => {
  const { products, isIndianUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const companyParam = params.get('company');
    if (companyParam) {
      setSelectedCompany(companyParam);
    } else {
      setSelectedCompany('');
    }
  }, [location.search]);

  // Group products by category
  useEffect(() => {
    if (products && products.length > 0) {
      // Get unique categories, including 'Others'
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      
      // Create category objects
      const categoryObjects = uniqueCategories.map(categoryName => {
        const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
        const categoryProducts = products.filter(product => product.category === categoryName);
        
        return {
          id: categoryId,
          name: categoryName,
          products: categoryProducts
        };
      });
      
      setCategories(categoryObjects);
      setFilteredProducts(products);
      setLoading(false);
    }
  }, [products]);

  // Filter products based on search query, selected categories, and company
  useEffect(() => {
    if (!products) return;
    
    let filtered = [...products];
    
    // Apply company filter first
    if (selectedCompany) {
      filtered = filtered.filter(product => 
        product.company.toLowerCase() === selectedCompany.toLowerCase()
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category.toLowerCase().replace(/\s+/g, '-'))
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategories, selectedCompany, products]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedCompany('');
    navigate('/products');
  };

  // Get unique companies from products
  const companies = [
    { label: 'All Companies', value: '' },
    { label: 'Sylvac', value: 'Sylvac' },
    { label: 'Mahr', value: 'Mahr' },
    { label: 'Tespa', value: 'Tespa' }
  ];

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
    if (company) {
      navigate(`/products?company=${company}`);
    } else {
      navigate('/products');
    }
  };

  const navigateToProduct = (slug: string) => {
    navigate(`/product/${slug}`);
  };

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
      <Helmet>
        <title>Our Products | Tespa Metrology</title>
        <meta name="description" content="Explore our comprehensive range of high-precision metrology and measurement tools from Tespa Metrology." />
        <link rel="canonical" href={`${publicUrl}/products`} />
      </Helmet>
      <MainLayout>
        {/* Header Section with Breadcrumb */}
        <div className="bg-white shadow-sm py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Our Products</h1>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link to="/" className="hover:text-[#27a3d4]">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700 font-medium">Products</span>
            </div>
          </div>
        </div>

        <motion.div 
          className="py-8 bg-gradient-to-b from-blue-50 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <motion.div 
              className="bg-gradient-to-r from-[#27a3d4] to-[#1d8cb8] rounded-xl p-8 mb-8 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/80 max-w-3xl">
                Explore our comprehensive range of high-precision metrology and measurement tools designed for industrial excellence. TESPA has been a trusted partner for manufacturing industries since 1983.
              </p>
            </motion.div>
            
            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Box */}
                <div className="relative flex items-center w-full">
                  <Search className="absolute left-3 text-gray-400 pointer-events-none" size={18} />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 border-gray-200 focus:border-[#27a3d4] focus:ring focus:ring-[#27a3d4]/10 rounded-full"
                  />
                </div>
                
                {/* Filter Section */}
                <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                  <div className="flex items-center text-gray-700 mr-2">
                    <Filter size={18} className="mr-1" /> 
                    <span className="font-medium">Filters:</span>
                  </div>

                  {/* Company Filter */}
                  <select
                    value={selectedCompany}
                    onChange={(e) => handleCompanyChange(e.target.value)}
                    className="border rounded-full px-4 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#27a3d4]"
                  >
                    {companies.map(company => (
                      <option key={company.value} value={company.value}>
                        {company.label}
                      </option>
                    ))}
                  </select>
                  
                  {/* Category Filters */}
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                      className={`rounded-full text-sm ${
                        selectedCategories.includes(category.id) 
                          ? "bg-[#27a3d4] hover:bg-[#1d8cb8]" 
                          : "text-gray-700 hover:text-[#27a3d4] hover:border-[#27a3d4]"
                      }`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                  
                  {(searchQuery || selectedCategories.length > 0 || selectedCompany) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} className="mr-1" /> Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27a3d4]"></div>
              </div>
            ) : (
              /* Products Display */
              <div className="space-y-12">
                {/* If no filters are applied and not showing company-specific products, show by category */}
                {!searchQuery && selectedCategories.length === 0 && !selectedCompany ? (
                  categories.map(category => (
                    <motion.div 
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-10"
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                        {category.name}
                      </h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {category.products.map((product, index) => (
                          <ProductCard 
                            key={product._id} 
                            product={product} 
                            index={index}
                            onClick={() => navigateToProduct(product.slug)}
                            formatPrice={formatPrice}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // If filters are applied or showing company-specific products, show filtered results
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-5">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'} Found
                    </h2>
                    
                    {filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                          <ProductCard 
                            key={product._id} 
                            product={product} 
                            index={index}
                            onClick={() => navigateToProduct(product.slug)}
                            formatPrice={formatPrice}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No products found matching your criteria.</p>
                        <Button 
                          variant="link" 
                          className="text-[#27a3d4] mt-2"
                          onClick={clearFilters}
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </MainLayout>
    </>
  );
};

// Product Card Component
const ProductCard = ({ 
  product, 
  index, 
  onClick,
  formatPrice
}: { 
  product: Product, 
  index: number, 
  onClick: () => void,
  formatPrice: (price: number) => string
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const { isIndianUser } = useContext(ShopContext);
  
  return (
    <>
      <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
      >
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img 
            src={product.image[0]} 
            alt={product.name}
            className={`w-full h-full object-contain p-4 transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 h-12">{product.name}</h3>
          
          <div className="flex justify-between items-center mt-3 mb-3">
            {product.price > 0 && !isIndianUser ? (
              <div className="text-[#27a3d4] font-semibold">{formatPrice(product.price)}</div>
            ) : (
              <div className="text-gray-600 text-sm italic">Enquire for price</div>
            )}
            <div className="text-xs text-gray-500">
              {product.company} - {product.model}
            </div>
          </div>
          
          {isIndianUser ? (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => setShowEnquiryModal(true)}
                className="flex items-center justify-center gap-1 bg-[#27a3d4] hover:bg-[#1d8cb8] text-white w-full text-sm rounded-full"
              >
                <MessageSquareHeart size={16} />
                <span>Send Enquiry</span>
              </Button>
              <Button 
                onClick={onClick}
                className="flex items-center justify-center gap-1 border-[#27a3d4] text-[#27a3d4] bg-white hover:bg-[#27a3d4]/5 w-full text-sm rounded-full border"
              >
                <span>View Details</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={onClick}
              className="w-full bg-[#27a3d4] hover:bg-[#1d8cb8] text-white rounded-full flex items-center justify-center gap-1 text-sm py-2"
            >
              <span>View Details</span>
              <ChevronRight size={16} />
            </Button>
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

export default Products;
