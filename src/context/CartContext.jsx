import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const getInitialCart = () => {
  try {
    const storedData = localStorage.getItem("cart-items");
    return storedData ? JSON.parse(storedData) : []; 
  } catch (error) {
    console.error("Failed to parse cart items from localStorage:", error);
    return []; 
  }
};


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
  const [cartItems, dispatch] = useReducer(cartReducer, null, getInitialCart);
  
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
