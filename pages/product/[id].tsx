import React, { FC } from "react";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import ProductCarousel from "@/components/ProductCarousel";
import { useStateContext } from "@/context/StateContext";
import Scroller from "../../components/Scroller";
import { Product } from "@/components";

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

interface cartItemsInterface extends ProductInterface {
  quantity: number;
}
interface OnAddProduct {
  product: cartItemsInterface;
  quantity: number;
}

interface ProductDetails {
  product: cartItemsInterface;
  suggestedProducts: ProductInterface[];
}

const ProductDetails: FC<ProductDetails> = ({ product, suggestedProducts }) => {
  const { qty, incQty, decQty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd({ product, quantity: qty });
    setShowCart(true);
  };

  return (
    <>
      <div
        className="md:mx-32 flex flex-col items-center md:items md:flex-row"
        id="product-detail-wrapper"
      >
        <div id="product-image" className="">
          <img
            className="w-auto h-[250px] float-left md:h-[600px] min-w-[200px] aspect-square object-contain"
            src={product.image_url}
            alt=""
          />
        </div>
        <div
          className="w-[300px] md:w-[800px] ml-4 md:mx-7"
          id="product-details"
        >
          <h1 className="text-2xl md:text-5xl font-bold text-cyan-700">
            {product.name}
          </h1>
          <div
            id="product-reviews"
            className="mt-3 grid grid-cols-2 grid-rows-1 w-[45%]"
          >
            <div className="text-red-600 grid grid-cols-5 grid-rows-1">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="font-thin italic">(20)</p>
          </div>
          <div className="w-[100%] my-2" id="product-details-desc">
            <h4 className="text-cyan-700 text-lg  md:text-2xl font-bold">
              Details:
            </h4>
            <p className="w-[100%] pt-1">
              {product.tags.map((tag) => tag + ", ")}
              {product.format}, {product.category}. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequuntur itaque neque, molestias
              doloremque ipsum pariatur minima? Cumque reiciendis molestiae esse
              ipsam, impedit aperiam deleniti hic expedita quia non, ea
              repellat.
            </p>
            <p className="pt-2 md:pt-4 text-3xl md:text-4xl text-red-600 font-bold">
              £{product.price}
            </p>
          </div>
          <div id="product-quantity">
            <h3 className="text-2xl text-cyan-700 font-bold">Quantity:</h3>
            <p
              className="flex flex-row text-lg md:text-2xl py-2"
              id="quantity-desc"
            >
              <span
                className="py-3 md:py-4 px-6 md:px-8 outline outline-1 border cursor-pointer"
                id="minus"
                onClick={() => {
                  decQty();
                }}
              >
                <AiOutlineMinus />
              </span>
              <span
                className="py-2 md:py-4 px-4 md:px-6 outline outline-1 border"
                id="num"
              >
                {qty}
              </span>
              <span
                className="py-3 md:py-4 px-6 md:px-8 outline outline-1 border cursor-pointer"
                id="plus"
                onClick={() => {
                  incQty();
                }}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div
            className="mt-8 flex mx-auto md:mx-0 flex-col w-[100%] md:w-[45%] "
            id="product-buttons"
          >
            <button
              className="outline outline-1 text-cyan-700 font-bold mb-4 px-10 py-5 md:py-2"
              onClick={() => onAdd({ product, quantity: qty })}
            >
              Add to Cart
            </button>
            <button
              className="bg-cyan-700 text-white font-bold my-4 px-10 py-5 md:py-2"
              onClick={() => {
                handleBuyNow();
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div id="may-like-wrapper">
        <h2 className=" text-center text-4xl font-bold text-cyan-700 mb-4 md:mb-8">
          You may also like:
        </h2>
        <Scroller>
          {suggestedProducts.map((product) => (
            <li
              key={product._id}
              className="m-1 mt-0 p-2 w-[250px] h-[350px] hover:scale-105 group transition duration-300 ease-in-out "
            >
              <Product {...product} />
            </li>
          ))}
        </Scroller>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await clientPromise;
  const db = client.db("store_items");

  const products = await db.collection("catologue").find({}).toArray();

  const productsProcessed = JSON.parse(JSON.stringify(products));

  const paths = productsProcessed.map((product: ProductInterface) => ({
    params: { id: product._id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    let id = context.params?.id as string;
    const client = await clientPromise;
    const db = client.db("store_items");

    const product = await db
      .collection("catologue")
      .find({ _id: new ObjectId(id) })
      .limit(1)
      .toArray();

    const productProcessed: ProductInterface = JSON.parse(
      JSON.stringify(product[0])
    );

    const suggestedProducts = await db
      .collection("catologue")
      .find({ category: productProcessed.category })
      .limit(10)
      .toArray();

    const suggestedProductsProccessed = JSON.parse(
      JSON.stringify(suggestedProducts)
    );
    return {
      props: {
        product: productProcessed,
        suggestedProducts: suggestedProductsProccessed,
      },
    };
  } catch (err: any) {
    return {
      props: { err: err.message },
    };
  }
};

export default ProductDetails;
