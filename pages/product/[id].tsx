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

interface ProductDetails {
  product: ProductInterface;
}

const ProductDetails: FC<ProductDetails> = ({ product }) => {
  return (
    <>
      <div className="mx-32 flex flex-row" id="product-detail-container">
        <div id="product-image">
            <img
              className="w-auto h-[600px] min-w-[200px] aspect-square object-contain"
              src={product.image_url}
              alt=""
            />
        </div>
        <div className=" w-[800px] mx-7" id="product-details">
          <h1 className="text-5xl font-bold text-cyan-700">{product.name}</h1>
          <div id="product-reviews" className="mt-3 grid grid-cols-2 grid-rows-1 w-[45%]">
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
            <h4 className="text-cyan-700 text-2xl font-bold">Details:</h4>
            <p className="w-[100%] pt-1">
              {product.tags.map((tag) => tag + ", ")}
              {product.format}, {product.category}. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequuntur itaque neque, molestias
              doloremque ipsum pariatur minima? Cumque reiciendis molestiae esse
              ipsam, impedit aperiam deleniti hic expedita quia non, ea
              repellat.
            </p>
            <p className="pt-4 text-4xl text-red-600 font-bold">£{product.price}</p>
          </div>
          <div id="product-quantity">
            <h3 className="text-2xl text-cyan-700 font-bold">Quantity:</h3>
            <p className="flex flex-row text-2xl py-2" id="quantity-desc">
              <span className="py-4 px-8 outline outline-1 border cursor-pointer" id="minus" onClick={() => {}}>
                <AiOutlineMinus />
              </span>
              <span className="py-4 px-6 outline outline-1 border" id="num" onClick={() => {}}>
                0
              </span>
              <span className="py-4 px-8 outline outline-1 border cursor-pointer" id="plus" onClick={() => {}}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="mt-8 flex flex-col w-[45%] "id="product-buttons">
            <button
              className="outline outline-1 text-cyan-700 font-bold mb-4 px-10 py-2"
              onClick={() => {}}
            >
              Add to Cart
            </button>
            <button
              className="bg-cyan-700 text-white font-bold my-4 px-10 py-2"
              onClick={() => {}}
            >
              Buy Now
            </button>
          </div>
        </div>
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

    const productProcessed = JSON.parse(JSON.stringify(product[0]));

    return {
      props: {
        product: productProcessed,
      },
    };
  } catch (err: any) {
    return {
      props: { err: err.message },
    };
  }
};

export default ProductDetails;
