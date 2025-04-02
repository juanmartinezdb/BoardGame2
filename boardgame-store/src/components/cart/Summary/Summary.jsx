import React from "react";
import "./Summary.css";

export default function Summary({ cart, onPay, paid, orderId, onShopAgain }) {
  let subtotal = 0;
  for (let item of cart) {
    subtotal += item.price * item.units;
  }

  let discount = 0;
  for (let item of cart) {
    if (item.bulk_discount && item.units >= item.bulk_discount.min_qty) {
      discount += item.price * (item.bulk_discount.discount_percent / 100) * item.units;
    }
  }
  const finalTotal = subtotal - discount;

  return (
    <div className="summary">
      <h2>Purchase Summary</h2>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Discount: ${discount.toFixed(2)}</p>
      <p className="total">Total: ${finalTotal.toFixed(2)}</p>
      {!paid ? (
        <button className="btn-pay" onClick={onPay}>
          Pay Now
        </button>
      ) : (
        <>
          <p className="order-message">Payment successful! Order #{orderId}</p>
          <button className="btn-shop" onClick={onShopAgain}>
            Shop Again
          </button>
        </>
      )}
    </div>
  );
}
