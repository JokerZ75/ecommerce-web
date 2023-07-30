import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { parse } from "path";

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

interface CartItemsInterface extends ProductInterface {
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const cartItems = req.body;
      const db = await client.db("store_items");
      let validate = () => {
        let good = true;
        cartItems.forEach(async (item: CartItemsInterface) => {
          const product = await db
            .collection("catologue")
            .findOne({ _id: new ObjectId(item._id) });
          let parsed: ProductInterface = JSON.parse(JSON.stringify(product));
          if (parsed.price == item.price) {
            good = false;
          }
        });
        return good;
      };
      if (validate()) {
        const params = {
          submit_type: "pay",
          mode: "payment",
          payment_method_types: ["card"],
          billing_address_collection: "auto",
          shipping_options: [
            { shipping_rate: "shr_1NZbqeGkTI5stg7lQ7iyzRz8" },
            { shipping_rate: "shr_1NZbrNGkTI5stg7lWUjGOs37" },
          ],
          line_items: req.body.map((product: CartItemsInterface) => {
            return {
              price_data: {
                currency: "gbp",
                product_data: {
                  name: product.name,
                  images: [product.image_url],
                },
                unit_amount: Math.round(product.price * 100),
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: product.quantity,
            };
          }),
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        };
        // Create Checkout Sessions from body params.
        // @ts-ignore
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
      } else {
        res.status(400).json({ message: "Error try again later", status: 401 });
      }
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
