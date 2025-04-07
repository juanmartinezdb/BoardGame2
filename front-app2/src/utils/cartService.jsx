import { CART_EP, CART_ADD_EP, CART_REMOVE_EP, CREATE_ORDER } from "./endpoints";
  
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

//Prueba  
export async function updateCartUnits(name, units) {
  const method = units > 0 ? "POST" : "DELETE";
  const endpoint = units > 0 ? CART_ADD_EP : CART_REMOVE_EP;

  const res = await fetch(endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, units: Math.abs(units) }),
  });

  return res.json();
}

export async function createOrder() {
  const res = await fetch(CREATE_ORDER, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  return res.json();
}