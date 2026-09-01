import { useContext,  useState } from "react";
import { CartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const { dispatch } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: crypto.randomUUID(),
      customer: formData,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = [{ ...existingOrders, order }];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    navigate("/order-success", {
      state: {
        orderId: order.id,
        total: order.total,
        items: order.items,
        date: order.date,
        subtotal,
        shipping,
        total,
      },
    });

    dispatch({ type: "CLEAR_CART" });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = shipping + subtotal;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
            Customer Information
          </h1>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
              <span className="mb-2 block">Name</span>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
              <span className="mb-2 block">Email</span>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
              <span className="mb-2 block">Phone</span>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-1">
              <span className="mb-2 block">Address</span>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={cartItems.length === 0}
            className="mt-6 inline-flex rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Place Order
          </button>
        </form>

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
                  <p className="text-slate-600">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 text-slate-700">
            <p className="flex items-center justify-between">
              <span>Subtotal:</span> <span>${formatCurrency(subtotal)}</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Shipping:</span>{" "}
              <span>${formatCurrency(shipping)}</span>
            </p>
            <p className="flex items-center justify-between border-t border-slate-200 pt-2 text-lg font-bold text-slate-900">
              <span>Total:</span> <span>${formatCurrency(total)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
