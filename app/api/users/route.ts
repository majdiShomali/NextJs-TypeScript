import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from 'bcrypt'

export async function DELETE(request:Request) {
    try {
        const queryParams = new URL(request.url).searchParams;
        const userId = queryParams.get('userId'); 
        await connectMongoDB();
        await User.findByIdAndDelete(userId);
        return NextResponse.json({ message: "User deleted" }, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }

  }


export async function POST(request: Request) {
    try {
        
        
        const { userName,userEmail,userPassword  } = await request.json();

        const user = await User.findOne({userEmail:userEmail});
        if(user){
          return NextResponse.json({ message: "user aleredy exist" }, { status: 409 });
        }
        
        const hashPassword = await bcrypt.hash(userPassword, 5);

        console.log(userName,userEmail,userPassword);
        await connectMongoDB();
        await User.create({ userName,userEmail,userPassword:hashPassword ,role:"user" });
        return NextResponse.json({ message: "User Created" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });

    }
  }

export async function GET(request: Request,response:Response) {
    console.log("+++++++++++++++++++++++++")
    try {
        console.log("+++++++++++try++++++++++++++")

        await connectMongoDB();
        console.log("+++++++++++mongo++++++++++++++")

        // const queryParams = new URL(request.url).searchParams;
        // const numParam = queryParams.get('num'); 
        // const typeParam = queryParams.get('type'); 

        const users = await User.find();
        console.log("+++++++++++find++++++++++++++")

        return NextResponse.json({ users}, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
