import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <li className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-52 w-full rounded-xl object-cover"
      />

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{product.description}</p>

        <p className="mt-3 text-sm text-slate-500">
          <span className="font-semibold text-slate-700">Category:</span> {product.category}
        </p>
        <p className="mt-2 text-lg font-bold text-cyan-700">${product.price}</p>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={addToCart}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Add to Cart
          </button>
          <Link
            to={`/products/${product.id}`}
            className="text-sm font-semibold text-cyan-700 transition hover:text-cyan-900"
          >
            View Details
          </Link>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
