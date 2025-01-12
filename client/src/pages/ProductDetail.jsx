const ProductDetail = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src="product-image-url" alt="Product" className="w-full h-auto" />
        </div>
        <div className="md:w-1/2 md:pl-4">
          <h2 className="text-xl font-semibold">Product Title</h2>
          <p className="text-gray-700 mt-2">Product description goes here. It provides details about the product features and specifications.</p>
          <p className="text-lg font-bold mt-4">$Price</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;