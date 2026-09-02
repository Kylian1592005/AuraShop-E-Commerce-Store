import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CustomerInfo({ handleSubmit, handleChange, formData }) {
  const { cartItems } = useContext(CartContext);
  return (
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
  );
}
