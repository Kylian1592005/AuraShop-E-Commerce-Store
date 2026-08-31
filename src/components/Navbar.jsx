import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="bg-slate-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-cyan-400 transition hover:text-cyan-300">
            AuraShop
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium sm:text-base">
            <Link to="/" className="text-white transition hover:text-cyan-300">
              Home
            </Link>
            <Link to="/products" className="text-white transition hover:text-cyan-300">
              Products
            </Link>
            <Link to="/cart" className="text-white transition hover:text-cyan-300">
              Cart
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
