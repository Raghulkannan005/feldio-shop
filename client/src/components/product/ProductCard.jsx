import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover bg-blue-200"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">
            {product.price}
          </span>
          <Link
            to={`/products/${product._id}`}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;