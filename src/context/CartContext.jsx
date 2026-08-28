import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = [
  {
    id: 101,
    title: "Wireless Noise-Canceling Headphones",
    price: 200,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    inStock: 8,
  },
  {
    id: 102,
    title: "Ergonomic Mechanical Keyboard",
    price: 89.5,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    inStock: 15,
  },
];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...state,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    case "REMOVE_FROM_CART": {
      const productId = action.payload;
      return state.filter((item) => item.id !== productId);
    }

    case "INCREASE_QUANTITY": {
      const productId = action.payload;
      return state.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      );
    }

    case "DECREASE_QUANTITY": {
      const productId = action.payload;
      const updatedCart = state.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updatedCart.filter((item) => item.quantity > 0);
    }

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
