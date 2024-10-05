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
        router.push("/login");
      } else if (user && router.pathname !== "/dashboard") {
        router.push("/dashboard");
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [router.pathname]);
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
