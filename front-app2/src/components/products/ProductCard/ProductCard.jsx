import React, { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({ product, onBuy }) {
  const { image, name, manufacturer, price, bulk_discount } = product;
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "" || (Number(value) > 0 && Number.isInteger(Number(value)))) {
      setQty(value);
      setError("");
    } else {
      setError("Please enter a valid positive number.");
    }
  };

  const handleBuyClick = () => {
    const quantity = parseInt(qty);
    if (!quantity || quantity <= 0) {
      setError("Quantity must be at least 1.");
      return;
    }
    onBuy(name, quantity);
    setQty("");
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3>{name}</h3>
        <p>{manufacturer}</p>
        <p className="price">${price.toFixed(2)}</p>
        {bulk_discount && (
          <span className="badge">
            Bulk discount: Buy {bulk_discount.min_qty}+ with {bulk_discount.discount_percent}% discount
          </span>
        )}
        <div className="buy">
          <input
            type="number"
            min="1"
            placeholder="Qty"
            value={qty}
            className="qty-input"
            onChange={handleInputChange}
          />
          <button className="btn-buy" onClick={handleBuyClick}>
            Buy
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
