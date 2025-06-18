import { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token, isIndianUser } = useContext(ShopContext);
  const [cartData, setCartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const proceedToPayment = () => {
    if (token) {
      navigate('/place-order');
    } else {
      toast.info('Please login to proceed with checkout');
      setShowAuthModal(true);
    }
  };

  // Handle auth modal close
  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `$${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (products.length > 0) {
      const tempData: any[] = [];
      // Update to use new cart structure
      Object.entries(cartItems).forEach(([itemId, quantity]) => {
        if (quantity > 0) {
          tempData.push({
            _id: itemId,
            quantity: typeof quantity === 'number' ? quantity : 
                    (typeof quantity === 'object' ? Object.values(quantity)[0] || 0 : 0)
          });
        }
      });
      setCartData(tempData);
    }
    setIsLoading(false);
  }, [cartItems, products]);

  // Calculate cart total
  const calculateTotal = () => {
    let total = 0;
    cartData.forEach(item => {
      const product = products.find(p => p._id === item._id);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    return total;
  };

  // Empty cart component
  const EmptyCart = () => (
    <motion.div 
      className='flex flex-col items-center justify-center py-20'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingCart size={64} className="text-gray-400" />
      </div>
      <h2 className='text-2xl font-medium text-gray-700 mb-4'>Your Cart is Empty</h2>
      <p className='text-gray-500 mb-8 text-center max-w-md'>Looks like you haven't added any products to your cart yet. Browse our collection to find quality measuring instruments.</p>
      <Button 
        onClick={() => navigate('/products')} 
        className='bg-[#27a3d4] hover:bg-[#1d8cb8] text-white px-8 py-3 rounded-md'
      >
        Browse Products <ShoppingBag size={16} className="ml-2" />
      </Button>
    </motion.div>
  );

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27a3d4]"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-8">
            <ShoppingCart size={28} className="text-[#27a3d4] mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          </div>
          
          {cartData.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 text-sm font-medium text-gray-600">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                  
                  {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null;

                    return (
                      <motion.div 
                        key={index} 
                        className="border-b border-gray-100 last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 p-4 items-center gap-4">
                          {/* Product Info */}
                          <div className="md:col-span-6 flex items-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-md flex items-center justify-center mr-4 overflow-hidden">
                              <img 
                                src={productData.image[0]} 
                                alt={productData.name} 
                                className="max-h-full max-w-full object-contain p-2" 
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800 line-clamp-2">{productData.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">{productData.model}</p>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="md:col-span-2 text-center">
                            <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                            <div className="text-[#27a3d4] font-medium">{formatPrice(productData.price)}</div>
                          </div>
                          
                          {/* Quantity */}
                          <div className="md:col-span-2 flex justify-center">
                            <div className="md:hidden text-sm text-gray-500 mb-1 mr-2">Quantity:</div>
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                onClick={() => item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <input 
                                type="number" 
                                min="1" 
                                value={item.quantity} 
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    updateQuantity(item._id, value);
                                  }
                                }}
                                className="w-12 text-center border-x py-1 focus:outline-none" 
                              />
                              <button 
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          {/* Total */}
                          <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                            <div className="md:hidden text-sm text-gray-500">Total:</div>
                            <div className="text-gray-800 font-medium">{formatPrice(productData.price * item.quantity)}</div>
                            <button 
                              className="text-red-500 hover:text-red-700 md:ml-4"
                              onClick={() => updateQuantity(item._id, 0)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    onClick={() => navigate('/products')} 
                    variant="outline"
                    className="text-gray-600 border-gray-300"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      // Clear cart implementation
                      Object.keys(cartItems).forEach(id => {
                        updateQuantity(id, 0);
                      });
                      toast.success('Cart cleared successfully');
                    }} 
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    Clear Cart <Trash2 size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-[#27a3d4]">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={proceedToPayment} 
                    className="w-full bg-[#27a3d4] hover:bg-[#1d8cb8] text-white py-3 rounded-md"
                  >
                    Proceed to Checkout <ArrowRight size={16} className="ml-2" />
                  </Button>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    <p className="mb-2">We accept:</p>
                    <div className="flex gap-2">
                      <div className="bg-gray-100 rounded p-1">
                        <img src="https://res.cloudinary.com/dryhpaq1t/image/upload/v1740752141/visa_ixlpjf.png" alt="Visa" className="h-6" />
                      </div>
                      <div className="bg-gray-100 rounded p-1">
                        <img src="https://res.cloudinary.com/dryhpaq1t/image/upload/v1740752141/mastercard_ixlpjf.png" alt="Mastercard" className="h-6" />
                      </div>
                      <div className="bg-gray-100 rounded p-1">
                        <img src="https://res.cloudinary.com/dryhpaq1t/image/upload/v1740752141/paypal_ixlpjf.png" alt="PayPal" className="h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} />
    </MainLayout>
  );
};

export default Cart;
