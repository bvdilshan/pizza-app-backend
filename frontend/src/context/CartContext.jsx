/**
 * @file CartContext.jsx
 * @description Context provider for managing shopping cart state.
 */
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (pizza) => {
        setCartItems((prevItems) => {
            const isItemInCart = prevItems.find((item) => item._id === pizza._id);
            if (isItemInCart) {
                return prevItems.map((item) =>
                    item._id === pizza._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...pizza, quantity: 1 }];
        });
    };


    const removeFromCart = (id) => {
        setCartItems((prevItems) =>
            prevItems.reduce((ack, item) => {
                if (item._id === id) {
                    if (item.quantity === 1) return ack;
                    return [...ack, { ...item, quantity: item.quantity - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [])
        );
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);