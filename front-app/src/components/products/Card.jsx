import React from "react";
import { Link } from "react-router-dom";
import { CART } from "../../utils/constants/routes";
import "../../templates/css/Card.css";

function Card({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.manufacturer}</p>
      <p>Price: ${product.price}</p>
      {product.bulk_discount && (
        <span className="discount">
          ¡{product.bulk_discount.discount_percent}% DISCOUNT!
        </span>
      )}
      
      <Link to={CART}>
        <button>Add to cart</button>
      </Link>
    </div>
  );
}

export default Card;
