import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
export async function POST(request) {
  try {

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = new ObjectId(decoded.userId);

    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("quizard");
    
await db.collection("results").insertOne({
      ...body,
      userId: userId, })

  console.log(userId)
  
    return NextResponse.json(
      { message: "Data inserted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
