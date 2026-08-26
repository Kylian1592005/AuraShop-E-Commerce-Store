import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to load product. Product might not exist.");
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchSingleProduct();
  }, [id]); 

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!product) return <p>No product data available.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/products" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Back to Products
      </Link>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <img src={product.thumbnail} alt={product.title} width="300" style={{ maxWidth: "100%" }} />
        
        <div>
          <h1>{product.title}</h1>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Stock Status:</strong> {product.stock} items left</p>
        </div>
      </div>
    </div>
  );
}
