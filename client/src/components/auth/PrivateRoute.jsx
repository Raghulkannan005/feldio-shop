// filepath: d:\raghulLivesHere\feldio-shop\client\src\components\auth\PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import Loading from '../common/Loading';

/**
 * Private route component for protecting authenticated routes
 * 
 * @param {Object} props
 * @param {boolean} props.requireAdmin - Whether the route requires admin privileges
 * @returns {React.ReactElement} - Protected route component
 */
const PrivateRoute = ({ requireAdmin = false }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        const authStatus = authService.isLoggedIn();
        setIsAuthenticated(authStatus);

        // Check for admin status if needed
        if (authStatus && requireAdmin) {
          setIsAdmin(authService.isAdmin());
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requireAdmin]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If requires admin but user is not admin, redirect to home
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and has required privileges, render the protected route
  return <Outlet />;
};

export default PrivateRoute;