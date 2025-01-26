import { useState, useEffect } from 'react';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products`);
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Response is not JSON:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

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
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const updatedProducts = await response.json();
                    setProducts(updatedProducts);
                } else {
                    console.error('Response is not JSON:', await response.text());
                }
            } else {
                console.error('Error deleting product:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const updatedProducts = await response.json();
                    setProducts([...products, updatedProducts]);
                    // Reset form
                    setFormData({
                        name: '',
                        description: '',
                        price: '',
                        stock: '',
                        category: '',
                        image: ''
                    });
                } else {
                    console.error('Response is not JSON:', await response.text());
                }
            } else {
                console.error('Error adding product:', await response.text());
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className='min-h-[80vh] flex items-center flex-col bg-gray-50'>
            <div>
                <h1 className="text-5xl font-bold text-red-600 mt-10">Add Product</h1>
                <form onSubmit={onSubmit} className="flex justify-center items-center flex-col gap-4 min-w-[50vw] mt-10">
                    <input type="text" name="name" placeholder="Name" className="p-4 border border-gray-300 rounded-lg w-full" required onChange={handleChange} value={formData.name} />
                    <input type="text" name="description" placeholder="Description" className="p-4 border border-gray-300 rounded-lg w-full" required onChange={handleChange} value={formData.description} />
                    <input type="number" name="price" placeholder="Price" className="p-4 border border-gray-300 rounded-lg w-full" required onChange={handleChange} value={formData.price} />
                    <input type="number" name="stock" placeholder="Stock" className="p-4 border border-gray-300 rounded-lg w-full" required onChange={handleChange} value={formData.stock} />
                    <input type="text" name="category" placeholder="Category" className="p-4 border border-gray-300 rounded-lg w-full" required onChange={handleChange} value={formData.category} />
                    <input type="text" name="image" placeholder="Image" className="p-4 border border-gray-300 rounded-lg w-full" required onChange={handleChange} value={formData.image} />
                    <button type="submit" className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors">Add Product</button>
                </form>
            </div>
            <h1 className="text-5xl font-bold text-red-600 mt-10">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg relative">

                        <button className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => deleteProduct(product._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
                        <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                        <p className="text-gray-500">₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProducts;