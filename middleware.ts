import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME } from "@/constants";
import { CookieType } from '@/types/userData';
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(request: NextRequest) {
  let cookie:CookieType = request.cookies.get(COOKIE_NAME)
  if(cookie){
    
    const {role} = await (await fetch(NEXT_PUBLIC_API_URL+`/api/auth/checkRole?token=${cookie.value}`)).json()
    if (role!=="admin") {
      return NextResponse.rewrite(new URL('/', request.url))
    }

  }else{
    return NextResponse.rewrite(new URL('/', request.url))

  }


}



export const config = {
  matcher: ["/dashboard/:path*"],
};
