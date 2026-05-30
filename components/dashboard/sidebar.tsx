"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Icons.dashboard },
  { name: "Forms", href: "/dashboard/forms", icon: Icons.forms },
  { name: "Responses", href: "/dashboard/responses", icon: Icons.responses },
  { name: "Analytics", href: "/dashboard/analytics", icon: Icons.analytics },
  { name: "Templates", href: "/dashboard/templates", icon: Icons.templates },
  { name: "Integrations", href: "/dashboard/integrations", icon: Icons.integrations },
  { name: "Team", href: "/dashboard/team", icon: Icons.team },
  { name: "Billing", href: "/dashboard/billing", icon: Icons.billing },
  { name: "Settings", href: "/dashboard/settings", icon: Icons.settings },
]

interface SidebarProps {
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Logo collapsed={collapsed} />
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onCollapse?.(true)}
            >
              <Icons.arrowLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              const Icon = item.icon

              if (collapsed) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors mx-auto",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="border-t border-sidebar-border p-4">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 mx-auto"
                  onClick={() => onCollapse?.(false)}
                >
                  <Icons.arrowRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                MT
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Mufar Tech</p>
                <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
