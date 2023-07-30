import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiTrash } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import getStripe from "@/lib/getStripe";
import { NextApiRequest } from "next";

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

const Cart = () => {
  const HandleCheckout = async () => {
    const stripe = await getStripe();

    const response: Response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) return;

    const data = await response.json();

    toast.loading("Redirecting to Stripe...");
    if (data.status === 401) {
      toast.dismiss();
      toast.error("Something went wrong, please try again later");
      return;
    } else {
      await stripe.redirectToCheckout({
        sessionId: data.id,
      });
    }
  };

  const cartRef = useRef(null);
  const {
    cartItems,
    cartTotal,
    totalQuantity,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  return (
    <div className="" ref={cartRef}>
      <div
        id="cart-overlay"
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50"
        onClick={() => setShowCart(false)}
      ></div>
      <div
        id="cart-container"
        className="fixed top-0 right-0 w-[500px] h-screen bg-white z-50 overflow-y-scroll"
      >
        <div
          id="cart-header"
          className="flex flex-row p-6 pr-12 pb-3 items-center sticky top-0 bg-white z-50"
        >
          <button
            type="button"
            className=" bg-slate-600 rounded-[50%] w-12 h-12 hover:scale-110 hover:opacity-80 transition duration-300"
            id="cart"
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft className="text-center text-4xl text-white ml-1" />
          </button>
          <span className="text-2xl font-bold pl-5">Your Cart</span>
          <span className="text-lg font-light italic text-red-500 pl-2">
            ({totalQuantity} items)
          </span>
        </div>
        <div id="cart-items" className="mt-8 ">
          {cartItems.length < 1 && (
            <div className="flex flex-col items-center justify-center h-[500px]">
              <AiOutlineShopping size={100} className="text-cyan-700" />
              <p className="text-2xl font-bold text-gray-400">
                Your cart is empty
              </p>
              <Link href="/">
                <button
                  type="button"
                  className="text-2xl font-bold text-cyan-700 hover:underline"
                  onClick={() => setShowCart(false)}
                >
                  Go back to shopping
                </button>
              </Link>
            </div>
          )}
          <div id="products-container" className="">
            {cartItems.length >= 1 &&
              cartItems.map((item: CartItemsInterface) => {
                return (
                  <div
                    className="flex flex-row border-b border-gray-200 ml-4 my-3 relative"
                    key={item._id}
                  >
                    <div className="w-[150px] h-[150px]">
                      <img
                        className="w-auto h-[150px] min-w-[150px] aspect-square object-contain"
                        src={item.image_url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col ml-4">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold text-cyan-700">
                          {item.name}
                        </p>
                        <p className="text-lg font-light italic text-red-500">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-2xl font-bold text-cyan-700">
                          £{item.price}
                        </p>
                        <div className="flex flex-row">
                          <p
                            className="flex flex-row text-sm py-2"
                            id="quantity-desc"
                          >
                            <span
                              className="py-3 px-3 outline outline-1 border cursor-pointer"
                              onClick={() => {
                                toggleCartItemQuantity(item._id, "dec");
                              }}
                            >
                              <AiOutlineMinus />
                            </span>
                            <span
                              className="py-2 px-3 outline outline-1 border"
                              onClick={() => {}}
                            >
                              {item.quantity}
                            </span>
                            <span
                              className="py-3 px-3 outline outline-1 border cursor-pointer"
                              onClick={() => {
                                toggleCartItemQuantity(item._id, "inc");
                              }}
                            >
                              <AiOutlinePlus />
                            </span>
                          </p>
                          <div className="pt-2 absolute bottom-2 right-0">
                            <button
                              type="button"
                              className="text-4xl font-bold text-cyan-700 hover:underline"
                              onClick={() => {
                                onRemove(item._id);
                              }}
                            >
                              <TiTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          id="cart-footer"
          className="flex flex-col items-center sticky bottom-0 py-4 bg-white z-50"
        >
          <div className="flex flex-row justify-between w-[90%]">
            <p className="text-2xl font-bold text-cyan-700">Subtotal:</p>
            <p className="text-2xl font-bold text-cyan-700">
              £{cartTotal.toFixed(2)}
            </p>
          </div>
          <div id="buy-button">
            <button
              type="button"
              className="text-2xl font-bold text-white bg-cyan-700 hover:underline hover:scale-110 transition duration-300 ease-in-out w-full py-4 px-3 rounded my-3"
              onClick={() => {
                HandleCheckout();
              }}
            >
              Pay With Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
