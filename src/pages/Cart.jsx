import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, dispatch } = useContext(CartContext);
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 && (
        <>
          <p>Your Cart is empty</p>
          <Link to={`/products`}>Shopping</Link>
        </>
      )}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>Price: {item.price}</p>
            {/* <img src={item.thumbnail} alt={item.title} /> */}
            <div>
              <button
                onClick={() =>
                  dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
                }
              >
                -
              </button>
              <strong>Quantity:</strong> {item.quantity}
              <button
                onClick={() =>
                  dispatch({
                    type: "INCREASE_QUANTITY",
                    payload: item.id,
                  })
                }
              >
                +
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
                }}
              >
                Remove
              </button>
              <p>Total: {(item.price).toFixed(2) * item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
      <p>
        Subtotal:{" "}
        {cartItems.reduce(
          (accumulator, item) =>
            accumulator + (item.price).toFixed(2) * item.quantity,
          0,
        )}
      </p>
    </div>
  );
}
