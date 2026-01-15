import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    // 1️⃣ Get token from cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // 3️⃣ Get user from DB
    const client = await clientPromise;
    const db = client.db("quizard");

    const userId = new ObjectId(decoded.userId);
    const user = await db.collection("users").findOne({ _id: userId });
    const quizdata=await db.collection("results").find({userId: userId})
   .toArray();
    
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 4️⃣ Return safe data
    return NextResponse.json({
      name: user.username,
      email: user.email,
      quizdata
    });

  } catch (error) {
    return NextResponse.json(


      { error: "Invalid or expired session" },
      { status: 401 }
    );
  }
}
