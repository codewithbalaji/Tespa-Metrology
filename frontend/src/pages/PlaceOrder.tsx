import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, Plus, Check, ArrowRight, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { navigate, backendUrl, token, cartItems, setCartItem, getCartAmount, delivery_fee, products, getCartItems, isIndianUser } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  // Check if cart is empty
  const isCartEmpty = () => {
    return Object.values(cartItems).every(quantity => quantity === 0) || 
           Object.keys(cartItems).length === 0;
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `$${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  // Check authentication and cart status on component mount
  useEffect(() => {
    // If cart is empty, redirect to cart page
    if (isCartEmpty()) {
      toast.error('Your cart is empty. Please add items before checkout.');
      navigate('/cart');
      return;
    }
    
    // If user is not authenticated, show auth modal
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    
    // Fetch addresses if authenticated
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/address/get`, {
          headers: { token }
        });
        if (data.success) {
          setSavedAddresses(data.addresses);
        } else {
          toast.error(data.message || 'Failed to fetch addresses');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch saved addresses');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAddresses();
  }, [token, cartItems, navigate, backendUrl]);

  // Handle auth modal close
  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    // If still not authenticated, redirect to cart
    if (!token) {
      navigate('/cart');
    }
  };

  const saveNewAddress = async () => {
    try {
      // Validate form data before sending
      if (!formData.firstName || !formData.lastName || !formData.street || !formData.city || 
          !formData.state || !formData.zipcode || !formData.country || !formData.phone) {
        toast.error('Please fill all required fields');
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/address/save`, 
        { 
          address: formData,
          userId: token // Add userId to the request body
        },
        { 
          headers: { token } 
        }
      );

      if (data.success) {
        setSavedAddresses(data.addresses);
        setShowAddressForm(false);
        setSelectedAddress(formData); // Select the newly added address
        toast.success('Address saved successfully');
      } else {
        toast.error(data.message || 'Failed to save address');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to save address');
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({...data, [name]: value}));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'TESPA TOOLS',
      description: 'Payment for measuring instruments',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const verifyData = {
            ...response,
            userId: token
          };
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', verifyData, {headers:{token}});
          if (data.success) {
            navigate('/orders');
            setCartItem({});
            toast.success('Payment successful! Your order has been placed.');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleMethodChange = (newMethod) => {
    if (newMethod !== 'stripe') {
      setMethod(newMethod);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!selectedAddress && !showAddressForm) {
      toast.error('Please select an address or add a new one');
      return;
    }

    try {
      const items = getCartItems(); // Get formatted cart items

      let orderData = {
        address: showAddressForm ? formData : selectedAddress,
        items: items,
        amount: getCartAmount() + delivery_fee
      };

      switch(method){
        //API Calls for COD
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}});
          console.log(response.data.success);
          if (response.data.success){
            setCartItem({});
            navigate('/orders');
            toast.success('Order placed successfully!');
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case 'stripe': {
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}});
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        case 'razorpay': {
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}});
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Calculate cart total
  const calculateTotal = () => {
    let total = 0;
    const items = getCartItems();
    items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Get cart items for display
  const getCartItemsForDisplay = () => {
    const items = [];
    Object.entries(cartItems).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        const product = products.find(p => p._id === itemId);
        if (product) {
          items.push({
            ...product,
            quantity: typeof quantity === 'number' ? quantity : 
                    (typeof quantity === 'object' ? Object.values(quantity)[0] || 0 : 0)
          });
        }
      }
    });
    return items;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-8">
            <Package size={28} className="text-[#27a3d4] mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          </div>

          <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Delivery Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex items-center">
                  <MapPin size={20} className="text-[#27a3d4] mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Delivery Information</h2>
                </div>
                
                <div className="p-6">
                  {/* Loading State */}
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#27a3d4]"></div>
                    </div>
                  ) : (
                    <>
                      {/* Saved Addresses Section */}
                      {savedAddresses.length > 0 && !showAddressForm && (
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-700">Saved Addresses</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {savedAddresses.map((address, index) => (
                              <div 
                                key={index}
                                onClick={() => setSelectedAddress(address)}
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                  selectedAddress === address 
                                    ? 'border-[#27a3d4] bg-blue-50 shadow-sm' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{address.firstName} {address.lastName}</p>
                                    <p className="text-sm text-gray-600 mt-1">{address.street}</p>
                                    <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipcode}</p>
                                    <p className="text-sm text-gray-600">{address.country}</p>
                                    <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                                  </div>
                                  {selectedAddress === address && (
                                    <div className="bg-[#27a3d4] text-white p-1 rounded-full">
                                      <Check size={16} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add New Address Button */}
                      <div className="mt-6">
                        <Button 
                          type="button"
                          onClick={() => setShowAddressForm(!showAddressForm)}
                          variant={showAddressForm ? "outline" : "default"}
                          className={showAddressForm ? "border-gray-300 text-gray-600" : "bg-[#27a3d4] hover:bg-[#1d8cb8]"}
                        >
                          {showAddressForm ? (
                            'Back to saved addresses'
                          ) : (
                            <>
                              <Plus size={16} className="mr-2" />
                              Add New Address
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Address Form */}
                      {showAddressForm && (
                        <motion.div 
                          className="mt-6 space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                              <input 
                                required 
                                id="firstName"
                                onChange={onChangeHandler} 
                                name="firstName" 
                                value={formData.firstName} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                                type="text" 
                                placeholder="First name"
                              />
                            </div>
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                              <input 
                                required 
                                id="lastName"
                                onChange={onChangeHandler} 
                                name="lastName" 
                                value={formData.lastName} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                                type="text" 
                                placeholder="Last name"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input 
                              required 
                              id="email"
                              onChange={onChangeHandler} 
                              name="email" 
                              value={formData.email} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                              type="email" 
                              placeholder="Email address"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input 
                              required 
                              id="street"
                              onChange={onChangeHandler} 
                              name="street" 
                              value={formData.street} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                              type="text" 
                              placeholder="Street address"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                              <input 
                                required 
                                id="city"
                                onChange={onChangeHandler} 
                                name="city" 
                                value={formData.city} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                                type="text" 
                                placeholder="City"
                              />
                            </div>
                            <div>
                              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                              <input 
                                required 
                                id="state"
                                onChange={onChangeHandler} 
                                name="state" 
                                value={formData.state} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                                type="text" 
                                placeholder="State"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                              <input 
                                required 
                                id="zipcode"
                                onChange={onChangeHandler} 
                                name="zipcode" 
                                value={formData.zipcode} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                                type="text" 
                                placeholder="PIN code"
                              />
                            </div>
                            <div>
                              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                              <input 
                                required 
                                id="country"
                                onChange={onChangeHandler} 
                                name="country" 
                                value={formData.country} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                                type="text" 
                                placeholder="Country"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input 
                              required 
                              id="phone"
                              onChange={onChangeHandler} 
                              name="phone" 
                              value={formData.phone} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#27a3d4] focus:border-[#27a3d4]" 
                              type="tel" 
                              placeholder="Phone number"
                            />
                          </div>
                          
                          <div className="pt-4">
                            <Button 
                              type="button"
                              onClick={saveNewAddress}
                              className="bg-[#27a3d4] hover:bg-[#1d8cb8]"
                            >
                              Save Address
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Payment Method Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex items-center">
                  <CreditCard size={20} className="text-[#27a3d4] mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Razorpay payment */}
                  <div 
                    onClick={() => handleMethodChange('razorpay')} 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      method === 'razorpay' 
                        ? 'border-[#27a3d4] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      method === 'razorpay' ? 'border-[#27a3d4]' : 'border-gray-300'
                    }`}>
                      {method === 'razorpay' && (
                        <div className="w-3 h-3 rounded-full bg-[#27a3d4]"></div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <img className="h-6 mr-3" src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" />
                      <span className="font-medium">Razorpay</span>
                    </div>
                  </div>

                  {/* COD payment */}
                  <div 
                    onClick={() => handleMethodChange('cod')} 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      method === 'cod' 
                        ? 'border-[#27a3d4] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      method === 'cod' ? 'border-[#27a3d4]' : 'border-gray-300'
                    }`}>
                      {method === 'cod' && (
                        <div className="w-3 h-3 rounded-full bg-[#27a3d4]"></div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Truck size={20} className="mr-3 text-gray-600" />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </div>

                  {/* Stripe payment (disabled) */}
                  <div className="flex items-center p-4 border rounded-lg border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                    <div className="flex items-center">
                      <svg className="h-6 mr-3" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 10.4c0-4-3.7-5.8-7.8-5.8-4.2 0-8.7 1.9-8.7 6.4 0 5 6.3 5.1 6.3 7.7 0 1.2-1.4 1.8-2.7 1.8-2.3 0-4.2-1-4.2-1l-.8 3.8s2.3 1 5.4 1c4.6 0 9-2.2 9-6.6 0-5-6.3-5.4-6.3-7.7 0-1 1.1-1.7 2.7-1.7 2.1 0 3.7.8 3.7.8l.8-3.7zM43.4 4.8h-4.5l-6 14.9h4.2l.8-2.2h5.1l.8 2.2h4.2l-4.6-14.9zm-4.2 9.6l2.1-5.8 1.2 5.8h-3.3zM30.7 8.2l.6-3.4h-7.4l-6 14.9h7.4l.6-3.4h-3.3l1.6-4h3.1l.6-3.4h-3.1l1.2-3h4.7zM18.2 4.8l-3.3 8.6-1.4-8.6H9.3L5.9 19.7h3.8l2.2-11.1 1.8 11.1h2.6l3.7-11.1-.5 11.1h3.8L27 4.8z" fill="#6772E5"/>
                      </svg>
                      <span className="font-medium">Stripe</span>
                      <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="bg-gray-50 p-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                </div>
                
                <div className="p-4">
                  <div className="max-h-60 overflow-y-auto mb-4">
                    {getCartItemsForDisplay().map((item, index) => (
                      <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center mr-3 overflow-hidden">
                          <img 
                            src={item.image[0]} 
                            alt={item.name} 
                            className="max-h-full max-w-full object-contain p-1" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-[#27a3d4]">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 py-3 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{formatPrice(delivery_fee)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-[#27a3d4]">{formatPrice(calculateTotal() + delivery_fee)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      type="submit"
                      className="w-full bg-[#27a3d4] hover:bg-[#1d8cb8] py-3"
                    >
                      Place Order <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} />
    </MainLayout>
  );
};

export default PlaceOrder;
