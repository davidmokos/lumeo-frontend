import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/sidebar/nav-main"
import { createClient } from "@/utils/supabase/server"
import { NavUserClient } from "./nav-user-client"
import SidebarLogo from "./sidebar-logo"
export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUserClient user={user.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
