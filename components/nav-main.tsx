"use client"

import { Bot, ChevronRight, Library, ListMusic, PlaySquare, SquareLibrary, SquareTerminal, Star, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const navMain: {
  groupLabel: string
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}[] = [
  {
    groupLabel: "Discover",
    items: [
      {
        title: "Recent",
        url: "/discover",
        icon: PlaySquare,
        isActive: true,
      }
    ]
  },
  // Example of another group
  {
    groupLabel: "Library",
    items: [
      {
        title: "My Videos",
        url: "/my-videos",
        icon: SquareLibrary,
      },
      // {
      //   title: "Favorites",
      //   url: "/favorites",
      //   icon: Star,
      // }
    ]
  }
]

export function NavMain() {
  return (
    <>
      {navMain.map((group) => (
        <SidebarGroup key={group.groupLabel}>
          <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => {
              if (!item.items) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
