import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orders() {
  const [orders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("orders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error("Failed to load orders:", error);
      return [];
    }
  });

  return (
    <div>
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <>
          <p>You haven't placed any orders yet.</p>
          <Link to="/products">Start Shopping</Link>
        </>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Total: ${formatCurrency(order.total)}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
