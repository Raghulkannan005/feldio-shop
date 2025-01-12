import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <motion.button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <p className="mt-4 text-center text-gray-600">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;