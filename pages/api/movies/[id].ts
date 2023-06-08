import clientPromise from "../../../lib/mongodb";


export default async (req :any, res :any) => {

    try {
        const client = await clientPromise;
        const db = await client.db("sample_mflix");
        const ObjectId = require('mongodb').ObjectId;
        const movieID = req.query.id;
        const movie = await db.collection("movies").findOne({ _id: ObjectId(movieID) });
        res.json(movie);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: e});
    }
};