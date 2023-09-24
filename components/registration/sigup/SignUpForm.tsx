"use client";

import React from "react";
import { useState } from "react";
import { Card, Input, Button } from "@material-tailwind/react";
import Link from "next/link";


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const SignUpForm = () => {
    const [userName, setName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
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
        const user =await res.json();
        window.location.href = `${NEXT_PUBLIC_API_URL}?userId=${user.userId}/`;
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
      <section
        id="create-category"
        className=" w-full   bg-gray-100 flex justify-center  "
      >
        <Card className="my-10 ">
          <form onSubmit={handleSubmit} className=" p-10 ">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Name"
                type="text"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                crossOrigin="anonymous"
                required
              />
              <Input
                size="lg"
                label="Email"
                type="email"
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
                crossOrigin="anonymous"
                required
              />
              <Input
                size="lg"
                type="password"
                label="Password"
                value={userPassword}
                onChange={(e) => setPassword(e.target.value)}
                crossOrigin="anonymous"
                required
              />
            </div>
  
            <Button type="submit" className="mt-6" fullWidth>
              Sign Up
            </Button>
          </form>
          <Link
              aria-label={`Docs`}
              href="/registration/login"
              className="flex items-center text-blue-500"
            >LogIn</Link>
        </Card>
      </section>
    );
  };

export default SignUpForm