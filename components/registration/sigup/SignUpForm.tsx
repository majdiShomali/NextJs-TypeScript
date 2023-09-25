"use client";

import React from "react";
import { useState } from "react";
import { Card, Input, Button } from "@material-tailwind/react";
import Link from "next/link";
import GoogleButton from "../GoogleButton";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const SignUpForm = () => {
  const [userName, setName] = useState("");
  const [userNameError, setNameError] = useState("");

  const [userEmail, setEmail] = useState("");
  const [userEmailError, setEmailError] = useState("");

  const [userPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function validateName(name: string): boolean {
    const regex = /^[a-zA-Z0-9\s-_]+$/;
    regex.test(name)
      ? setNameError("")
      : setNameError("The name should not contain any special characters. ");
    return regex.test(name);
  }

  function validateEmail(email: string): boolean {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    regex.test(email)
      ? setEmailError("")
      : setEmailError("The email should be example@example.com ");

    return regex.test(email);
  }

  // function validatePhone(userphone) {
  //   if (!/^07[0-9]{8}$/.test(userphone)) {
  //     setphonep("! Phone number must be 10 digits starting with 07");
  //     return false;
  //   }
  //   setphonep("");
  //   return true;
  // }

  // function validatePassword(userPassword) {
  //   let password = userPassword;
  //   const passwordRegex =
  //     /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //     setpasswordp(
  //       "! Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character"
  //     );
  //     return false;
  //   } else {
  //     setpasswordp("");
  //     return true;
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateName(userName) && validateEmail(userEmail)) {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ userName, userEmail, userPassword }),
        });

        if (res.ok) {
          const user = await res.json();
          window.location.href = `${NEXT_PUBLIC_API_URL}?userId=${user.userId}/`;
        } else {
          const { message } = await res.json();
          setErrorMessage(message);
          throw new Error("Failed to create a user");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section
      id="create-category"
      className=" w-full   bg-gray-100 flex justify-center  "
    >
      <Card className="my-10 w-96 ">
        <form onSubmit={handleSubmit} className=" p-10 ">
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input
                size="lg"
                label="Name"
                type="text"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                crossOrigin="anonymous"
                required
              />
              <p className="text-red-500 text-sm text-wrap">{userNameError}</p>
            </div>

            <div>
              <Input
                size="lg"
                label="Email"
                type="email"
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
                crossOrigin="anonymous"
                required
              />
              <p className="text-red-500 text-sm text-wrap">{userEmailError}</p>
            </div>

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
          <p className="text-red-500 text-sm text-wrap">{errorMessage}</p>

          
          <Button type="submit" className="mt-6 h-10" fullWidth>
            Sign Up
          </Button>
          <div className="flex items-center justify-center my-3">
            <p>---OR---</p>
          </div>
          <GoogleButton />
        </form>

        <div className="flex justify-center items-center my-2">
        <Link
          aria-label={`Docs`}
          href="/registration/login"
          className="flex items-center text-blue-500"
        >
          Aleredy have an account ?
        </Link>

        </div>

      </Card>
    </section>
  );
};

export default SignUpForm;
