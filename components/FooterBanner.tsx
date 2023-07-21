

import React, { FunctionComponent } from "react";
import Link from "next/link";
import product from "@/pages/product";
interface ProductInterface {
  brand: string;
  format: string;
  tags: string[];
  name: string;
  image_url: string;
  category: string;
  price: number;
  price_special: number;
  _id: number;
}

const FooterBanner = (
  saleProduct : ProductInterface
) => {
  return (
    <>
      <div>
        <div className="bg-stone-300 rounded-xl h-[100%] max-h-[50vh] relative flex shadow-xl shadow-black  ">
          <div className="flex flex-col p-10 pb-5 pr-8 ">
            <div className="">
              <p className="text-6xl text-red-600 font-bold">ON SALE NOW</p>
              <p className="text-2xl">{saleProduct.brand}</p>
              <h3 className="text-5xl font-bold">{saleProduct.name}</h3>
            </div>
            <div>
              <p className="text-red-600 font-bold text-3xl">Reduced from £{saleProduct.price}</p>
              {}
              <p className="text-red-700 font-bold text-3xl">That's {Math.ceil((Math.floor((1 - (saleProduct.price_special / saleProduct.price)) * 100) / 10) * 10)}% Off</p>
              <Link href={`/product/${saleProduct._id}`}>
                <button
                  className="bg-red-600 py-6 px-14 rounded-xl text-white text-3xl font-bold mt-10 shadow-md shadow-black hover:scale-110 hover:shadow-xl hover:shadow-black transition duration-300  "
                  type="button"
                >
                  £{saleProduct.price_special}
                </button>
              </Link>
            </div>
            <div className="mt-auto flex flex-col">
              <h4 className="text-lg font-bold text-cyan-700">Description</h4>
              <p className="font-light">
                {" "}
                {saleProduct.tags.map((tag) => tag + ", ")}
                {saleProduct.format}, {saleProduct.category}
              </p>
            </div>
          </div>
          <div className="flex-grow ml-8 ">
            <img
              src={saleProduct.image_url}
              alt="HeroBanner image"
              className="h-[100%] w-[100%] rounded-r-xl object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBanner;
