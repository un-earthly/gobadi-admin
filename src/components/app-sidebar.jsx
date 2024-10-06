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
      "url": "/dashboard",
      "icon": Home
    },
    {
      "title": "User Management",
      "url": "/dashboard/user-management",
      "icon": User
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
      "icon": Bug
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
