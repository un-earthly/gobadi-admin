"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function AuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user && router.pathname !== "/login") {
            // If the user is not logged in and not on the login page, redirect to login
            router.push("/login");
        } else if (user && router.pathname !== "/") {
            // If the user is logged in and not on the dashboard page, redirect to dashboard
            router.push("/");
        }
    }, [router]);

    return null;  // This component handles the redirection and doesn't render anything
}
