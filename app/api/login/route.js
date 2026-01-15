import clientPromise from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(request) {
  const body = await request.json();
  const jwt = require('jsonwebtoken');
  try {
    const client = await clientPromise;
    const db = client.db("quizard");

    
    const users = await db
      .collection("users")
      .find({}, { projection: { email: 1, _id: 1, password: 1,username:1 } })
      .toArray();




    let count;
    let usernumber;
    for (let i = 0; i < users.length; i++) {
      if (body.email === users[i].email) {
        count = 1    
        usernumber = i;
        break;
      }
      count = 0
    }
    let isMatch = false;
    if (count == 1) {



      isMatch = await bcrypt.compare(
        body.password,
        users[usernumber].password
      )

    }
    if (isMatch == true) {
  
 
      const token = jwt.sign(
        {
          userId: users[usernumber]._id,
          email: users[usernumber].email,
          username: users[usernumber].username
        },
        process.env.JWT_SECRET,

        { expiresIn: "3d" })
     const session=request.cookies.get("session")

      const response = NextResponse.json(

  { message: "User logged in" },
  { status: 200 }
);

      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 3
      });
      return response
    }
    else {

      return NextResponse.json(
        { error: "Invalid email or password" }, 
        { status: 401 }
      );
    }

    return new Response(JSON.stringify({ message: "User logged in!" }), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });

  }
}