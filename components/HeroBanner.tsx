import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Product from "./Product";
import { useEffect } from 'react';

// Typescript product interface
interface Product {
  brand: string;
  format: string;
  tags: string[];
  name: string;
  image_url: string;
  category: string;
  price: number;
  _id: number;
}
const HeroBanner = (product: Product) => {

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current?.innerText == "Error"){
      window.location.reload();
    }
  },[product]);

  return (
    <div className="bg-slate-300 rounded-xl h-1/2 max-h-[65vh] shadow-lg shadow-black relative flex  ">
      <div className="flex flex-col p-10 pb-5 pr-8 ">
        <p className="text-2xl">{product?.brand}</p>
        <h3 ref={ref} className="text-5xl font-bold">{product.name}</h3>
        <div>
          <Link href={`/product/${product?._id}`}>
            <button
              className="bg-red-600 py-6 px-14 rounded-xl text-white text-3xl font-bold mt-10 shadow-md shadow-black hover:scale-110 hover:shadow-xl hover:shadow-black transition duration-300  "
              type="button"
            >
              £{product.price}
            </button>
          </Link>
        </div>
        <div className="mt-auto flex flex-col">
          <h4 className="text-lg font-bold text-cyan-700">Description</h4>
          <p className="font-light">
            {product?.tags.map((tag) => tag + ", ")}
            {product?.format}, {product?.category}
          </p>
        </div>
      </div>
      <div className="flex-grow ml-2 ">
        <img
          src={product.image_url}
          alt="HeroBanner image"
          className="h-[100%] w-[100%] rounded-r-xl object-cover"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
