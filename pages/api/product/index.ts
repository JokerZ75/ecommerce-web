import clientPromise from "../../../lib/mongodb";

export default async function handler(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = await client.db("grocery");
    const movies = await db
      .collection("items")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();
    res(movies);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
