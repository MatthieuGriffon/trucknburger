export interface OrderItem {
    id: string;
    order_id: string;
    menu_item_id: string;
    quantity: number;
    price: number;
    created_at: string;
    updated_at: string;
    name: string
  }
  
  export interface Order {
    id: string;
    user_id: string;
    status: string;
    total_price: number;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
    name: string;
  }