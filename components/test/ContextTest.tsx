"use client";
import { useUserContext } from "@/context/userContext/userContext";

const ContextTest = () => {
  const {user} =useUserContext()
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
