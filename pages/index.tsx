import React from "react";
import { FooterBanner, HeroBanner } from "../components";
import clientPromise from "../lib/mongodb";
import { randomInt } from "crypto";
import product from "./product";
import { useMemo, useEffect } from "react";
import axios from "axios";

const Home = ({ bestSeller }: any) => {
  useEffect(() => {
    const name = bestSeller.name;
    const brand = bestSeller.brand;
    axios
      .get(
        `https://api.pexels.com/v1/search?query=${name}+by+${brand}}&per_page=1`,
        {
          headers: {
            Authorization: `6v5KRckua0zzQinmrYQewSGDwY5Hgag8AzN2d6NDm91pZxHSqL0pc8Xv`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        bestSeller.image_url = response.data.photos[0].src.large;
      });
  }, [bestSeller]);

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
          {["product 1", "product 2"].map((product) => product)}
        </div>
      </main>
      <FooterBanner />
    </>
  );
};

export async function getServerSideProps() {
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
    const brand = bestSellerProduct.brand;
    await axios
      .get(
        `https://api.pexels.com/v1/search?query=${name}+by+${brand}&per_page=1`,
        {
          headers: {
            Authorization: `6v5KRckua0zzQinmrYQewSGDwY5Hgag8AzN2d6NDm91pZxHSqL0pc8Xv`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        bestSellerProduct.image_url = response.data.photos[0].src.large;
      });
    return {
      props: { bestSeller: bestSellerProduct },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      }
    }
  }
}

export default Home;
