const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export { formatCurrency, calculateTotal, isEmpty };