import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import productService from '../services/productService';
import Loading from '../components/common/Loading';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionInProgress, setActionInProgress] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts();
            setProducts(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        // Basic validation
        if (!formData.name?.trim()) return 'Product name is required';
        if (!formData.description?.trim()) return 'Description is required';
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) 
            return 'Price must be a positive number';
        if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) 
            return 'Stock must be a non-negative number';
        if (!formData.category?.trim()) return 'Category is required';
        if (!formData.image?.trim()) return 'Image URL is required';
        
        return null; // No errors
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        
        try {
            setActionInProgress(true);
            await productService.deleteProduct(id);
            
            // Update local state after deletion
            setProducts(products.filter(product => product._id !== id));
            setFeedback({
                type: 'success',
                message: 'Product deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            setFeedback({
                type: 'error',
                message: 'Failed to delete product. Please try again.'
            });
        } finally {
            setActionInProgress(false);
            // Clear feedback after 3 seconds
            setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const validationError = validateForm();
        if (validationError) {
            setFeedback({
                type: 'error',
                message: validationError
            });
            setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
            return;
        }
        
        // Convert price and stock to numbers
        const productData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        };
        
        try {
            setActionInProgress(true);
            const newProduct = await productService.createProduct(productData);
            
            // Update local state with new product
            setProducts([...products, newProduct]);
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                image: ''
            });
            
            setFeedback({
                type: 'success',
                message: 'Product added successfully'
            });
        } catch (error) {
            console.error('Error adding product:', error);
            setFeedback({
                type: 'error',
                message: 'Failed to add product. Please try again.'
            });
        } finally {
            setActionInProgress(false);
            // Clear feedback after 3 seconds
            setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className='min-h-[80vh] flex items-center flex-col bg-gray-50'>
            {/* Feedback message */}
            {feedback.message && (
                <motion.div 
                    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                        feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    {feedback.message}
                </motion.div>
            )}
            
            <div className="w-full max-w-4xl px-4">
                <h1 className="text-4xl font-bold text-red-600 mt-10 mb-6">Add New Product</h1>
                <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Product Name" 
                            className="p-4 border border-gray-300 rounded-lg" 
                            required 
                            onChange={handleChange} 
                            value={formData.name} 
                        />
                        <input 
                            type="number" 
                            name="price" 
                            placeholder="Price" 
                            className="p-4 border border-gray-300 rounded-lg" 
                            required 
                            onChange={handleChange} 
                            value={formData.price} 
                            min="0"
                            step="0.01"
                        />
                    </div>
                    
                    <textarea 
                        name="description" 
                        placeholder="Description" 
                        className="p-4 border border-gray-300 rounded-lg" 
                        required 
                        onChange={handleChange} 
                        value={formData.description}
                        rows={3}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            type="number" 
                            name="stock" 
                            placeholder="Stock" 
                            className="p-4 border border-gray-300 rounded-lg" 
                            required 
                            onChange={handleChange} 
                            value={formData.stock}
                            min="0"
                        />
                        <input 
                            type="text" 
                            name="category" 
                            placeholder="Category" 
                            className="p-4 border border-gray-300 rounded-lg" 
                            required 
                            onChange={handleChange} 
                            value={formData.category} 
                        />
                    </div>
                    
                    <input 
                        type="url" 
                        name="image" 
                        placeholder="Image URL" 
                        className="p-4 border border-gray-300 rounded-lg" 
                        required 
                        onChange={handleChange} 
                        value={formData.image} 
                    />
                    
                    <button 
                        type="submit" 
                        className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors flex justify-center"
                        disabled={actionInProgress}
                    >
                        {actionInProgress ? (
                            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            'Add Product'
                        )}
                    </button>
                </form>
                
                <h1 className="text-4xl font-bold text-red-600 mt-8 mb-6">Products</h1>
                
                {error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                        <p>{error}</p>
                        <button 
                            className="mt-2 text-red-700 underline" 
                            onClick={fetchProducts}
                        >
                            Try Again
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500 p-8">No products available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg relative">
                                <button 
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors" 
                                    onClick={() => deleteProduct(product._id)}
                                    disabled={actionInProgress}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-40 object-cover rounded-lg"
                                    loading="lazy"
                                />
                                <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                                <p className="text-gray-500">₹{product.price}</p>
                                <div className="mt-2 flex justify-between">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                        {product.category}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-sm ${
                                        product.stock > 5 ? 'bg-green-100 text-green-700' :
                                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;