import React, { useState } from "react";
import "./../../templates/css/ProductCard.css";

export default function ProductCard({ product, onBuy }) {
  const { image, name, manufacturer, price, bulk_discount, stock } = product;
  const [units, setUnits] = useState(1);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "" || (Number(value) > 0 && Number.isInteger(Number(value)))) {
      setUnits(value);
      setError("");
    } else {
      setError("Please enter a valid positive number.");
    }
  };

  const handleBuyClick = () => {
    const quantity = parseInt(units);
    if (!quantity || quantity <= 0) {
      setError("Quantity must be at least 1.");
      return;
    }
    onBuy(name, quantity);
    setUnits(1);
  };

  const priceWithDiscount = ((price, bulk_discount) => (price * (1 - bulk_discount.discount_percent/100)).toFixed(2));

  return (
    <div className={`product-card ${stock==0?"disabled-card":""}`} >
  {bulk_discount && (
    <div className="discount-badge">
      -{bulk_discount.discount_percent}%
    </div>
  )}
  <img src={image} alt={name} className="product-image" />
  <div className="product-info">
    <h3>{name}</h3>
    <p className="manufacturer">{manufacturer || "unknown"}</p>
    <p className="price">{price.toFixed(2)} €</p>
    {bulk_discount && (
      <p className="discount-text">
        Buy {bulk_discount.min_units}+ for ${priceWithDiscount(price, bulk_discount)} each
      </p>
    )}
  </div>
  <div className="buy-section">
    <input
      type="number"
      min="1"
      max={stock}
      placeholder="Units"
      value={units}
      className="units-input"
      disabled={stock==0?true:false}
      onChange={handleInputChange}
    />
    <button className="btn-buy" onClick={handleBuyClick} disabled={stock==0?true:false}>
      Add to Cart
    </button>
  </div>
  {error && <div className="error">{error}</div>}
</div>
  );
}
