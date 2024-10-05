"use client"

import {
  Atom,
  BarChart,
  Bell,
  Bird,
  BookOpen,
  Bot,
  Calendar,
  Code2,
  DollarSign,
  Eclipse,
  Frame,
  History,
  Home,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
  User,
} from "lucide-react"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from "@/components/ui/sidebar"
import logo from "@/asset/logo.svg"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
const data = {
  projects: [
    {
      "title": "Dashboard",
      "url": "/dashboard",
      "icon": Home
    },
    {
      "title": "User Management",
      "url": "/dashboard/user-management",
      "icon": Frame
    },
    {
      "title": "Category Management",
      "url": "/dashboard/category-management",
      "icon": Frame
    },
    {
      "title": "Sales & Marketing",
      "url": "/dashboard/sales-marketing",
      "icon": PieChart
    },
    {
      "title": "Application Management",
      "url": "/dashboard/app-settings",
      "icon": Map
    },
    {
      "title": "Bug Reports",
      "url": "/dashboard/bug-report",
      "icon": Map
    },
    {
      "title": "Appointment Management",
      "url": "/dashboard/appointment-management",
      "icon": Calendar
    },
    {
      "title": "Payment & Transaction Management",
      "url": "/dashboard/payment-management",
      "icon": DollarSign
    },
    {
      "title": "Landing Page Management",
      "url": "/dashboard/landing-page-settings",
      "icon": Map
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
}

export function AppSidebar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const stuser = JSON.parse(localStorage.getItem("user"));
    console.log(stuser);
    try {
      setUser(stuser)
    } catch (e) {
      console.log(e)
    }
  }, []);
  return (
    (<Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center w-full">
          <Link href="/dashboard">
            <Image src={logo} height={100} width={100} />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <NavSecondary items={data.projects} />
        </SidebarItem>
      </SidebarContent>
      {
        user && Object.keys(user).length > 0 ?
          <SidebarFooter>
            <NavUser user={user} />
          </SidebarFooter>
          : null
      }
    </Sidebar>)
  );
}
