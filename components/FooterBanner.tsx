

import React, { FunctionComponent } from "react";
import Link from "next/link";
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
  const percentage = Math.ceil((Math.floor((1 - (saleProduct.price_special / saleProduct.price)) * 100) / 10) * 10);
  return (
    <>
      <div>
        <div className="bg-stone-300 rounded-xl h-[100%] max-h-[60vh] relative flex flex-col md:flex-row shadow-xl shadow-black overflow-hidden  ">
          <div className="flex flex-col pt-4 md:pt-10 p-10 pb-5 pr-8 ">
            <div className="">
              <p className="text-4xl md:text-5xl text-red-600 font-bold">ON SALE NOW</p>
              <p className="hidden md:block md:text-2xl">{saleProduct.brand}</p>
              <h3 className="text-3xl md:text-5xl font-bold">{saleProduct.name}</h3>
            </div>
            <div>
              <p className="text-red-600 font-bold text-xl md:text-3xl">Reduced from £{saleProduct.price}</p>
              <p className="text-red-700 font-bold text-xl md:text-3xl">Thats {percentage}% Off</p>
              <Link href={"/product/" + saleProduct._id}>
                <button
                  className="bg-red-600 py-6 px-14 rounded-xl text-white text-3xl font-bold mt-5 shadow-md shadow-black hover:scale-110 hover:shadow-xl hover:shadow-black transition duration-300  "
                  type="button"
                >
                  £{saleProduct.price_special}
                </button>
              </Link>
            </div>
            <div className="mt-auto md:flex flex-col pb-5 hidden">
              <h4 className="text-lg font-bold text-cyan-700">Description</h4>
              <p className="font-light">
                {saleProduct.tags.map((tag) => tag + ", ")}
                {saleProduct.format}, {saleProduct.category}
              </p>
            </div>
          </div>
          <div className="flex-grow flex-shrink md:ml-8 ">
            <img
              src={saleProduct.image_url}
              alt="HeroBanner image"
              className="h-60 md:h-[100%] w-[100%] rounded-tr-lg rounded-tl-lg md:rounded-tl-none md:rounded-r-xl object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBanner;
