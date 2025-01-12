import { FaShoppingCart, FaHeart, FaSearch, FaHome, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import '../../styles/Header.css';

const hoverSound = new Howl({
  src: ['/sounds/hover.mp3']
});

const clickSound = new Howl({
  src: ['/sounds/click.mp3']
});

const Header = () => {
  const handleHover = () => {
    hoverSound.play();
  };

  const handleClick = () => {
    clickSound.play();
  };

  return (
    <header className="text-blue-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">

        <ul className="flex space-x-4">
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/" className="hover:text-gray-400 text-xl icon" onMouseEnter={handleHover} onClick={handleClick}><FaHome /></a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/contact" className="hover:text-gray-400 text-lg icon" onMouseEnter={handleHover} onClick={handleClick}><FaPhone /></a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/about" className="hover:text-gray-400 icon" onMouseEnter={handleHover} onClick={handleClick}>About</a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/login" className="hover:text-gray-400 icon" onMouseEnter={handleHover} onClick={handleClick}>Login</a>
          </motion.li>
        </ul>

        <motion.h1 className="text-xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Feldio Shop
        </motion.h1>

        <ul className="flex space-x-4">
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/" className="hover:text-blue-400 text-xl icon" onMouseEnter={handleHover} onClick={handleClick}><FaShoppingCart /></a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/" className="hover:text-blue-400 text-xl icon" onMouseEnter={handleHover} onClick={handleClick}><FaHeart /></a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/" className="hover:text-blue-400 text-xl icon" onMouseEnter={handleHover} onClick={handleClick}><FaSearch /></a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <a href="/" className="hover:text-blue-400 icon" onMouseEnter={handleHover} onClick={handleClick}>Track Order</a>
          </motion.li>
        </ul>

      </nav>
    </header>
  );
};

export default Header;