import { useState } from 'react';
import { motion } from 'framer-motion';
import orderService from '../services/orderService';
import Loading from '../components/common/Loading';

const Track = () => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trackOrder = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError('Please enter an order ID or tracking number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = await orderService.trackOrder(trackingId);
      setOrder(orderData);
    } catch (err) {
      setError('Order not found. Please check your order ID or tracking number.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Determine status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Track Your Order</h1>
          
          <form onSubmit={trackOrder} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter Order ID or Tracking Number"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </form>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loading />
            </div>
          ) : order ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Order Info */}
              <div className="flex flex-col md:flex-row justify-between p-6 bg-gray-50 rounded-lg">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Order #{order._id}</h2>
                  <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              {/* Shipping Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Progress</h3>
                <div className="relative">
                  <div className="absolute left-0 top-0 ml-4 h-full w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    {order.trackingEvents && order.trackingEvents.map((event, index) => (
                      <div key={index} className="relative pl-10">
                        <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center 
                          ${index === 0 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {index + 1}
                        </div>
                        <h4 className="text-base font-medium text-gray-800">{event.status}</h4>
                        <p className="text-sm text-gray-500">{formatDate(event.timestamp)}</p>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        {event.location && (
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="inline-block mr-1">📍</span>
                            {event.location}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Default tracking events if none provided */}
                    {!order.trackingEvents && (
                      <>
                        <div className="relative pl-10">
                          <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white">
                            1
                          </div>
                          <h4 className="text-base font-medium text-gray-800">Order Received</h4>
                          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                          <p className="text-sm text-gray-600 mt-1">Your order has been received and is being processed.</p>
                        </div>
                        
                        <div className="relative pl-10">
                          <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                            order.status !== 'Processing' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            2
                          </div>
                          <h4 className="text-base font-medium text-gray-800">Processing</h4>
                          <p className="text-sm text-gray-600 mt-1">Your order is being prepared for shipment.</p>
                        </div>
                        
                        <div className="relative pl-10">
                          <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                            order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            3
                          </div>
                          <h4 className="text-base font-medium text-gray-800">Shipped</h4>
                          <p className="text-sm text-gray-600 mt-1">Your order has been shipped and is on its way.</p>
                        </div>
                        
                        <div className="relative pl-10">
                          <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                            order.status === 'Delivered' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            4
                          </div>
                          <h4 className="text-base font-medium text-gray-800">Delivered</h4>
                          <p className="text-sm text-gray-600 mt-1">Your order has been delivered.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className="flex items-center p-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-gray-100">
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium text-gray-800">₹{order.subtotal?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">Shipping</span>
                      <span className="text-sm font-medium text-gray-800">₹{order.shippingCost?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">Tax</span>
                      <span className="text-sm font-medium text-gray-800">₹{order.tax?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="text-base font-semibold text-gray-800">Total</span>
                      <span className="text-base font-semibold text-gray-900">₹{order.total?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              {order.shippingAddress && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-800">{order.shippingAddress.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{order.shippingAddress.street}</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Phone: {order.shippingAddress.phone}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Track your order status</h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter your order ID or tracking number to see the current status and delivery updates.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Track;