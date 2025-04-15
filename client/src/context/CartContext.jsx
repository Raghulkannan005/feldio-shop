import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Calculate total price and count
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    // Update localStorage when cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        // Calculate totals
        const { total, count } = cartItems.reduce((acc, item) => {
            const itemTotal = item.price * item.quantity;
            return {
                total: acc.total + itemTotal,
                count: acc.count + item.quantity
            };
        }, { total: 0, count: 0 });
        
        setTotalPrice(total);
        setItemCount(count);
    }, [cartItems]);

    // Update localStorage when wishlist changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Cart operations
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
            
            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += 1;
                return updatedItems;
            }
            
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        const parsedQuantity = parseInt(quantity);
        
        if (isNaN(parsedQuantity) || parsedQuantity < 1) return;
        
        setCartItems((prevItems) => 
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity: parsedQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };
    
    // Wishlist operations
    const addToWishlist = (product) => {
        setWishlistItems((prevItems) => {
            const exists = prevItems.some(item => item._id === product._id);
            if (exists) return prevItems;
            return [...prevItems, product];
        });
    };
    
    const removeFromWishlist = (productId) => {
        setWishlistItems((prevItems) => prevItems.filter(item => item._id !== productId));
    };

    const value = {
        cartItems,
        wishlistItems,
        totalPrice,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};