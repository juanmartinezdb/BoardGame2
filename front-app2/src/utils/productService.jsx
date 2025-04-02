import { PRODUCTS_EP } from "./endpoints";

export async function getProducts() {
    const res = await fetch(PRODUCTS_EP);
    return res.json();
  }