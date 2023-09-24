"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext/userContext";
import { UserType } from "@/types/userData";

const ContextTest = () => {
  const { user }: any = useContext<UserType | undefined>(UserContext);
  return (
    <>
      {user ? (
        <div> welcome:- {user?.user?.userEmail} </div>
      ) : (
        <div> welcome:- User </div>
      )}
    </>
  );
};

export default ContextTest;
