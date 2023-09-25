"use client";
import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const GoogleButton = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getGoogleLogin(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const getGoogleLogin = async (access_token: string) => {
    if (access_token) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
            },
          }
        );

        try {
          const res = await fetch(
            `${NEXT_PUBLIC_API_URL}/api/users/googleLogIn`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                userName: response.data.name,
                userEmail: response.data.email,
                userPassword: response.data.id,
              }),
            }
          );

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
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Button className="w-full flex h-10  items-center justify-center" onClick={() => login()}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-icon="google"
        className="mr-8 w-5"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="red"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      signIn with Google
    </Button>
  );
};

export default GoogleButton;
