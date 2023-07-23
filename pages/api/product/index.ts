import { randomInt } from "crypto";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = await client.db("grocery");
    const product = await db.collection("items").find({}).skip(randomInt(0,1000)).limit(1).toArray();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
