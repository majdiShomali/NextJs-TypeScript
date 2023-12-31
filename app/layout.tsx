import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/GlobalRedux/provider";
import { StickyNavbar } from "@/components/StickyNavbar";
import UserProvider from "@/context/userContext/userContext";
import GoogleProvider from "@/components/registration/GoogleProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleProvider>
          <UserProvider>
            <Providers>
              <>
                <StickyNavbar />
                {children}
              </>
            </Providers>
          </UserProvider>
        </GoogleProvider>
      </body>
    </html>
  );
}
