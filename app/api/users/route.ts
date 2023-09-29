import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { jwtMiddleware } from "@/app/api/middlewares/jwtMiddleware";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { COOKIE_NAME } from "@/constants";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function DELETE(request: Request, response: Response) {
  const token: string | null =
    request.headers.get("authorization")?.replace("Bearer ", "") || null;
  try {
    if (token) {
      jwtMiddleware(token, "admin");
    } else {
      throw new Error("Unauthorized");
    }

    // const decodedToken = jwtMiddleware(request, response);
    const queryParams = new URL(request.url).searchParams;
    const userId = queryParams.get("userId");
    await connectMongoDB();
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { userName, userEmail, userPassword } = await request.json();
    const user = await User.findOne({ userEmail: userEmail });

    if (user) {
      return NextResponse.json(
        { message: "user aleredy exist" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(userPassword, 5);

    const userCreated = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
      role: "user",
    });

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

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": seralized },
    });

    // return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(request: Request, response: Response) {
  const queryParams = new URL(request.url).searchParams;
  // const token = queryParams.get("token");
  // const token = request.headers.authorization?.replace('Bearer ', '');
  const token: string | null =
    request.headers.get("authorization")?.replace("Bearer ", "") || null;
  try {
    if (token) {
      jwtMiddleware(token, "admin");
    } else {
      throw new Error("Unauthorized");
    }
    await connectMongoDB();
    // const queryParams = new URL(request.url).searchParams;
    // const numParam = queryParams.get('num');
    // const typeParam = queryParams.get('type');

    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
