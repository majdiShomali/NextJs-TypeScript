
import jwt, { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";

export { jwtMiddleware };

function jwtMiddleware(token:string,role:string) {

    if (!token) {
        console.log("!token");
        throw new Error("Unauthorized");
      }
      try {
        const secret = process.env.JWT_SECRET || "";
        verify(token, secret);

        const decodedToken = jwt.verify(token, secret) as JwtPayload;
        if(decodedToken.role ===role){
          return decodedToken
        }{
          throw new Error("Unauthorized");
        }
      } catch (error) {
        throw new Error("Unauthorized");
      }
 
       

}