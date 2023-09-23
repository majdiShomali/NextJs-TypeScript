import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || "";
  const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const role = decodedToken.role;
  return decodedToken;
};

export async function GET(request: Request, response: Response) {
  const queryParams = new URL(request.url).searchParams;
  const token = queryParams.get("token");

  try {
    if(token){
      const decodedToken = verifyToken(token)
      return NextResponse.json(decodedToken, { status: 200 });
    }
    
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
