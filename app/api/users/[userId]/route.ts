import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";



export async function GET(request:Request,{ params }: { params: {userId:string} }) {
try {
    const { userId } = params;
    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if(user){
     return NextResponse.json({ user }, { status: 200 });
    }
    return NextResponse.json({ message:"user Not found" }, { status: 404 });

} catch (error) {
    return NextResponse.json({ message:error }, { status: 500 });

}

}

export async function PUT(request:Request,{ params }: { params: {userId:string} }) {
    const { userId } = params;
    const { userName: userName } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(userId, { userName });
    return NextResponse.json({ message: "User updated" }, { status: 200 });
  }