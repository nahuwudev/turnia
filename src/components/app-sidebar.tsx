import * as React from "react";
import { navConf, navMain } from "@/lib/sidebar";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLogo } from "./nav-logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="text-blue-500">
        <NavLogo />
      </SidebarHeader>

      <SidebarContent>
        <NavMain groupLabel="Menú" items={navMain} />
        <NavMain groupLabel="Configuración" items={navConf} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
