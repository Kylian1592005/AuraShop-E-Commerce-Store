import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SearchFilter() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [isOpen, setIsOpen] = useState(false);

  const [history, setHistory] = useState(() => {
    try {
      const storedData = localStorage.getItem("searchHistory");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.log("Error loading search history:", error.message);
      return [];
    }
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category-list",
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    fetchCategories();
  }, []);

  const updateURLParams = (searchVal, categoryVal) => {
    const params = new URLSearchParams();
    const cleanSearch = searchVal.trim();

    if (cleanSearch) params.set("search", cleanSearch);
    if (categoryVal && categoryVal !== "all")
      params.set("category", categoryVal);

    navigate(`/products?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanQuery = query.trim();

    if (cleanQuery) {
      const updatedHistory = [
        cleanQuery,
        ...history.filter(
          (item) => item.toLowerCase() !== cleanQuery.toLowerCase(),
        ),
      ].slice(0, 5);

      setHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }

    updateURLParams(query, selectedCategory);
    setIsOpen(false);
  };

  const handleSelectHistory = (term) => {
    setQuery(term);
    updateURLParams(term, selectedCategory);
    setIsOpen(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    updateURLParams(query, newCat);
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        aria-label="Filter by category"
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 sm:w-40"
      >
        <option value="all">All Categories</option>
        {categories.length === 0 && selectedCategory !== "all" && (
          <option value={selectedCategory}>
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1).replace("-", " ")}
          </option>
        )}
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
          </option>
        ))}
      </select>

      <div className="relative min-w-0 flex-1">
        <form
          onSubmit={handleSearch}
          className="flex h-11 min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
            className="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="inline-flex h-full shrink-0 items-center gap-1.5 rounded-none border-l border-cyan-500/30 bg-cyan-400 px-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path strokeLinecap="round" d="m16 16 4 4" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {isOpen && history.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-950/10">
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">
              <span>Recent Searches</span>
              <button
                type="button"
                onClick={clearHistory}
                className="normal-case tracking-normal text-rose-500 transition hover:text-rose-600 hover:underline"
              >
                Clear All
              </button>
            </div>
            <ul>
              {history.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectHistory(item)}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition hover:bg-cyan-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4 shrink-0 text-slate-400"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="6.5" />
                    <path strokeLinecap="round" d="m16 16 4 4" />
                  </svg>
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
