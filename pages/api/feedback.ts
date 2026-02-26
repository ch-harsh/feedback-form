import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

async function getClient() {
  if (client && (client as any).topology?.isConnected()) {
    return client;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in environment variables");
  }

  client = new MongoClient(uri);
  await client.connect();
  return client;
}

type FeedbackBody = {
  name?: string;
  email?: string;
  phone?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const body = req.body as FeedbackBody;
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const mongoClient = await getClient();
    const db = mongoClient.db("feedback_app");
    const collection = db.collection("feedbacks");

    const result = await collection.insertOne({
      name,
      email,
      phone,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Saved", id: result.insertedId });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

