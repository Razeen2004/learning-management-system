"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";

// Extend the DefaultSession type to include 'role'
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      role?: string;
      isVerified?: string;
    } & DefaultSession["user"];
  }
}
import {
  Bird,
  FileText,
  GraduationCap,
  Home,
  Settings2,
  Users,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Base navigation data
const baseNavData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [],
  projects: [],
};

// Role-based navigation items
const getNavMainByRole = (role: string) => {
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      items: [{ title: "Overview", url: "/dashboard" }],
    },
  ];

  if (role === "STUDENT") {
    navMain.push(
      {
        title: "Courses",
        url: "/dashboard/courses",
        icon: GraduationCap,
        items: [
          { title: "My Courses", url: "/dashboard/courses/mine" },
          { title: "Browse Courses", url: "/dashboard/courses" },
        ],
      },
      {
        title: "Certificates",
        url: "/dashboard/certificates",
        icon: FileText,
        items: [{ title: "My Certificates", url: "/dashboard/certificates" }],
      },
      {
        title: "Community",
        url: "/dashboard/community",
        icon: Users,
        items: [{ title: "See Community", url: "/dashboard/community" }],
      }
    );
  }

  if (role === "TEACHER") {
    navMain.push(
      {
        title: "Courses",
        url: "/dashboard/courses",
        icon: GraduationCap,
        items: [
          { title: "My Courses", url: "/dashboard/courses/teacher" },
          { title: "Create Course", url: "/dashboard/courses/create" },
        ],
      },
      {
        title: "Students",
        url: "/dashboard/students",
        icon: Users,
        items: [{ title: "View Students", url: "/dashboard/students" }],
      }
    );
  }

  if (role === "ADMIN") {
    navMain.push(
      {
        title: "Users",
        url: "/dashboard/",
        icon: Users,
        items: [
          { title: "Manage Users", url: "/dashboard/admin/users" },
          { title: "Teacher Requests", url: "/dashboard/admin/teachers" },
        ],
      },
      {
        title: "Courses",
        url: "/dashboard/courses",
        icon: GraduationCap,
        items: [
          { title: "All Courses", url: "/dashboard/courses" },
          { title: "Approve Courses", url: "/dashboard/courses/approve" },
        ],
      }
    );
  }

  navMain.push({
    title: "Settings",
    url: "/settings",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/settings/profile" },
      { title: "Account", url: "/settings/account" },
      { title: "Notifications", url: "/settings/notifications" },
    ],
  });

  return navMain;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session  = useSession();
  const role = session?.data?.user?.role || "STUDENT"; // Default to student if no role

  // Dynamically generate navMain based on role
  const navMain = getNavMainByRole(role);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={baseNavData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}