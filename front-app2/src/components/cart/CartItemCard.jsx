import React, { useState } from "react";
import "../../templates/css/CartItemCard.css";

export default function CartItemCard({ item, onUpdateQuantity, onRemove }) {
  const [units, setUnits] = useState(item.units);
  const [error, setError] = useState("");

  const handleUnitsChange = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);
  
    if (value === "" || (numericValue >= 0 && Number.isInteger(numericValue))) {
      if (numericValue > item.max_stock) {
        setError(`Only ${item.max_stock} units available`);
      } else if (numericValue === 0) {
        // eslint-disable-next-line no-restricted-globals
        const confirmDelete = confirm(`Do you want to remove ${item.name} from your cart?`);
        if (confirmDelete) {
          onRemove(item.name, item.units);
        } else {
          setUnits(item.units);
        }
      } else {
        setUnits(numericValue);
        setError("");
        onUpdateQuantity(item.name, numericValue || 0);
      }
    } else {
      setError("Invalid quantity.");
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
              max={item.max_stock}
              onChange={handleUnitsChange}
              className="units-input"
            />
          </label>
          {error && <span className="error">{error}</span>}
        </div>
        <button className="btn-remove" onClick={() => onRemove(item.name, item.units)}>
          Remove Item
        </button>

      </div>
    </div>
  );
}
