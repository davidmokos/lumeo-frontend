"use client";

import { PlaySquare, Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMyLectures } from "@/hooks/use-my-lectures";

export function NavMain() {
  const { lectures } = useMyLectures();
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Discover</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/discover"}
              tooltip="Recent"
              asChild
            >
              <Link href="/discover">
                <PlaySquare />
                Recent
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>My Lectures</SidebarGroupLabel>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/create"}
              tooltip="Create"
              asChild
            >
              <Link href="/create">
                <Plus />
                Create new
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {lectures.map((lecture) => (
            <SidebarMenuItem key={lecture.id}>
              <SidebarMenuButton
                isActive={pathname === `/create/${lecture.id}`}
                tooltip={lecture.title || "Untitled"}
                asChild
              >
                <Link href={`/create/${lecture.id}`}>
                  <span className="truncate">
                    {lecture.title || "Untitled"}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
