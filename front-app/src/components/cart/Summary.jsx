import { useContext, useState } from "react";
import { CartContext } from "../../utils/context/CartContext";


const Summary = () => {
  const { cart, total } = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleCheckout = () => {
    setOrderId(Math.floor(Math.random() * 1000000));
    setCheckout(true);

    setTimeout(() => {
      window.location.href = "/products";  //este timeout sale la lista vacia al acabar
    }, 5000);
  };

  return (
    <div className="cart-summary">
      <h2>Resumen del Carrito</h2>
      {cart.map((item) => (
        <div key={item.name}>
          <p>{item.name} - {item.units} x ${item.price}</p>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>

      {!checkout ? (
        <button onClick={handleCheckout}>Confirmar Compra</button>
      ) : (
        <>
          <p>✅ ¡Compra confirmada! ID: {orderId}</p>
          <button onClick={() => (window.location.href = "/products")}>Volver a Comprar</button>
        </>
      )}
    </div>
  );
};

export default Summary;
