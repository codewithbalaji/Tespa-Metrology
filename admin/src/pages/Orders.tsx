import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js';

interface OrderItem {
  name: string;
  quantity: number;
  size?: string;
}

interface OrderAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phone: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  address: OrderAddress;
  paymentMethod: string;
  payment: boolean;
  date: string;
  amount: number;
  status: string;
}

interface OrdersProps {
  token: string;
}

const Orders = ({ token }: OrdersProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const statusHandler = async (event: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-4">
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img className="w-12 h-12" src={assets.parcel_icon} alt="" />
                  <div>
                    <p className="text-sm font-medium">Order ID: {order._id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {currency} {order.amount.toLocaleString()}
                  </p>
                  <p className={`text-sm ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.payment ? 'Payment Complete' : 'Payment Pending'}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* Items */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Items ({order.items.length})</h3>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm">
                        {item.name} × {item.quantity}
                        {item.size && <span className="ml-1">({item.size})</span>}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Payment Method: {order.paymentMethod}
                  </p>
                </div>

                {/* Shipping Address */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Shipping Address</h3>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}, {order.address.country},{' '}
                      {order.address.zipcode}
                    </p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Order Status</h3>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders
