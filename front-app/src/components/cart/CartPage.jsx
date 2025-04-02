import React, { useEffect, useState } from "react";
import "../../templates/css/CartPage.css";
import { CART_EP } from "../../utils/constants/endpoints";
import CartCard from "./CartCard";
import Summary from "./Summary";

function CartPage() {
  const [cartData, setCartData] = useState({ cart: [], total: 0 });
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    fetch(CART_EP)
      .then((response) => response.json())
      .then((data) => setCartData(data))
      .catch((error) => console.error("Error fetching cart", error));
  }, []);

  return (
    <div className="cart-list">
      <h2>Cart items</h2>
      {cartData.cart.length == 0 ? (
        <p>The cart is empty</p>
      ) : (
        cartData.cart.map((cartItem) => (
          <CartCard key={cartItem.name} product={cartItem} />
        ))
      )}
      <button onClick={() => setShowSummary(!showSummary)}>Summary
      </button>
      {showSummary && <Summary />}
    </div>
  );
}

export default CartPage;

//rfce
