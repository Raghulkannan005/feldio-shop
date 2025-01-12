import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa';

const Track = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    // Mock tracking info
    setTrackingInfo({
      status: 'In Transit',
      steps: [
        { icon: FaBoxOpen, label: 'Order Placed', date: '2023-10-01' },
        { icon: FaShippingFast, label: 'Shipped', date: '2023-10-02' },
        { icon: FaTruck, label: 'In Transit', date: '2023-10-03' },
        { icon: FaCheckCircle, label: 'Delivered', date: '2023-10-05' }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Track Your Order</h2>
        <form onSubmit={handleTrackOrder}>
          <div className="mb-4">
            <label htmlFor="orderNumber" className="block text-gray-700">Order Number</label>
            <input 
              type="text" 
              id="orderNumber" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your order number" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required 
            />
          </div>
          <motion.button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Track Order
          </motion.button>
        </form>

        {trackingInfo && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Order Status: {trackingInfo.status}</h3>
            <div className="space-y-4">
              {trackingInfo.steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <step.icon className="text-2xl text-blue-500" />
                  <div>
                    <div className="font-semibold">{step.label}</div>
                    <div className="text-sm text-gray-600">{step.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Track;