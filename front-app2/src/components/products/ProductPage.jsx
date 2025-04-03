import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./../../templates/css/ProductPage.css";
import { getProducts } from "../../utils/productService";
import { addToCart } from "../../utils/cartService";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  const handleBuy = async (name, quantity) => {
    const response = await addToCart(name, quantity);
    if (response.error) {
      alert(`Error: ${response.error}`);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="product-page">
      <h2>Available Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
}