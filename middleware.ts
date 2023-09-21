import type { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/constants";
import { NextResponse } from "next/server";
import jwt,{ JwtPayload } from 'jsonwebtoken'; // If you're using ES modules
import { verify } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import axios, { AxiosError } from "axios";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(request: NextRequest) {
  // Access cookies directly from the request object
//   const someCookieValue = request.cookies;
//   const token = someCookieValue.get(COOKIE_NAME);




  // async function getUser() {
  //   try {
  //     const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/me`, {
  //       // cache:"force-cache",//SSG getStaticSideProps
  //       cache: "no-store", //SSR getServerSideProps
  //       // next: {
  //       //   revalidate: 20, //ISR===== ssr with sec
  //       // },
  //     });
  //     return res.json();
  
  //   } catch (e) {
  //     const error = e as AxiosError;
  
    
  //   }
  // }

//   const { user } = await getUser();
// console.log(await getUser());

  }



export const config = {
  matcher: ["/dashboard/:path*"],
};
