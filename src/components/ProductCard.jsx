function ProductCard({ product }) {
  return (
    <li>
      <h3>{product.title}</h3>{" "}
      <img src={product.thumbnail} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
    </li>
  );
}

export default ProductCard;
