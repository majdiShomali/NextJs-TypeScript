"use client"

import { useAppSelector } from "@/GlobalRedux/store";
import { useAppDispatch } from "@/GlobalRedux/store";
import { fetchUsers } from "@/GlobalRedux/actions/userActions/getUser";
import { FC } from "react";

interface MyComponentProps {
    token: string | undefined;
  }

const ReduxTest :FC<MyComponentProps> = ({token}) => {
    const {users} = useAppSelector((state) => state.users.data);
    const dispatch = useAppDispatch();
  
    const handleFetchUser = () => {
        if(token){
            dispatch(fetchUsers(token));
        }
    };
  console.log(users);
  return (
    <div>
    <button onClick={handleFetchUser}>Fetch User</button>
  </div>
  )
}

export default ReduxTest