import { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaSearch, FaHome, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import click from "/sounds/click.mp3";

const clickSound = new Howl({ src: click });

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    clickSound.play();
    setIsOpen(false);
  };

  return (
    <header className={` w-full z-50 transition-all duration-300 bg-white text-red-600 backdrop-blur `}>
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.h1 
            className="text-2xl font-bold text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Feldio Shop
          </motion.h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks handleClick={handleClick} />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-red-600 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="py-4 space-y-4">
                <MobileNavLinks handleClick={handleClick} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const NavLinks = ({ handleClick }) => (
  <>
    <motion.a
      href="/"
      className="nav-link group relative"
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      <FaHome className="text-xl text-red-600 group-hover:text-orange-400" />
      <span className="nav-tooltip">Home</span>
    </motion.a>

    <div className="flex items-center space-x-6">
      <NavItem href="/about" text="About" />
      <NavItem href="/contact" icon={<FaPhone />} text="Contact" />
      <NavItem href="/cart" icon={<FaShoppingCart />} text="Cart" />
      <NavItem href="/wishlist" icon={<FaHeart />} text="Wishlist" />
      <NavItem href="/track" text="Track Order" />
      <NavItem href="/login" text="Login" className="bg-white/10 px-4 py-2 rounded-full" />
    </div>
  </>
);

const MobileNavLinks = ({ handleClick }) => (
  <div className="flex flex-col space-y-4 text-red-600">
    <MobileNavItem href="/" icon={<FaHome />} text="Home" onClick={handleClick} />
    <MobileNavItem href="/about" text="About" onClick={handleClick} />
    <MobileNavItem href="/contact" icon={<FaPhone />} text="Contact" onClick={handleClick} />
    <MobileNavItem href="/cart" icon={<FaShoppingCart />} text="Cart" onClick={handleClick} />
    <MobileNavItem href="/wishlist" icon={<FaHeart />} text="Wishlist" onClick={handleClick} />
    <MobileNavItem href="/track" text="Track Order" onClick={handleClick} />
    <MobileNavItem href="/login" text="Login" onClick={handleClick} className="bg-white/10 rounded-full" />
  </div>
);

const NavItem = ({ href, icon, text, className = '' }) => (
  <motion.a
    href={href}
    className={`nav-link group relative ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon && <span className="text-xl text-red-600 group-hover:text-orange-400">{icon}</span>}
    {text && <span className="text-red-600 group-hover:text-orange-400">{text}</span>}
  </motion.a>
);

const MobileNavItem = ({ href, icon, text, onClick, className = '' }) => (
  <motion.a
    href={href}
    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 ${className}`}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {icon && <span className="text-xl">{icon}</span>}
    <span>{text}</span>
  </motion.a>
);

export default Header;