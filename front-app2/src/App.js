import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import ProductPage from "./components/products/ProductPage/ProductPage";
import CartPage from "./components/cart/CartPage/CartPage";
import "./App.css";
import { PRODUCTS, CART } from "./utils/routes";

function App() {
  return (
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
  );
}

export default App;
