import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = [];

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
      return state.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
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
