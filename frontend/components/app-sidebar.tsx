"use client"

import * as React from "react"
import {
  Bird,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  Settings2,
  Users
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Nexlify",
      logo: Bird,
      plan: "Amplify Your Learning Journey",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      items: [
        { title: "Overview", url: "/dashboard" },
      ],
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: GraduationCap,
      items: [
        { title: "My Courses", url: "/dashboard/courses/mine"},
        { title: "Browse Courses", url: "/dashboard/courses"}
      ],
    },
    {
      title: "Certificates",
      url: "/dashboard/certificates",
      icon: FileText,
      items: [
        { title: "My Certificates", url: "/dashboard/certificates"},
      ],
    },
    {
      title: "Community",
      url: "/dashboard/community",
      icon: Users,
      items: [
        { title: "See Community", url: "/dashboard/community"},
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/settings/profile" },
        { title: "Account", url: "/settings/account" },
        { title: "Notifications", url: "/settings/notifications" },
      ],
    },
  ],
  projects: [
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
