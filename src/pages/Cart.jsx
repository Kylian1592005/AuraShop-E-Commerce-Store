import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function Cart() {
  const { cartItems, dispatch } = useContext(CartContext);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <>
          <p>Your Cart is empty</p>
          <Link to="/products">Shopping</Link>
        </>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => {
              const priceNumber = item.price;
              const itemTotal = priceNumber * item.quantity;

              return (
                <li key={item.id}>
                  <p>{item.title}</p>
                  <p>Price: ${priceNumber.toFixed(2)}</p>
                  <div>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QUANTITY",
                          payload: item.id,
                        })
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
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                    >
                      Remove
                    </button>
                    <p>Total: ${formatCurrency(itemTotal)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p>Subtotal: ${formatCurrency(subTotal)}</p>
          <Link to="/products">Continue Shopping</Link>
          &nbsp;
          <Link to="/checkout">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
}
