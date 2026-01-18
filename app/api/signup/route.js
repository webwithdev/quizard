import clientPromise from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // ✅ 1. VALIDATION FIRST
    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ✅ 2. CONNECT DB
    const client = await clientPromise;
    const db = client.db("quizard");

    // ✅ 3. CHECK EXISTING USER (CORRECT WAY)
    const existingUser = await db
      .collection("users")
      .findOne({ email });

    if (existingUser) {
      return Response.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // ✅ 4. HASH PASSWORD AFTER VALIDATION
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 5. INSERT USER
    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    return Response.json(
      { message: "Signup successful" },
      { status: 200 }
    );

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
