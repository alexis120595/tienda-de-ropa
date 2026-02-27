'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedItems = JSON.parse(savedCart);
      // Migración rápida para items viejos que usaban 'title' en vez de 'name'
      const migratedItems = parsedItems.map((item: any) => ({
        ...item,
        name: item.name || item.title || 'Producto sin nombre'
      }));
      setItems(migratedItems);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.variantId === newItem.variantId);
      if (existingItem) {
        return currentItems.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...currentItems, newItem];
    });
    setIsCartOpen(true);
  };

  const removeItem = (variantId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
