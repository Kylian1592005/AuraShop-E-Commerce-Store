import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", fontFamily: "sans-serif" }}>
      <h1>My SwiftShop E-Commerce</h1>
      
      <p style={{ color: "#666", fontSize: "1.2rem", margin: "1.5rem 0" }}>
        Discover top-quality electronics, accessories, and fitness gear at unbeatable prices.
      </p>
      
      <Link 
        to="/products" 
        style={{
          display: "inline-block",
          backgroundColor: "#007bff",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Browse Products
      </Link>
    </div>
  );
}
