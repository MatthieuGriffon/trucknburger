'use client';

import { createContext, useReducer, useContext, useEffect, ReactNode, useState } from 'react';

// Interface pour les articles du panier
interface CartItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

// Interface pour l'état du panier
interface CartState {
  items: CartItem[];
}

// Type pour les actions du panier
type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'SET_CART'; items: CartItem[] };

// État initial du panier
const initialState: CartState = {
  items: [],
};

// Réducteur pour gérer les actions du panier
function cartReducer(state: CartState, action: CartAction): CartState {
  console.log('Reducer received action:', action);
  switch (action.type) {
    case 'ADD_ITEM': {
      console.log('Current state before ADD_ITEM:', state.items);
      const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.item.quantity;
        console.log('Updated state after ADD_ITEM:', updatedItems);
        return { ...state, items: updatedItems };
      }
      const newState = { ...state, items: [...state.items, action.item] };
      console.log('New state after ADD_ITEM:', newState.items);
      return newState;
    }
    case 'REMOVE_ITEM': {
      console.log('REMOVE_ITEM action:', action);
      const newState = { ...state, items: state.items.filter(item => item.id !== action.id) };
      console.log('New state after REMOVE_ITEM:', newState.items);
      return newState;
    }
    case 'UPDATE_QUANTITY': {
      console.log('UPDATE_QUANTITY action:', action);
      const newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
      console.log('New state after UPDATE_QUANTITY:', newState.items);
      return newState;
    }
    case 'SET_CART': {
      console.log('SET_CART action:', action);
      return { ...state, items: action.items };
    }
    default:
      const _exhaustiveCheck: never = action;
      throw new Error(`Unknown action: ${(action as CartAction).type}`);
  }
}

// Création des contextes
const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

// Provider pour le contexte du panier
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Charger l'état du panier depuis localStorage côté client à l'initialisation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loading cart from localStorage:', parsedCart);
        dispatch({ type: 'SET_CART', items: parsedCart });
      }
      setIsInitialized(true);
    }
  }, []);

  // Sauvegarder l'état du panier dans localStorage à chaque mise à jour
  useEffect(() => {
    if (isInitialized) {
      console.log('Saving cart to localStorage:', state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, isInitialized]);

  console.log('CartProvider initialized with state:', state);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

// Hook pour utiliser le contexte du panier
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  console.log('useCart context:', context);
  return context;
}

// Hook pour utiliser le contexte de dispatch du panier
export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  console.log('useCartDispatch context:', context);
  return context;
}