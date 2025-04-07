import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import Summary from "./Summary";
import "../../templates/css/CartPage.css";
import {
  getCart,
  removeFromCart,
  updateCartUnits,
  createOrder,
} from "../../utils/cartService";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../utils/routes";
import CountdownTimer from "../utils/CountdownTimer"

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [paid, setPaid] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await loadCart();
    }
    fetchData();
  }, []);

  async function loadCart() {
    const data = await getCart();
    setCart(data.cart);
  }

  const handleUpdateUnits = async (name, newUnits) => {
    const currentItem = cart.find((item) => item.name === name);
    if (!currentItem) return;

    const diff = newUnits - currentItem.units;
    if (diff === 0) return;

    const response = await updateCartUnits(name, diff);
    if (response.error) {
      alert(`Error: ${response.error}`);
    }
    loadCart();
  };

  const handleRemove = async (name, units) => {
    const response = await removeFromCart(name, units);
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

  const handlePay = async () => {
    try {
      const result = await createOrder();
      if (result.error) {
        alert(`Error: ${result.error}`);
      } else {
        setOrderId(result.order_id);
        setPaid(true);
        alert(`Payment successful! Order #${result.order_id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    }
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
                paid = {paid}
                onUpdateUnits={handleUpdateUnits}
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
            {paid && (
              <CountdownTimer onTimeout={handleShopAgain} duration={30} />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
