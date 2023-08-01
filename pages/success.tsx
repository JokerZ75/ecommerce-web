import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "@/context/StateContext";
import utils from "@/lib/utils";

const Success = () => {
  const { setCartItems, setCartTotal, setTotalQuantity } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setCartTotal(0);
    setTotalQuantity(0);
    utils.celebrate();
  }, []);

  return (
    <div id="success-wrapper" className="bg-slate-300 flex items-center justify-center mx-[25%] p-8 rounded-lg" >
        <div className="flex flex-col items-center justify-center p-5 pb-20">
            <BsBagCheckFill className="text-9xl text-green-600 mt-8" />
            <h1 className="text-4xl font-bold text-center">Thank you for your order!</h1>
            <p className="text-lg font-light text-center">Check your email inbox for your receipt</p>
            <p id="description" className="font-light text-center mt-16">
                If you have any questions, please email <a className="text-red-500 italic hover:underline" href="mailto:orders@orders.com">orders@orders.com</a>
            </p>
            <Link href="/">
                <button type="button" className="text-2xl font-bold text-cyan-700 hover:underline">
                    Continue Shopping
                </button>
            </Link>

        </div>
    </div>
  );
};

export default Success;
