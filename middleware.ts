import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME } from "@/constants";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
interface cookieT {
  name:string,
  value:string
}
export async function middleware(request: NextRequest) {
  let cookie:any = request.cookies.get(COOKIE_NAME)
  const data = await (await fetch(NEXT_PUBLIC_API_URL+`/api/auth/checkRole?token=${cookie.value}`)).json()

  if (data.role!=="admin") {
    return NextResponse.rewrite(new URL('/', request.url))
  }
 
  if (data.role==="admin") {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }

}



export const config = {
  matcher: ["/dashboard/:path*"],
};
