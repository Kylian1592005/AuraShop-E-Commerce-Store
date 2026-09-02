import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import CartSummary from "../components/CartSummary";

export default function Cart() {
  const { cartItems, dispatch } = useContext(CartContext);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrease = (itemId) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: itemId });
  };

  const handleDecrease = (itemId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: itemId });
  };

  const handleRemove = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };


  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-lg text-slate-600">Your Cart is empty</p>
          <Link
            to="/products"
            className="inline-flex rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500"
          >
            Shopping
          </Link>
        </div>
      ) : (
        <>
          <CartItems onIncrease={handleIncrease} onDecrease={handleDecrease} onRemove={handleRemove}/>
          <CartSummary subTotal={subTotal} itemCount={itemCount} />
        </>
      )}
    </div>
  );
}
