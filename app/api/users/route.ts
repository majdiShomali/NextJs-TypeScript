import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";

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
        const { userName } = await request.json();
        await connectMongoDB();
        await User.create({ userName });
        return NextResponse.json({ message: "User Created" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });

    }
  }

export async function GET(request: Request,response:Response) {
    try {
        const queryParams = new URL(request.url).searchParams;
        const numParam = queryParams.get('num'); 
        const typeParam = queryParams.get('type'); 

        await connectMongoDB();
        const users = await User.find();

        return NextResponse.json({ users, numParam ,typeParam}, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
