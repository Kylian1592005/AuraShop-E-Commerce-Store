import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems } = useContext(CartContext);
  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>{item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
