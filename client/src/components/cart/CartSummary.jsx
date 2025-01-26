const CartSummary = ({ items, totalPrice }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Cart Summary</h2>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span>{item.name} (x{item.quantity})</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between font-bold">
        <span>Total:</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;