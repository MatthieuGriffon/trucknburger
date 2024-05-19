"use client";
import { createContext, useReducer, useContext, ReactNode } from "react";

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

type OrderAction = { type: "SET_ITEM"; item: OrderItem };

const initialState: OrderState = {
  item: null,
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SET_ITEM":
      return { ...state, item: action.item };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const OrderContext = createContext<OrderState | undefined>(undefined);
const OrderDispatchContext = createContext<
  React.Dispatch<OrderAction> | undefined
>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={state}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}

export function useOrderDispatch() {
  const context = useContext(OrderDispatchContext);
  if (!context) {
    throw new Error("useOrderDispatch must be used within an OrderProvider");
  }
  return context;
}
