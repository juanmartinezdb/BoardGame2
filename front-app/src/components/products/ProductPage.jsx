import React, {useEffect, useState} from 'react'
import { PRODUCTS_EP } from '../../utils/constants/endpoints'
import Card from "./Card"
import "../../templates/css/ProductPage.css"

function ProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        fetch(PRODUCTS_EP)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error)=> console.error("Error fetch products", error));
}, []);

  return (
    <div className='product-page'>
        <h2>Products availables</h2>
        <div className='cards-list'>
            {products.map((p) => (<Card key={p.id} product={p}></Card>))}
        </div>
    </div>
  )
}

export default ProductPage