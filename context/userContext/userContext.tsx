"use client"
import React, { createContext, useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import { UserType } from "@/types/userData";

type userContextType = {
  user:UserType,
  setUser:React.Dispatch<React.SetStateAction<UserType>>
}|undefined

export const UserContext = createContext<userContextType>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>();


  interface UserResponse {
    user: string | null;
    error: AxiosError | null;
  }
  async function getUser(): Promise<UserResponse> {
    try {
      const { data } = await axios.get("/api/auth/me");
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


export function useUserContext(){
  const context =useContext(UserContext);
  if(!context){
    throw new Error(
      "un auth"
    )
  }
  return context
}
