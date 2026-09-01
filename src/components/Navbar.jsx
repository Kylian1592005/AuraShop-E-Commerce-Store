import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const cartCounts = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-cyan-400 transition hover:text-cyan-300"
          >
            AuraShop
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium sm:text-base">
            <Link to="/" className="text-white transition hover:text-cyan-300">
              Home
            </Link>
            <Link
              to="/products"
              className="text-white transition hover:text-cyan-300"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center text-white transition hover:text-cyan-300"
              aria-label="View basket"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l1.5 9.5a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L18 6H7"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
              <span className="absolute -right-1.5 -top-1.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1.5 text-[10px] font-bold leading-none text-slate-900 shadow-sm ring-2 ring-slate-900">
                {cartCounts}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
