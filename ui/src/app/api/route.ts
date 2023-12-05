/** @format */
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const uri = process.env.MONGO_URI as string;
console.log(uri);
const client = new MongoClient(uri);

export async function GET() {
  // Store some basic usage stats with a unique identifier
  const headerList = headers();
  const device = headerList.get("User-Agent");

  await client.connect();
  const database = client.db("quransearchvisit").collection("quransearchvisit");

  // insert the device type
  await database.insertOne({
    device: device,
    time: new Date().toISOString(),
  });

  return NextResponse.json({ status: "ok" });
}
