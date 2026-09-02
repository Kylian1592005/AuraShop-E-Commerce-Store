import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function CartSummary({ subTotal, itemCount }) {
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Cart Summary
        </p>
        <p className="mt-1 text-2xl font-bold text-slate-900">
          Subtotal: ${formatCurrency(subTotal)}
        </p>
        <p className="text-sm text-slate-600">{itemCount} item(s)</p>
      </div>

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
  );
}
