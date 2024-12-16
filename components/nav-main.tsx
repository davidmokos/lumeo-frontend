"use client";

import {
  Bot,
  ChevronRight,
  Library,
  ListMusic,
  Loader2,
  PlaySquare,
  SquareLibrary,
  SquareTerminal,
  Star,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useVideoQueue } from "@/hooks/use-video-queue";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

export function NavMain({ user }: { user: User | null }) {
  const { queue } = useVideoQueue({ userId: user?.id ?? "" });
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
        <SidebarGroupLabel>Library</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/my-videos"}
              tooltip="My Videos"
              asChild
            >
              <Link href="/my-videos">
                <SquareLibrary />
                My Videos
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {queue.length > 0 && (
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Queue" asChild>
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Generating ({queue.length})
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
