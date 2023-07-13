import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import clientPromise from "../lib/mongodb";
import { randomInt } from "crypto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";

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

const Home = ({ bestSeller, products }: any) => {
  const [scroll, setScroll] = useState("0");
  useEffect(() => {
    const updateScroll = async () => {
      const productContainer = await document.querySelector<HTMLElement>(
        ".min-w-fit"
      );
      if (productContainer) {
        productContainer.style.transform = `translateX(${scroll}px)`;
      }

    };
    updateScroll();
  }, [scroll]);

  return (
    <>
      <main className="h-screen overflow-x-hidden">
        <HeroBanner {...bestSeller} />
        <div className="text-4xl text-cyan-700 font-extrabold m-12 mb-4 mt-8 grid justify-center">
          <h2 className="">Best Selling Products</h2>
          <p className="text-cyan-600 font-normal opacity-75 text-lg justify-self-center">
            All the of the best
          </p>
        </div>
        <div>
          <div className="absolute h-[350px] left-0 z-10 hover:scale-110 hover:brightness-200 transition duration-200 ease-in-out ">
            <FontAwesomeIcon
              className="text-6xl text-cyan-700 font-extrabold m-12 mb-4 mt-[70%] grid justify-center"
              icon={faChevronCircleLeft}
              onClick={() => {
                setScroll((scroll) => (parseInt(scroll) + 250).toString());
              }}
            />
          </div>
          <div
            className="absolute h-[350px] right-0 z-10 hover:scale-110 hover:brightness-200 transition duration-200 ease-in-out"
            onClick={() => {
              setScroll((scroll) => (parseInt(scroll) - 250).toString());
            }}
          >
            <FontAwesomeIcon
              className="text-6xl text-cyan-700 font-extrabold m-12 mb-4 mt-[70%] grid justify-center"
              icon={faChevronCircleRight}
            />
          </div>
          <div className="flex flex-row min-w-fit overflow-hidden transition duration-500 ease-in-out">
            {products.map((product: ProductInterface) => (
              <Product {...product} key={product._id} />
            ))}
          </div>
        </div>
      </main>
      <FooterBanner />
    </>
  );
};

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("store_items");

    const bestSeller = await db
      .collection("catologue")
      .find({})
      .limit(1)
      .skip(randomInt(0, 20))
      .toArray();

    const bestSellerProduct = JSON.parse(JSON.stringify(bestSeller[0]));
    const products = await db
      .collection("catologue")
      .find({})
      .limit(15)
      .toArray();
    const productsProcessed = JSON.parse(JSON.stringify(products));

    return {
      props: {
        products: productsProcessed,
        bestSeller: bestSellerProduct,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      },
    };
  }
}

export default Home;
