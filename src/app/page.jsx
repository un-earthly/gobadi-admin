"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingMessages from "@/components/loading";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("user");

        try {
            if (!user && router.pathname !== "/login") {
                router.push("/login");
            } else if (user && router.pathname !== "/dashboard") {
                router.push("/dashboard");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <LoadingMessages />;
    }

    return (
        <div>

        </div>
    );
}