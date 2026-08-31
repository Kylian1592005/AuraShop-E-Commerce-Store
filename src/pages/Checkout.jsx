import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function CheckOut() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { cartItems } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer Information Submitted:", formData);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shippingCost = cartItems.length > 0 ? 10 : 0;
  const total = shippingCost + subTotal;

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Customer Information</h1>

          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="address">Address: </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={cartItems.length === 0}>
            Place Order
          </button>
        </form>

        <div>
          <h1>Order Summary</h1>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <p>{item.title}</p>
                <p>Price: ${item.price}</p>
              </li>
            ))}
          </ul>
          <p>Subtotal: ${formatCurrency(subTotal)}</p>
          <p>Shipping: ${formatCurrency(shippingCost)}</p>
          <p>Total: ${formatCurrency(total)}</p>
        </div>
      </div>
    </>
  );
}
