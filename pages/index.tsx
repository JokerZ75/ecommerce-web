import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import clientPromise from "../lib/mongodb";
import { randomInt } from "crypto";
import product from "./product";
import { useMemo, useEffect } from "react";
import axios from "axios";

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
  return (
    <>
      <main className="h-screen">
        <HeroBanner {...bestSeller} />
        <div className="text-4xl text-cyan-700 font-extrabold m-12 mt-8 grid justify-center">
          <h2 className="">Best Selling Products</h2>
          <p className="text-cyan-600 font-normal opacity-75 text-lg justify-self-center">
            All the of the best
          </p>
        </div>
        <div className="grid justify-center">
          {products.map((product: ProductInterface) => (
            <Product {...product} key={product._id} />
          ))}
        </div>
      </main>
      <FooterBanner />
    </>
  );
};

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("grocery");

    const bestSeller = await db
      .collection("items")
      .find({})
      .limit(1)
      .skip(randomInt(0, 10000))
      .toArray();

    const bestSellerProduct = JSON.parse(JSON.stringify(bestSeller[0]));
    const name = bestSellerProduct.name;
    await fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=1`, {
      headers: {
        Authorization: `6v5KRckua0zzQinmrYQewSGDwY5Hgag8AzN2d6NDm91pZxHSqL0pc8Xv`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        bestSellerProduct.image_url = data.photos[0].src.large2x;
      });
    });

    const products = await db.collection("items").find({}).limit(5).toArray();
    const productsProcessed = JSON.parse(JSON.stringify(products));
    // send fetch request to pexels api to get image url
    for (let i = 0; i < productsProcessed.length; i++) {
      const name = productsProcessed[i].name;
      await fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=1`, {
        headers: {
          Authorization: `6v5KRckua0zzQinmrYQewSGDwY5Hgag8AzN2d6NDm91pZxHSqL0pc8Xv`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          if (data.photos[0].src.large2x !== undefined) {
            productsProcessed[i].image_url = data.photos[0].src.large2x;
          } else {
            productsProcessed[i].image_url = "api placeholder";
          }
        });
      });
    }
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
