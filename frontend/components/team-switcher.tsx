"use client"

import * as React from "react"
import { ChevronsUpDown, LucideIcon, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useTheme } from "next-themes"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: LucideIcon
    plan: string
  }[]
}) {

  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamic icon color based on theme
  const iconColorClass = isMounted ? (resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900') : 'text-gray-900';


  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-sidebar-primary-foreground">
              <activeTeam.logo className={`size-4 ${iconColorClass}`} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {activeTeam.name}
              </span>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </div>
            {/* <ChevronsUpDown className="ml-auto" /> */}
          </SidebarMenuButton>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
