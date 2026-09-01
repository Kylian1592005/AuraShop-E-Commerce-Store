import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(CartContext);
  const [ added, setAdded ] = useState(false);

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
        );
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Failed to load product. Product might not exist."
            : err.message || "An unexpected error occurred.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSingleProduct();
  }, [id]);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (loading)
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-lg font-medium text-slate-600">
        Loading product details...
      </div>
    );

  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Error: {error}
      </div>
    );

  if (!product)
    return <div className="text-slate-600">No product data available.</div>;

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center text-sm font-semibold text-cyan-700 transition hover:text-cyan-900"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-[420px] w-full rounded-2xl object-cover shadow-md"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {product.title}
          </h1>

          <div className="space-y-2 text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Price:</span> $
              {product.price}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Description:</span>{" "}
              {product.description}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Rating:</span>{" "}
              {product.rating} / 5
            </p>
            <p>
              <span className="font-semibold text-slate-900">
                Stock Status:
              </span>{" "}
              {added ? product.stock - 1 : product.stock}{" "}
              items left
            </p>
          </div>

          <button
            onClick={addToCart}
            disabled={added}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition duration-200 
              ${added 
                ? "bg-emerald-600 cursor-not-allowed" 
                : "bg-slate-900 hover:bg-slate-700"
              }`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
