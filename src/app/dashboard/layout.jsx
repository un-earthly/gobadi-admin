import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarLayout,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers"

export default function Page({ children }) {
    // Access cookies to manage sidebar state
    const sidebarState = cookies().get("sidebar:state")?.value === "true";

    return (
        <SidebarLayout defaultOpen={sidebarState}>
            <AppSidebar />
            <main
                className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out"
            >
                <div className="h-full rounded-md border-2 border-dashed p-2">
                    <SidebarTrigger />
                    {children}
                </div>
            </main>
        </SidebarLayout>
    );
}
