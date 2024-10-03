"use client";

import localFont from "next/font/local";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingMessages from "@/components/loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const user = localStorage.getItem("user");

    try {
      if (!user && router.pathname !== "/login") {
        // If the user is not logged in and not on the login page, redirect to login
        router.push("/login");
      } else if (user && router.pathname !== "/dashboard") {
        // If the user is logged in and not on the dashboard page, redirect to dashboard
        router.push("/dashboard");
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [router]);
  if (loading) {
    return <LoadingMessages />
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
