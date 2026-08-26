import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f0f0f0", marginBottom: "1rem" }}>
        <Link to="/products" style={{ marginRight: "1rem", fontWeight: "bold" }}>Shop Products</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  ) 
}
