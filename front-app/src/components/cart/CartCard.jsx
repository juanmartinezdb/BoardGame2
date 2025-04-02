import React from "react";
import { CART } from "../../utils/constants/routes";
import { Link } from "react-router-dom";
import "../../templates/css/CartCard.css";

//toFixed(2) PARA DAR FORMATO A LOS FLOAT!
function CartCard({ product }) {
  return (
    <div className="cart-card">
      <img src={product.image} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>{product.manufacturer}</p>
        <div className="price-row">
          <p>Price: ${product.price.toFixed(2)}</p>
          {product.bulk_discount && (
            <span className="discount">
              ¡{product.bulk_discount.discount_percent}% DISCOUNT!
            </span>
          )}
          <Link to={CART}>
            <button>
              <i className=""></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
