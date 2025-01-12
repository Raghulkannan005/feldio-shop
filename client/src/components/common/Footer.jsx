import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div {...fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">Feldio Shop</h3>
            <p className="text-gray-300 mb-4">Your ultimate destination for trending and innovative products. Discover what's new and exciting in the world of consumer goods.</p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.2, color: '#1DA1F2' }}
                href="https://twitter.com" 
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, color: '#4267B2' }}
                href="https://facebook.com"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, color: '#E1306C' }}
                href="https://instagram.com"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, color: '#0077B5' }}
                href="https://linkedin.com"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Trending', 'New Arrivals', 'Best Sellers', 'Categories'].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <FaPhone className="mr-3" />
                <span>+91 9677605417</span>
              </li>
              <li className="flex items-center text-gray-300">
                <FaEnvelope className="mr-3" />
                <span>support@example.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <FaMapMarkerAlt className="mr-3" />
                <span>123 Chengalpattu, India</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
          >
            <p>&copy; {new Date().getFullYear()} Feldio Shop. Your Trendy Products Marketplace.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;