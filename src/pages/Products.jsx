import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const selectedCategory = searchParams.get("category") || "all";
  const productsPerPage = 21;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const url =
          selectedCategory && selectedCategory !== "all"
            ? `https://dummyjson.com/products/category/${selectedCategory}?limit=0`
            : "https://dummyjson.com/products?limit=0";

        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message || "Something is wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      `${product.title} ${product.description}`
        .toLowerCase()
        .includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  if (loading)
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-lg font-medium text-slate-600">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Explore the collection
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Product List
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          No products match your search or filter criteria.
        </div>
      ) : (
        <>
          <ul className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
          </ul>

          {totalPages > 1 && (
            <nav
              aria-label="Product pagination"
              className="flex flex-wrap items-center justify-center gap-2 pt-2"
            >
              <button
                type="button"
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 text-slate-700 hover:border-cyan-500 hover:text-cyan-700"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
