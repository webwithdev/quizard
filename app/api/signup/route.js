import clientPromise from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    if (!body.name || !body.email || !body.password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (body.password.length < 6) {
      return new Response(JSON.stringify({ error: "Password length is under 6" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("quizard");

    console.log(body.email)
    const users = await db
      .collection("users")
      .find({}, { projection: { email: 1, _id: 0 } })
      .toArray();

    let count=1
    for (let i = 0; i < users.length; i++) {
      if (body.email === users[i].email) {
        count = 0;
        break;
      }
      count = 1
    }
    if (count === 0) {
      console.log(count);
      return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    await db.collection("users").insertOne({
      username:body.name,
      email: body.email,
      password: hashedPassword
    })
  
    return new Response(JSON.stringify({ message: "Data inserted!" }), { status: 200, headers: { "Content-Type": "application/json" } });


  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });

  }
}