import { formatCurrency } from "../utils/formatCurrency";

export default function OrderSuccessItems({ items }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-slate-900">Your items</h2>

      <ul className="space-y-3">
        {items.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-slate-500">
            No items in this order.
          </li>
        ) : (
          items.map((item) => {
            const itemTotal = Number(item.price || 0) * Number(item.quantity || 1);

            return (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
                />

                <div className="flex flex-1 items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-800">{item.title}</p>
                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-slate-900">${formatCurrency(itemTotal)}</p>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
