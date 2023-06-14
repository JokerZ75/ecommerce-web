import { get } from "https";
import clientPromise from "../lib/mongodb";
import { useState, useEffect } from 'react';
import axios from "axios";
import { randomInt } from "crypto";




export default function product({ products }:any) {
  const [productImg, setImage] = useState("");

  useEffect(() => {
    const name = products[0].name;
    axios.get(`https://api.pexels.com/v1/search?query=${name}&per_page=1`, {
      headers: {
        "Authorization": `${process.env.API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      setImage(response.data.photos[0].src.medium);
    });
  }, []);

  return (
    <div className="">
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {products.map((product:any) => (
          <li key={product.name}>
            <h1>{product.name}</h1>
            <img src={`${productImg}`} alt="image" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
    try {
      const client = await clientPromise;
      const db = client.db("grocery");
  
      const products = await db
        .collection("items")
        .find({})
        .limit(-1)
        .skip(randomInt(0, 10000))
        .toArray();
      return {
        props: { products: JSON.parse(JSON.stringify(products)) },
      };
    } catch (e) {
      console.error(e);
    }
  }