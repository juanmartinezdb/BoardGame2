import { createContext, useState, useEffect } from "react";
import { CART_ADD_EP, CART_REMOVE_EP } from "../constants/endpoints";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.units, 0);

    setTotal(newTotal);
  }, [cart]);

  const addToCart = async (product) => {
    const response = await fetch(CART_ADD_EP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: product.name, units: 1 }),
    });

    const data = await response.json();
    if (!data.error) {
      setCart([...cart, { ...product, units: 1 }]);
    } else {
      alert(data.error);
    }
  };

  const removeFromCart = async (name) => {
    const response = await fetch(CART_REMOVE_EP, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, units: 1 }),
    });

    const data = await response.json();
    if (!data.error) {
      setCart(cart.filter((item) => item.name !== name || item.units > 1));
    } else {
      alert(data.error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
