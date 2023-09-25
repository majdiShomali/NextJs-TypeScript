"use client";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}
async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/logout");
    console.log(data);
    window.location.href = `${NEXT_PUBLIC_API_URL}/`;

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
const LogOutButton = () => {
  return (
      <Button
        onClick={getUser}
        variant="gradient"
        size="sm"
        fullWidth
      >
        <span>Log Out</span>
      </Button>
  );
};

export default LogOutButton;
