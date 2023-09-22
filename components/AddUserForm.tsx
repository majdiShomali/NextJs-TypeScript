"use client";

import React ,{ useState } from "react"; 
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddUserForm =  () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userName,userEmail,userPassword }),
      });

      if (res.ok) {

        // router.push("/");
        //   const user = await res.json()
        //   console.log(user);
      } else {
        const {message} =await res.json()
        setErrorMessage(message);
        throw new Error("Failed to create a user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
     onSubmit={handleSubmit}
     >
      <input
        type="text"
        placeholder="useName"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="useEmail"
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="usePassword"
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default AddUserForm;
