import React from "react";
import Link from "next/link";
import { Interface } from "readline";
import product from "../pages/product";
import { useState, useMemo } from "react";
import axios from "axios";
import Product from "./Product";

// Typescript product interface
interface Product {
  brand: string;
  format: string;
  tags: string[];
  name: string;
  image_url: string;
  category: string;
  price: number;
  id: number;
}
const HeroBanner = (product: Product) => {
  return (
    <div className="w-screen bg-slate-300 p-10 pb-5 h-1/2 max-h-1/2 relative flex  ">
      <div className="flex flex-col ">
        <p className="text-2xl">{product.brand}</p>
        <h3 className="text-5xl font-bold">{product.name}</h3>
        <div>
          <Link href="/movies">
            <button
              className="bg-red-600 py-6 px-14 rounded-xl text-white text-3xl font-bold mt-10"
              type="button"
            >
              £{product.price}
            </button>
          </Link>
        </div>
        <div className="mt-auto flex flex-col">
          <h4 className="text-lg font-bold text-cyan-700">Description</h4>
          <p className="font-light">
            {product.tags.map((tag) => tag + ", ")}
            {product.format}, {product.category}
          </p>
        </div>
      </div>
      <div className="flex-grow">
        <img
          src={product.image_url}
          alt="HeroBanner image"
          className="h-[100%] w-[90%] object-cover rounded-xl float-right "
        />
      </div>
    </div>
  );
};

export default HeroBanner;
