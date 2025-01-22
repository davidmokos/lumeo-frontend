import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/sidebar/nav-main";
import { createClient } from "@/utils/supabase/server";
import { NavUserClient } from "./nav-user-client";
import SidebarLogo from "./sidebar-logo";
import GitHubIcon from "../github-icon";
import Link from "next/link";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        <div className="flex-1">
          <NavMain />
        </div>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={false} tooltip="Recent" asChild>
                <Link
                  href="https://github.com/davidmokos/lumeo-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                  Star on GitHub
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUserClient user={user.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
