import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clear } from 'console';

interface CartItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  drink?: string; // Ajout de la propriété drink
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity = action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateDrink: (state, action: PayloadAction<{ id: string; drink: string }>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].drink = action.payload.drink;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addItem, removeItem, updateQuantity, updateDrink, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;