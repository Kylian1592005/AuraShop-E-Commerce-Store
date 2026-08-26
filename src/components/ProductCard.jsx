import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
      
      <Link to={`/products/${product.id}`}>View Details</Link>
    </li>
  );
}

export default ProductCard;
