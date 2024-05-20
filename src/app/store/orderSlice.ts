import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderState {
  item: OrderItem | null;
}

const initialState: OrderState = {
  item: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<OrderItem>) => {
      state.item = action.payload;
    },
  },
});

export const { setItem } = orderSlice.actions;
export default orderSlice.reducer;
