import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import CustomerInfo from "../components/CustomerInfo";
import OrderSummary from "../components/OrderSummary";

export default function CheckOut() {
  const { dispatch } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: crypto.randomUUID(),
      customer: formData,
      items: cartItems,
      subtotal,
      shipping,
      total,
      date: new Date().toISOString(),
    };

    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const existingOrders = Array.isArray(savedOrders) ? savedOrders : [];
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, order]),
      );
    } catch (error) {
      console.error("Failed to save order:", error);
    }

    dispatch({ type: "CLEAR_CART" });

    navigate("/order-success", {
      state: {
        orderId: order.id,
        total: order.total,
        items: order.items,
        date: order.date,
      },
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
       <CustomerInfo handleSubmit={handleSubmit} handleChange={handleChange} formData={formData}/>

       <OrderSummary />
      </div>
    </div>
  );
}
