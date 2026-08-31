import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
        <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">
          New arrivals
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          My AuraShop E-Commerce
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Discover top-quality electronics, accessories, and fitness gear at unbeatable prices.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-cyan-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-cyan-500"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
