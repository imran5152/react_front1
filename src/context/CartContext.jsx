import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };

    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map(i => i.id === action.payload ? { ...i, qty: i.qty - 1 } : i)
          .filter(i => i.qty > 0),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const loadCart = () => {
  try {
    const data = localStorage.getItem('shopwave_cart');
    return data ? JSON.parse(data) : { items: [] };
  } catch {
    return { items: [] };
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem('shopwave_cart', JSON.stringify(state));
  }, [state]);

  const addItem    = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id)      => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increment  = (id)      => dispatch({ type: 'INCREMENT', payload: id });
  const decrement  = (id)      => dispatch({ type: 'DECREMENT', payload: id });
  const clearCart  = ()        => dispatch({ type: 'CLEAR' });

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const isInCart   = (id) => state.items.some(i => i.id === id);

  return (
    <CartContext.Provider value={{
      items: state.items, addItem, removeItem,
      increment, decrement, clearCart,
      totalItems, totalPrice, isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
