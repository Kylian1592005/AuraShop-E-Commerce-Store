import { formatCurrency } from "../utils/formatCurrency";

export default function OrderSummary({ cartItems, subtotal, shipping, total }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-slate-900">
        Order Summary
      </h1>

      <ul className="space-y-3">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-slate-800">{item.title}</p>
              <p className="text-slate-600">
                {item.quantity} x ${formatCurrency(item.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2 text-slate-700">
        <p className="flex items-center justify-between">
          <span>Subtotal:</span> <span>${formatCurrency(subtotal)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Shipping:</span> <span>${formatCurrency(shipping)}</span>
        </p>
        <p className="flex items-center justify-between border-t border-slate-200 pt-2 text-lg font-bold text-slate-900">
          <span>Total:</span> <span>${formatCurrency(total)}</span>
        </p>
      </div>
    </div>
  );
}
