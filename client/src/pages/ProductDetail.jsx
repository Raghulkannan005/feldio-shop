
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = fetch("http://localhost:3000/api/products/" + id)
    .then(
      (response) => {
        return response.json()
    })
  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 md:pl-8">
            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-4 text-lg">{product.description}</p>
            <p className="text-2xl font-bold text-primary mt-6">{product.price}</p>
            
            <div className="mt-8 space-y-4">
              <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                Add to Cart
              </button>
              <button className="w-full border-2 border-primary text-primary py-3 px-6 rounded-lg hover:bg-primary/10 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;