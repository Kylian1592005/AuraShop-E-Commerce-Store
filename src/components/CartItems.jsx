import { useContext } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { CartContext } from "../context/CartContext";

export default function CartItems({ onIncrease, onDecrease, onRemove }) {
  const { cartItems } = useContext(CartContext);

  return (
    <ul className="space-y-4">
      {cartItems.map((item) => (
        <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-bold text-slate-900">{item.title}</p>
              <p className="mt-1 text-slate-600">
                Price: ${formatCurrency(item.price)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1">
                <button
                  type="button"
                  onClick={() => onDecrease(item.id)}
                  className="h-8 w-8 rounded-md bg-slate-200 font-bold text-slate-700 transition hover:bg-slate-300"
                >
                  -
                </button>
                <span className="min-w-8 text-center font-semibold text-slate-800">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onIncrease(item.id)}
                  className="h-8 w-8 rounded-md bg-slate-200 font-bold text-slate-700 transition hover:bg-slate-300"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          </div>

          <p className="mt-3 text-base font-semibold text-slate-800">
            Total: ${formatCurrency(item.price * item.quantity)}
          </p>
        </li>
      ))}
    </ul>
  );
}
