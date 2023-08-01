import React from "react";
import { FooterBanner, HeroBanner, ProductCarousel } from "../components";
import clientPromise from "../lib/mongodb";
import { randomInt } from "crypto";
import { FunctionComponent } from "react";

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

interface HomeProps {
  bestSeller: ProductInterface;
  saleProduct: ProductInterface;
  products: ProductInterface[];
}

const Home: FunctionComponent<HomeProps> = ({
  bestSeller,
  products,
  saleProduct,
}) => {
  return (
    <>
      <HeroBanner {...bestSeller} />
      <div className="text-4xl text-cyan-700 font-extrabold m-12 mb-4 mt-8 grid justify-center">
        <h2 className="text-center">Best Selling Products</h2>
        <p className="text-cyan-600 font-normal opacity-75 text-lg justify-self-center">
          All the of the best
        </p>
      </div>
      <ProductCarousel items={products} />
      <FooterBanner {...saleProduct} />
    </>
  );
};

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("store_items");

    const bestSeller = await db
      .collection("catologue")
      .find({ price: { $gt: 100 } })
      .limit(1)
      .skip(randomInt(0, 11))
      .toArray();

    const bestSellerProduct = JSON.parse(JSON.stringify(bestSeller[0]));

    const saleProduct = await db
      .collection("catologue")
      .find({ sale_item: "true" })
      .limit(1)
      .toArray();

    const saleProductProcessed = JSON.parse(JSON.stringify(saleProduct[0]));

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
        saleProduct: saleProductProcessed,
      },
    };
  } catch (err: any) {
    return {
      props: {
        err: err.message,
        bestSeller: {
          brand: "Error",
          format: "Error",
          tags: ["Error"],
          name: "Error",
          image_url: "Error",
          category: "Error",
          price: 0,
        },
        saleProduct: {
          brand: "Error",
          format: "Error",
          tags: ["Error"],
          name: "Error",
          image_url: "Error",
          category: "Error",
          price: 0,
        },
        products: [
          {
            _id : 0,
            brand: "Error",
            format: "Error",
            tags: ["Error"],
            name: "Error",
            image_url: "Error",
            category: "Error",
            price: 0,
          }
        ]
      },
  
    };
  }
}

export default Home;
