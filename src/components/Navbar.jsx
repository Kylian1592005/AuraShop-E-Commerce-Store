import { Link, Outlet } from "react-router-dom";

function Navbar() {
  const styles = {
    navContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#1a1a1a",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#00d2ff",
      textDecoration: "none",
    },
    navLinks: {
      display: "flex",
      gap: "1.5rem",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "500",
      transition: "color 0.2s ease",
    },
    mainContent: {
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    }
  };

  return (
    <>
      <nav style={styles.navContainer}>
        <Link to="/" style={styles.logo}>Store</Link>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/products" style={styles.link}>Products</Link>
          <Link to="/cart" style={styles.link}>Cart</Link>
        </div>
      </nav>

      <main style={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
