"use client"
import { useContext } from "react";
import { UserContext } from "@/context/userContext/userContext";

export default function Home() {
  interface UserType {
    userEmail: string;
    role: string;
  }
  const { user }:any = useContext<UserType | undefined>(UserContext);

  return (
    <main>
      welcome:-   {user?.userEmail} 
    </main>
  );
}