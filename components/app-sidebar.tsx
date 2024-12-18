import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { createClient } from "@/utils/supabase/server"
import { NavUserClient } from "./nav-user/nav-user-client"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
          <span>Vid</span>
      </SidebarHeader> */}
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
