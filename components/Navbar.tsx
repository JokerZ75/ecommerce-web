import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity  } = useStateContext();

  return (
    <div className="w-screen flex flex-row p-6  pr-4 md:pr-12 pb-0">
      <p
        id="logo"
        className="font-light text-2xl bg-slate-600 text-white rounded-lg p-2 hover:scale-105 transition duration-300 hover:opacity-70 "
      >
        <Link href="/">DHughes Store</Link>
      </p>
      <button
        type="button"
        className="ml-auto  relative  bg-slate-600 rounded-[50%] w-12 h-12 hover:scale-110 hover:opacity-80 transition duration-300"
        id="cart"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping className="text-center text-4xl text-white ml-1" />
        <span
          className="absolute top-0 right-[-5px] text-lg text-white bg-red-600 w-7 h-7 rounded-[50%]"
          id="cartQty"
        >
          {totalQuantity}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
