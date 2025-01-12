const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">Price: ${item.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          className="bg-red-500 text-white px-2 py-1 rounded mr-2" 
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
        <input 
          type="number" 
          value={item.quantity} 
          min="1" 
          className="w-16 text-center border rounded" 
          onChange={(e) => onUpdateQuantity(item.id, e.target.value)} 
        />
      </div>
    </div>
  );
};

export default CartItem;