import * as React from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["superVerify"],
    queryFn: async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`, {
        withCredentials: true,
      });
      return true;
    },
    retry: false,
  });
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {data && !isLoading && !isError ? (
                <SidebarMenuButton asChild size="sm">
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive ? "mr-10" : "text-yellow-500"
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                  {/* <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a> */}
                </SidebarMenuButton>
              ) : (
                <></>
              )}
              {/* <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton> */}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
