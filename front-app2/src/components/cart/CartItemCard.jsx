import React, { useState } from "react";
import "../../templates/css/CartItemCard.css";

export default function CartItemCard({ item, onUpdateQuantity, onRemove }) {
  const [units, setUnits] = useState(item.units);
  const [error, setError] = useState("");

  const handleUnitsChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number.isInteger(Number(value)))) {
      setUnits(value);
      setError("");
      onUpdateQuantity(item.name, parseInt(value) || 0);
    } else {
      setError("Invalid quantity.");
    }
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Remove ${item.name} from cart?`)) {
      onRemove(item.name);
    }
  };

  return (
    <div className="cart-item-card">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <div className="quantity-control">
          <label>
            Units:
            <input
              type="number"
              value={units}
              min="0"
              onChange={handleUnitsChange}
              className="units-input"
            />
          </label>
          {error && <span className="error">{error}</span>}
        </div>
        <button className="btn-remove" onClick={handleRemove}>
          Remove Item
        </button>
      </div>
    </div>
  );
}
