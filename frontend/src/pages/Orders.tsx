import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, CheckCircle, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const { backendUrl, token, currency, navigate, isIndianUser } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `$${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'processing':
        return <Clock className="text-yellow-500" size={18} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={18} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'cancelled':
        return <AlertCircle className="text-red-500" size={18} />;
      default:
        return <Package className="text-gray-500" size={18} />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const loadOrderData = async () => {
    try {
      setIsLoading(true);
      if (!token) {
        toast.error('Please login to view orders');
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}});
      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['orderId'] = order._id;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Empty orders component
  const EmptyOrders = () => (
    <motion.div 
      className='flex flex-col items-center justify-center py-20'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <Package size={64} className="text-gray-400" />
      </div>
      <h2 className='text-2xl font-medium text-gray-700 mb-4'>No Orders Yet</h2>
      <p className='text-gray-500 mb-8 text-center max-w-md'>You haven't placed any orders yet. Browse our products and make your first purchase!</p>
      <Button 
        onClick={() => navigate('/products')} 
        className='bg-[#27a3d4] hover:bg-[#1d8cb8] text-white px-8 py-3 rounded-md'
      >
        Browse Products <ShoppingBag size={16} className="ml-2" />
      </Button>
    </motion.div>
  );

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
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27a3d4]"></div>
            </div>
          ) : orderData.length === 0 ? (
            <EmptyOrders />
          ) : (
            <div className="space-y-6">
              {orderData.map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="max-h-full max-w-full object-contain p-2" 
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className="mt-1 space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="font-medium mr-2">Price:</span>
                              <span className="text-[#27a3d4]">{formatPrice(item.price)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="font-medium mr-2">Quantity:</span>
                              <span>{item.quantity}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="font-medium mr-2">Total:</span>
                              <span className="text-[#27a3d4] font-medium">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Details */}
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Order Date:</span>
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Payment Method:</span>
                          <span className="capitalize">{item.paymentMethod}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Order ID:</span>
                          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{item.orderId}</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)} flex items-center`}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1 capitalize">{item.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                 
                    
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Back to Shopping Button */}
          {orderData.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => navigate('/products')} 
                variant="outline"
                className="text-gray-600 border-gray-300"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Orders;
