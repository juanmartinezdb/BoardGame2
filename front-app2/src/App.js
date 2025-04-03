import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/ux/Header";
import Footer from "./components/ux/Footer";
import Menu from "./components/ux/Menu";
import ProductPage from "./components/products/ProductPage";
import CartPage from "./components/cart/CartPage";
import "./App.css";
import { PRODUCTS, CART } from "./utils/routes";

function App() {
  return (
    <div className="app">
    <BrowserRouter>
      <Header />
      <Menu />
      <main className="main-content">
        <Routes>
          <Route path={PRODUCTS} element={<ProductPage />} />
          <Route path={CART} element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
