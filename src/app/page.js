"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // parse if it's stored as a JSON object
    } else {
      window.location.href = "/login"; // redirect if no user is found
    }
  }, []);

  return (
    <>
      {/* Render something if needed */}
    </>
  );
}
