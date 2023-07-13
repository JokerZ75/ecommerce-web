import React from "react";
import Link from "next/link";
import product from "../pages/product";
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

const Product = (product: ProductInterface) => {
  return (
    <div className="m-1 mt-0 p-2 w-[250px] h-[350px] hover:scale-105 group transition duration-300 ease-in-out ">
      <Link href={`/product/${product._id}`}>
        <div>
          <img className="rounded-md object-cover w-[250px] h-[250px] group-hover:opacity-75 transition duration-300 ease-in-out"
            src={product.image_url}
            alt={`An image of ${product.name}`}
          />
          <div className="pl-1
          ">
          <p className="text-2xl font-bold ">{product.name}</p>
          <p className="text-xl font-light ">£{product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
