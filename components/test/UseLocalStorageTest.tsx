"use client";
import React from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
type MyData = {
  id:number
  name:string
  age?:string
}

const UseLocalStorageTest = () => {
  const [data, setData] = useLocalStorage<MyData>("name" ,{id:0,name:"majdi"});
  const handleClick = () => {
    setData({
      id:data.id+1,
      name:`majdi ${data.id}`
    });
  };
  return (
    <>
      <button onClick={handleClick}>Increment ID </button>
      <p>{data.id?? ""}</p> 
      <p>{data.name?? ""}</p> 
         </>
  );
};

export default UseLocalStorageTest;
