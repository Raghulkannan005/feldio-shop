import { useState, useEffect } from 'react';


const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/products`);
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className='min-h-[80vh] flex items-center flex-col bg-gray-50'>
            <div>
                <h1 className="text-5xl font-bold text-red-600 mt-10">Add Product</h1>
                <form action="" className="flex justify-center items-center flex-col gap-4 min-w-[50vw] mt-10">
                        <input type="text" placeholder="Name" className="p-4 border border-gray-300 rounded-lg min-w-[50vw]" required/>
                        <input type="text" placeholder="Description" className="p-4 border border-gray-300 rounded-lg min-w-[50vw]" required/>
                        <input type="number" placeholder="Price" className="p-4 border border-gray-300 rounded-lg min-w-[50vw]" required/>
                        <input type="number" placeholder="Stock" className="p-4 border border-gray-300 rounded-lg min-w-[50vw]" required/>
                        <input type="text" placeholder="Category" className="p-4 border border-gray-300 rounded-lg min-w-[50vw]" required/>
                        <input type="text" placeholder="Image" className="p-4 border border-gray-300 rounded-lg min-w-[50vw]" required/>
                        <button type="submit" className="bg-red-600 text-white p-4 rounded-lg">Add Product</button>
                </form>
            </div>
            <h1 className="text-5xl font-bold text-red-600 mt-10">Products</h1>
            <div className="grid grid-cols-3 gap-4 mt-10">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
                        <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                        <p className="text-gray-500">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProducts
