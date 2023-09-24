"use client";

import React from "react";
import { useState } from "react";

import { Card, Input, Button } from "@material-tailwind/react";
import GoogleButton from "../GoogleButton";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      userEmail: email,
      userPassword: password,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);

      alert(JSON.stringify(data));

      // redirect the user to /dashboard
      if (data.role === "admin") {
        // push(`${NEXT_PUBLIC_API_URL}/dashboard?userId=${data.userId}`);
        window.location.href = `${NEXT_PUBLIC_API_URL}/dashboard?userId=${data.userId}`;
      } else {
        // push(`${NEXT_PUBLIC_API_URL}?userId=${data.userId}/`);
        window.location.href = `${NEXT_PUBLIC_API_URL}?userId=${data.userId}/`;
      }
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };



  return (
    <section
      id="create-category"
      className=" w-full   bg-gray-100 flex justify-center  "
    >
      <Card className="mt-10 ">
        <form onSubmit={handleSubmit} className=" p-10 ">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              crossOrigin="anonymous"
              required
            />
            <Input
              size="lg"
              type="password"
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              crossOrigin="anonymous"
              required
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            LogIn
          </Button>
          <p>---------------or---------------</p>
         <GoogleButton/>
        </form>

        <Link
          aria-label={`Docs`}
          href="/registration/signup"
          className="flex items-center text-blue-500"
        >
          SignUp
        </Link>
      </Card>
    </section>
  );
};

export default LogInForm;
