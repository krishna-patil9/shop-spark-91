import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from './CartContext';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: string;
  deliveryDate?: string;
  address: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (address: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();
  const { items, clearCart, totalPrice } = useCart();

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (address: string) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to your cart before placing an order",
        variant: "destructive"
      });
      return;
    }

    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      items: [...items],
      total: totalPrice,
      status: 'pending',
      orderDate: new Date().toISOString(),
      address: address || 'No address provided'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    
    toast({
      title: "Order placed successfully!",
      description: `Order ${newOrder.id} has been placed`,
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}