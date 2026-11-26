import { createContext, useContext, useMemo, useState } from "react";
import { cards, seedOrders } from "./data";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cardId, setCardId] = useState("hdfc");
  const [orders, setOrders] = useState(seedOrders);

  const card = cards.find((c) => c.id === cardId) || cards[0];

  const api = useMemo(
    () => ({
      card,
      cardId,
      setCardId,
      orders,
      prepareReturn(orderId, reason, note) {
        setOrders((current) =>
          current.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status: "return_requested",
                  reason,
                  note,
                  pickup: "Thursday, 9:00–12:00",
                }
              : order,
          ),
        );
      },
    }),
    [card, cardId, orders],
  );

  return <ShopContext.Provider value={api}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
