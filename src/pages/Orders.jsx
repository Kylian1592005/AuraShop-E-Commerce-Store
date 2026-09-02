import { useState } from "react";
import OrderCard from "../components/OrderCard";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const [orders] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("orders"));
      return Array.isArray(data) ? data.map((item) => item?.order || item) : [];
    } catch {
      return [];
    }
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
          Account
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Order History
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No orders yet
          </h2>
          <p className="mt-2 text-slate-600">
            You haven’t placed any orders yet.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex rounded-lg bg-cyan-600 px-4 py-2.5 font-medium text-white hover:bg-cyan-500"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <OrderCard orders={orders} />
      )}
    </div>
  );
}
