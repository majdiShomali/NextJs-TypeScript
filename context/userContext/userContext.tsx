"use client"
import React, { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { UserType } from "@/types/userData";


// Create a context for the user
export const UserContext = createContext<any | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Define the user state
  const [user, setUser] = useState<UserType>();


  interface UserResponse {
    user: string | null;
    error: AxiosError | null;
  }
  async function getUser(): Promise<UserResponse> {
    try {
      const { data } = await axios.get("/api/auth/me");
      console.log(data);
      setUser(data)
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
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        return;
      }
    })();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
