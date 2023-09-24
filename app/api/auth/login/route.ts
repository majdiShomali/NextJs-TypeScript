import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcrypt'
import connectMongoDB from "@/libs/mongodb";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  const body = await request.json();

  const { userEmail, userPassword } = body;
try {
  await connectMongoDB();

  const user = await User.findOne({userEmail:userEmail});
  if(!user){
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  const validpassword = await bcrypt.compare(userPassword, user.userPassword);
  if (!validpassword) {
    return NextResponse.json({ message: "incorrect password" }, { status: 409 });
  }


  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      userId:user._id,
      userEmail,
      role:user.role,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
    role:user.role,
    userId:user._id
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
  
} catch (error) {
  console.log(error);

  return NextResponse.json({ message: error }, { status: 500 });
}


}