import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import Summary from "./Summary";
import "../../templates/css/CartPage.css";
import { getCart, removeFromCart } from "../../utils/cartService";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../utils/routes";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [paid, setPaid] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    async function loadCart() {
        const data = await getCart();
        setCart(data.cart);
    }


    const handleUpdateQuantity = (name, newQuantity) => {
        setCart((prevCart) => prevCart.map((item) => 
            item.name === name ? { ...item, units: newQuantity } : item
        )
        );
    };

    const handleRemove = async (name) => {
        const response = await removeFromCart(name);
        if (response.error) {
            alert(`Error: ${response.error}`);
        } else {
            alert(response.message);
            loadCart();
        }
    };

    const handleShowSummary = () => {
        setShowSummary(true);
    };

    const handlePay = () => {
        const OrderId = Math.floor(Math.random() * 100000);
        setOrderId(OrderId);
        setPaid(true);
        alert(`Payment successful! Order #${OrderId}`);
    };

    const handleShopAgain = () => {
        setPaid(false);
        setOrderId(null);
        setShowSummary(false);
        loadCart(); 
        navigate(PRODUCTS);
    };

    return (
        <div className="cart-page">
            <h2>Cart</h2>
            {cart.length == 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="sections">
                    <section className="cart-items">
                        {cart.map((item) => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemove}
                            />
                        ))}
                    </section>
                    <section className="summary">
                        
                        <button className="btn-summary" onClick={handleShowSummary}>
                            Show Summary
                        </button>
                        {showSummary && (
                            <Summary
                                cart={cart}
                                onPay={handlePay}
                                paid={paid}
                                orderId={orderId}
                                onShopAgain={handleShopAgain}
                            />
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}