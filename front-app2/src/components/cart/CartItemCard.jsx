import React, { useState } from "react";
import "../../templates/css/CartItemCard.css";

export default function CartItemCard({ item, onUpdateUnits, onRemove, paid }) {
  const [units, setUnits] = useState(item.units);
  const [error, setError] = useState("");

  const handleUnitsChange = (e) => {
    const value = e.target.value;
    const inputNumber = Number(value);
    if (inputNumber > item.max_stock) {
      setError(`Only ${item.max_stock} units available`);
    } else if (inputNumber === 0) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Do you want to remove ${item.name} from your cart?`)) {
        onRemove(item.name, item.units);
      } else {
        setUnits(item.units);
      }
    } else {
      setUnits(inputNumber);
      setError("");
      onUpdateUnits(item.name, inputNumber || 0);
    }
  };

  return (
    <div className={`cart-item-card ${(paid || item.max_stock==0)?"disabled-item-card":""}`}>
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <div className="units-control">
          <label>
            Units:
            <input
              type="number"
              value={units}
              min="0"
              max={item.max_stock}
              disabled={paid || item.max_stock ==0}
              onChange={handleUnitsChange}
              className="units-input"
            />
          </label>
          {error && <span className="error">{error}</span>}
        </div>
        <button
          className="btn-remove"
          disabled={paid}
          onClick={() => onRemove(item.name, item.units)}
        >
          Remove Item
        </button>
      </div>
    </div>
  );
}
