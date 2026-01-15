import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json()
    console.log(body)

 const  category= body.category
    const  difficulty= body.difficulty
    const  count= body.count
    return NextResponse.json({
   category,difficulty,count
    })
  } 
    catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired session" },
      { status: 401 }
    );
  }
}
