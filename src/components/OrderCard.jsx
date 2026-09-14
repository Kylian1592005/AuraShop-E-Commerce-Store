import { formatCurrency } from "../utils/formatCurrency";

export default function OrderCard({ orders }) {
  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => {
          const items = order.items || [];
          const date = new Date(order.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">
                    Order ID
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {order.id || "Unknown ID"}
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                    {order.status || "Processing"}
                  </span>
                </div>

                <div className="flex items-center gap-6 sm:justify-end">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Date
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {date !== "Invalid Date" ? date : "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Total
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      ${formatCurrency(order.total || 0)}
                    </p>
                  </div>
                </div>
              </div>

              {order.customer && (
                <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700 sm:grid-cols-3">
                  <p>
                    <span className="font-semibold text-slate-900">Customer:</span>{" "}
                    {order.customer.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Email:</span>{" "}
                    {order.customer.email || "N/A"}
                  </p>
                  <p className="sm:col-span-3">
                    <span className="font-semibold text-slate-900">Address:</span>{" "}
                    {order.customer.address || "N/A"}
                  </p>
                </div>
              )}

              <div className="mt-4 space-y-2">
                {items.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No items in this order.
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          <img
                            src={
                              item.thumbnail ||
                              item.image ||
                              "https://placehold.co/120x120/f3f4f6/94a3b8?text=Item"
                            }
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            Qty: {item.quantity || 1}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-slate-900">
                        $
                        {formatCurrency(
                          (item.price || 0) * (item.quantity || 1),
                        )}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
