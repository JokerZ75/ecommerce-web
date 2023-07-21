import React, { FC } from "react";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { GetStaticProps, GetStaticPaths } from 'next';
import product from '../product';

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
    <div>
      <div id="productDetailContainer">
        <div>
          <div>
            <img src={product.image_url} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths:GetStaticPaths = async () => {
  const client = await clientPromise;
  const db = client.db("store_items");

  const products = await db
    .collection("catologue")
    .find({})
    .toArray();

  const productsProcessed = JSON.parse(JSON.stringify(products));

  const paths = productsProcessed.map((product:ProductInterface) => ({
    params: { id: product._id },
  }));

  return { paths, fallback: 'blocking' };
}



export const getStaticProps:GetStaticProps = async (context) => {
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
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      },
    };
  }
};

export default ProductDetails;
