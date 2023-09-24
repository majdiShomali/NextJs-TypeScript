import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { COOKIE_NAME } from "@/constants";
type userType ={
    _id:string,
    userName:string,
    userEmail:string,
    userPassword: string,
    role:string ,
 }
const MAX_AGE = 60 * 60 * 24 * 30; // days;


const GenerateToken = (userCreated:userType)=>{
    const secret = process.env.JWT_SECRET || "";
    const token = sign(
      {
        userId: userCreated._id,
        userEmail: userCreated.userEmail,
        role: userCreated.role,
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
      role: userCreated.role,
      userId: userCreated._id,
    };
      const data ={
        response,seralized
      }
    return data

}
export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { userName, userEmail, userPassword } = await request.json();
    console.log(userName, userEmail, userPassword);
    const user = await User.findOne({ userEmail: userEmail });
    console.log(user);

    if (user) {
  const data=  GenerateToken(user)
  return new Response(JSON.stringify(data.response), {
    status: 200,
    headers: { "Set-Cookie":data.seralized },
  });
    }

    const hashPassword = await bcrypt.hash(userPassword, 5);

    const userCreated = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
      role: "user",
    });

    const data=  GenerateToken(userCreated)
    return new Response(JSON.stringify(data.response), {
      status: 200,
      headers: { "Set-Cookie":data.seralized },
    });

    // return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
