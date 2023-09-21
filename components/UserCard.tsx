"use client";

import EditUserForm from "./EditUserForm";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserCardProps {
  users: Array<{ _id: string; userName: string }>;
}
const UserCard: React.FC<UserCardProps> = ({ users }) => {
  const handleDelete = async (
    // e: React.MouseEvent<HTMLDivElement>,
    userId: string
  ) => {
    // e.preventDefault();
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/users?userId=${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
      }
    }
  };
  return (
    <>
      {users.map((user) => {
        return (
          <div
            key={user._id}
            className="shadow-md cursor-pointer hover:scale-105"
          >
            <EditUserForm user={user} />
            <div onClick={() => handleDelete(user._id)}>
              <Icon path={mdiDelete} color={"red"} size={1.5} />
            </div>

            <p>{user.userName}</p>
            <p> {user._id}</p>
          </div>
        );
      })}
    </>
  );
};

export default UserCard;
