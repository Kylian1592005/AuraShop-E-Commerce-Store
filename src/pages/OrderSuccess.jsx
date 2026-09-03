import { Link, useLocation } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import OrderSuccessItems from "../components/OrderSuccessItems";

export default function OrderSuccess() {
  const location = useLocation();
  const orderData = location.state || {};
  const {
    orderId = "ORD-2025-001",
    total = 0,
    items = [],
    date,
  } = orderData;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const totalValue = Number(total || 0);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-8 text-center text-white sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-4xl shadow-inner">
            ✓
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight">
            Order placed successfully!
          </h1>
          <p className="mt-2 text-sm text-emerald-50">
            Thank you for your order. We’re preparing it for shipment.
          </p>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-3">
            <div>
              <p className="text-slate-500">Order ID</p>
              <p className="mt-1 font-semibold text-slate-900">{orderId}</p>
            </div>
            <div>
              <p className="text-slate-500">Date</p>
              <p className="mt-1 font-semibold text-slate-900">{formattedDate}</p>
            </div>
            <div>
              <p className="text-slate-500">Total</p>
              <p className="mt-1 font-semibold text-slate-900">${formatCurrency(totalValue)}</p>
            </div>
          </div>

          <OrderSuccessItems items={items}/>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-500"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-6 py-3 text-base font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
