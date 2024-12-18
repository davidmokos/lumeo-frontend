import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export default function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="overflow-visible hover:bg-transparent"
          asChild
        >
          <Link
            href="/discover"
            className="h-8 w-8 overflow-visible"
          >
            <div className="relative h-8 w-8 min-w-8 min-h-8 -m-2">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={64}
                height={64}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 min-w-16 min-h-16"
              />
            </div>
            <span className="text-lg font-bold ml-2">LUMEO</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
