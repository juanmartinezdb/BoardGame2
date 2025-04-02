import { CART_EP, CART_ADD_EP, CART_REMOVE_EP } from "./endpoints";
  
  export async function getCart() {
    const res = await fetch(CART_EP);
    return res.json();
  }
  
  export async function addToCart(name, units) {
    const res = await fetch(CART_ADD_EP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, units }),
    });
    return res.json();
  }
  
  export async function removeFromCart(name, units) {
    const res = await fetch(CART_REMOVE_EP, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, units }),
    });
    return res.json();
  }