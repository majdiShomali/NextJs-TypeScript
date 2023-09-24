"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
const GoogleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GoogleProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={GoogleClientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
