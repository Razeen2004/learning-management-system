"use client"

import * as React from "react"
import { Bird, LucideIcon } from "lucide-react"

import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useTheme } from "next-themes"

export function TeamSwitcher() {

  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const { isMobile } = useSidebar()

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  // Dynamic icon color based on theme
  const iconColorClass = isMounted ? (resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900') : 'text-gray-900';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-sidebar-primary-foreground">
              <Bird className={`size-4 ${iconColorClass}`} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {"Nexlify"}
              </span>
              <span className="truncate text-xs">{"Amplify Your Learning Journey"}</span>
            </div>
          </SidebarMenuButton>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
