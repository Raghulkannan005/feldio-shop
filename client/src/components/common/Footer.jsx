import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-r from-red-500 to-red-700 text-white py-8"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2023 Feldio Shop. All rights reserved.</p>
        <p>Follow us on social media for the latest updates and offers.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;