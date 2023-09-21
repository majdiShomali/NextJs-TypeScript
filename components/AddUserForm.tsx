"use client";

import React ,{ useState } from "react"; 
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddUserForm =  () => {
  const [userName, setUserName] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userName }),
      });

      if (res.ok) {
        // router.push("/");
        //   const user = await res.json()
        //   console.log(user);
      } else {
        throw new Error("Failed to create a topic");
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
      <button>Submit</button>
    </form>
  );
};

export default AddUserForm;
