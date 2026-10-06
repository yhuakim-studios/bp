"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Cart = Record<string, number>; // productId -> qty

type CartCtx = {
  cart: Cart;
  count: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "bakay-basket";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});

  // Restore basket for returning visitors (per-browser convenience only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const value = useMemo<CartCtx>(() => {
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    return {
      cart,
      count,
      add: (id) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 })),
      remove: (id) =>
        setCart((c) => {
          const next = { ...c };
          if ((next[id] ?? 0) <= 1) delete next[id];
          else next[id] -= 1;
          return next;
        }),
      clear: () => setCart({}),
    };
  }, [cart]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
