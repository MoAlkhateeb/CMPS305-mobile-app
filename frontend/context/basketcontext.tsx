import { BasketItem } from "@/components/basketItem";
import React, { createContext, useState, useContext } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface BasketItemInterface {
  id: number;
  name: string;
  description: string;
  price: Float;
  amount: number;
}
interface Item {
  id: number;
  name: string;
  description: string;
  price: Float;
}
interface BasketContextType {
  basket: BasketItemInterface[];
  addToBasket: (item: Item) => void;
  removeFromBasket: (name: string) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<BasketItemInterface[]>([]);

  const addToBasket = (item: Item) => {
    let basketItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      amount: 1,
    };
    let existingItem = basket.find((basketItem) => basketItem.id == item.id);
    if (existingItem == null) setBasket((prev) => [...prev, basketItem]);
    else existingItem.amount++;
  };
  const removeFromBasket = (name: string) => {
    let item = basket.find((item) => item.name == name);
    if (item == null) return;
    else {
      if (item.amount == 1)
        setBasket((prev) => prev.filter((item) => item.name !== name));
      else item.amount--;
    }
  };
  const clearBasket = () => setBasket([]);

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, clearBasket }}
    >
      {children}a
    </BasketContext.Provider>
  );
};

export const useBasket = (): BasketContextType => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
