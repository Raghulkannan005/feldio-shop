import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Mainlayout from './components/layout/Mainlayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Track from './pages/Track';
import Wishlist from './pages/Wishlist';
import Admin from './Admin/Admin';
import AdminProducts from './Admin/AdminProducts';
import AdminPayments from './Admin/AdminPayments';
import AdminShipments from './Admin/AdminShipments';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <CartProvider>
        <ErrorBoundary>
          <Mainlayout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/track" element={<Track />} />
              
              {/* Protected user routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Route>
              
              {/* Protected admin routes */}
              <Route element={<PrivateRoute requireAdmin={true} />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/payments" element={<AdminPayments />} />
                <Route path="/admin/shipments" element={<AdminShipments />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Mainlayout>
        </ErrorBoundary>
      </CartProvider>
    </Router>
  );
}

export default App;