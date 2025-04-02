import "./App.css";
import Header from "./components/ui/Header";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/ui/Footer";
import { PRODUCTS, CART } from "./utils/constants/routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/products/ProductPage";
import CartPage from "./components/cart/CartPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CartProvider } from "./utils/context/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <BrowserRouter>
          <NavBar />
            <main>
          <Routes>
            <Route path={PRODUCTS} element={<ProductPage/>} />
            <Route path={CART} element={<CartPage/>} />
          </Routes>
            </main>
        </BrowserRouter>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
