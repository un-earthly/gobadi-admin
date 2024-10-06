"use client"

import {
  Atom,
  BarChart,
  Bell,
  Bird,
  BookOpen,
  Bot,
  Bug,
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
      "url": "",
      "icon": Home
    },
    {
      "title": "User Management",
      "url": "/user-management",
      "icon": User
    },
    {
      "title": "Category Management",
      "url": "/category-management",
      "icon": Frame
    },
    {
      "title": "Sales & Marketing",
      "url": "/sales-marketing",
      "icon": PieChart
    },
    {
      "title": "Application Management",
      "url": "/app-settings",
      "icon": Map
    },
    {
      "title": "Bug Reports",
      "url": "/bug-report",
      "icon": Bug
    },
    {
      "title": "Appointment Management",
      "url": "/appointment-management",
      "icon": Calendar
    },
    {
      "title": "Payment & Transaction Management",
      "url": "/payment-management",
      "icon": DollarSign
    },
    {
      "title": "Landing Page Management",
      "url": "/landing-page-settings",
      "icon": Map
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
          <Link href="/">
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
