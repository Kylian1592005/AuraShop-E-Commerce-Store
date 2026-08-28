import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);
  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <li>
      <h3>{product.title}</h3>
      <img src={product.thumbnail} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <button onClick={addToCart}>Add to Cart</button>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </li>
  );
}

export default ProductCard;
