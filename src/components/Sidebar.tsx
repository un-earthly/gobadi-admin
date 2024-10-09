"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import {
    Bug,
    Calendar,
    ChevronsUpDown,
    DollarSign,
    Frame,
    Home,
    LogOut,
    Map,
    Menu,
    PieChart,
    User,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const sidebarLinks = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "User Management",
        url: "/dashboard/user-management",
        icon: User,
    },
    {
        title: "Category Management",
        url: "/dashboard/category-management",
        icon: Frame,
    },
    {
        title: "Sales & Marketing",
        url: "/dashboard/sales-marketing",
        icon: PieChart,
    },
    {
        title: "Application Management",
        url: "/dashboard/app-settings",
        icon: Map,
    },
    {
        title: "Bug Reports",
        url: "/dashboard/bug-report",
        icon: Bug,
    },
    {
        title: "Appointment Management",
        url: "/dashboard/appointment-management",
        icon: Calendar,
    },
    {
        title: "Payment & Transactions",
        url: "/dashboard/payment-management",
        icon: DollarSign,
    },
    {
        title: "Landing Page Management",
        url: "/dashboard/landing-page-settings",
        icon: Map,
    },
]
const user = {
    name: "user",
    avatar: "https://example.com/avatar.jpg",
    role: "Admin",
    email: "admin@email.com"
}

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <MobileNav />
                </SheetContent>
            </Sheet>
            <nav className="hidden w-[300px] flex-col bg-foreground/5 as md:flex">
                <ScrollArea className="h-[calc(100vh-3.5rem)] my-auto">
                    <div className="space-y-2 py-4 flex flex-col justify-between items-center h-full p-6">
                        <div>
                            <NavLink to='/dashboard'>
                                <img src="/public/logo.svg" className="dark:invert-[100%] mx-auto mb-10" height={120} width={120} alt="" />
                            </NavLink>
                            <div className="space-y-3">
                                {sidebarLinks.map((link) => (
                                    <NavLink
                                        key={link.url}
                                        to={link.url}
                                        className={({ isActive }) =>
                                            cn(
                                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                                (isActive || (link.url !== "/dashboard" && location.pathname.startsWith(link.url))) ? "bg-accent" : "transparent"
                                            )
                                        }
                                        end={link.url === "/dashboard"}
                                    >
                                        <link.icon className="mr-2 h-4 w-4" />
                                        <span>{link.title}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="w-full rounded-md outline-none ring-ring hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent">
                                    <div
                                        className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
                                        <Avatar className="h-7 w-7 rounded-md border">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                                className="animate-in fade-in-50 zoom-in-90" />
                                            <AvatarFallback className="rounded-md">{user.name.slice(0, 1)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 leading-none">
                                            <div className="font-medium">{user.name}</div>
                                            <div className="overflow-hidden text-xs text-muted-foreground">
                                                <div className="line-clamp-1">{user.email}</div>
                                            </div>
                                        </div>
                                        <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-muted-foreground/50" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" side="right" sideOffset={4}>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div
                                            className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
                                            <Avatar className="h-7 w-7 rounded-md">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="overflow-hidden text-xs text-muted-foreground">
                                                    <div className="line-clamp-1">{user.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => {
                                            localStorage.removeItem("user");
                                            navigate("/login")
                                        }}
                                        className="gap-2"
                                    >
                                        <LogOut className="h-4 w-4 text-muted-foreground" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </ScrollArea>
            </nav>
        </>
    )
}

function MobileNav() {
    const location = useLocation()

    return (
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
                {sidebarLinks.map((link) => (
                    <NavLink
                        key={link.url}
                        to={link.url}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                (isActive || (link.url !== "/dashboard" && location.pathname.startsWith(link.url))) ? "bg-accent" : "transparent"
                            )
                        }
                        end={link.url === "/dashboard"}
                    >
                        <link.icon className="mr-2 h-4 w-4" />
                        <span>{link.title}</span>
                    </NavLink>
                ))}
            </div>
        </ScrollArea>
    )
}