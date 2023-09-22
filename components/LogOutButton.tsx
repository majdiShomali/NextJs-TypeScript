'use client'
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
  }
async function getUser(): Promise<UserResponse> {
    try {
      const { data } = await axios.get("/api/auth/logout");
        console.log(data)
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
    <button className="bg-red-500" onClick={getUser}>Log Out</button>
  )
}

export default LogOutButton