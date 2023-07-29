import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Context {
  showCart: boolean;
  cartItems: any;
  cartTotal: any;
  totalQuantity: any;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: ({ product, quantity }: OnAddProduct) => void;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCartItemQuantity: (id: number, value: "inc" | "dec") => void;
  onRemove: (id: number) => void;
}

interface ProductInterface {
  brand: string;
  format: string;
  tags: string[];
  name: string;
  image_url: string;
  category: string;
  price: number;
  _id: number;
}

interface CartItemsInterface extends ProductInterface {
  quantity: number;
}

interface OnAddProduct {
  product: CartItemsInterface;
  quantity: number;
}

const Context = createContext<Context>(undefined!);

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemsInterface[]);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: CartItemsInterface | undefined;
  let index;

  const onAdd = ({ product, quantity }: OnAddProduct) => {
    const checkProductInCart = cartItems.find(
      (item: ProductInterface) => item._id === product._id
    );
    setCartTotal((prevCartTotal) => prevCartTotal + product.price * quantity);
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(
        (cartProdoct: CartItemsInterface) => {
          if (cartProdoct._id === product._id) {
            return {
              ...cartProdoct,
              quantity: cartProdoct.quantity + quantity,
            };
          }
          return cartProdoct;
        }
      );
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    setQty(1);
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const toggleCartItemQuantity = (id: number, value: "inc" | "dec") => {
    foundProduct = cartItems.find(
      (item: CartItemsInterface) => item._id === id
    );
    index = cartItems.findIndex((item: CartItemsInterface) => item._id === id);
    let newCartItems = cartItems.filter((item) => item._id !== id);
    if (foundProduct) {
      if (value === "inc") {
        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        });
        setCartItems([...newCartItems]);
        setCartTotal((prevCartTotal) => {
          if (foundProduct) return prevCartTotal + foundProduct.price;
          else return prevCartTotal;
        });
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
      } else if (value === "dec") {
        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        if (foundProduct.quantity > 1) {
          setCartItems([...newCartItems]);
          setCartTotal((prevCartTotal) => {
            if (foundProduct) return prevCartTotal - foundProduct.price;
            else return prevCartTotal;
          });
          setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
        } else if (foundProduct.quantity == 1) {
          setCartItems([
            ...cartItems.slice(0, index),
            ...cartItems.slice(index + 1),
          ]);
          setCartTotal((prevCartTotal) => {
            if (foundProduct) return prevCartTotal - foundProduct.price;
            else return prevCartTotal;
          });
          setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
          toast.error(`${foundProduct.name} removed from cart`);
        }
      }
    }
  };

  const onRemove = (id: number) => {
    foundProduct = cartItems.find(
      (item: CartItemsInterface) => item._id === id
    );
    index = cartItems.findIndex((item: CartItemsInterface) => item._id === id);
    if (foundProduct) {
      setCartItems([
        ...cartItems.slice(0, index),
        ...cartItems.slice(index + 1),
      ]);
      setCartTotal((prevCartTotal) => {
        if (foundProduct)
          return prevCartTotal - foundProduct.price * foundProduct.quantity;
        else return prevCartTotal;
      });
      setTotalQuantity((prevTotalQuantity) => {
        if (foundProduct) return prevTotalQuantity - foundProduct.quantity;
        return prevTotalQuantity;
      });
      toast.error(`${foundProduct.name} removed from cart`);
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        cartTotal,
        totalQuantity,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
