import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"; // If you're using ES modules

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";

  try {
    verify(value, secret);

    const decodedToken = jwt.verify(value, secret) as JwtPayload;
    const response = {
      user: decodedToken,
      // role:decodedToken.role
    };
      return new Response(JSON.stringify(response), { status: 200 });

    // if (decodedToken.role === "admin") {
    //   return new Response(JSON.stringify(response), { status: 200 });
    // } else {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong" },{ status: 400 });
  }
}
