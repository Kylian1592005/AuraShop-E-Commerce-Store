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
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">Shopping Cart</h1>

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
          <ul className="space-y-4">
            {cartItems.map((item) => {
              const priceNumber = item.price;
              const itemTotal = priceNumber * item.quantity;

              return (
                <li key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xl font-bold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-slate-600">Price: ${formatCurrency(priceNumber)}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "DECREASE_QUANTITY",
                              payload: item.id,
                            })
                          }
                          className="h-8 w-8 rounded-md bg-slate-200 font-bold text-slate-700 transition hover:bg-slate-300"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center font-semibold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "INCREASE_QUANTITY",
                              payload: item.id,
                            })
                          }
                          className="h-8 w-8 rounded-md bg-slate-200 font-bold text-slate-700 transition hover:bg-slate-300"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                        }
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-base font-semibold text-slate-800">Total: ${formatCurrency(itemTotal)}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-2xl font-bold text-slate-900">Subtotal: ${formatCurrency(subTotal)}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-500"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
