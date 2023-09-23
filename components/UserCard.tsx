"use client";

import EditUserForm from "./EditUserForm";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserCardProps {
  users: Array<{ _id: string; userName: string ,token:string}>;
}
const UserCard: React.FC<UserCardProps> = ({ users }) => {


  const [user, setUser] = useState<any>({});


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
      const { error } = await getUser();

      if (error) {
        return;
      }
    })();
  }, []);

  console.log(user?.token?.value);
  const handleDelete = async (
    // e: React.MouseEvent<HTMLDivElement>,
    userId: string
  ) => {
    // e.preventDefault();
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/users?userId=${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token?.value}`,
          },
        });
  
        if (res.ok) {
          console.log(await res.json())
        }
      } catch (error) {
        console.log(error)
      }
   
    }
  };
  return (
    <>
      {users?.map((user) => {
        return (
          <div
            key={user._id}
            className="shadow-md cursor-pointer hover:scale-105"
          >
            <EditUserForm user={user} />
            {user? 
                   <div onClick={() => handleDelete(user._id)}>
                   <Icon path={mdiDelete} color={"red"} size={1.5} />
                 </div>
            
            :null}
     

            <Link passHref aria-label={`/users/userDetails/${user._id}`} href={`/users/userDetails/${user._id}`}>
              Show Details
            </Link>

            <p>{user.userName}</p>
            <p> {user._id}</p>
          </div>
        );
      })}
    </>
  );
};

export default UserCard;
