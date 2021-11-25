import type { NextApiRequest, NextApiResponse } from "next";
import { Area } from "../../../model/area.model";
import { connectDb } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collectionName = "regions";

  try {
    const { method } = req;
    const body: Area = req.body;
    const { db } = await connectDb();
    const newTodo = new Area(
      body.id,
      body.num,
      body.areaRoman,
      body.areaName,
      body.lat,
      body.lng,
      body.color
    );

    switch (method) {
      case "GET":
        const data = await db.collection(collectionName).find().toArray();
        res.status(200).json(data);
        break;
      case "POST":
        db.collection(collectionName).insertOne(newTodo);
        res.status(201).json({ message: `Added data`, addedID: req.body.id });
        break;
      case "PATCH":
        db.collection(collectionName).updateOne(
          { num: req.body.containerNum },
          { $set: { num: req.body.prevContainerNum } }
        );
        db.collection(collectionName).updateOne(
          { num: req.body.prevContainerNum },
          { $set: { num: req.body.containerNum } }
        );
        res.status(201).json({ message: `Changed List`, addedID: req.body.id });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err });
  }
}
