import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();


  try {
    cookieStore.delete(COOKIE_NAME);


    const response = {
        user: "user logout" ,
      };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  }

     catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}