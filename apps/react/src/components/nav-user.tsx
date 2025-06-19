import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { clearIsSuperAdmin, setIsSuperAdmin } from "@/store/superAdminSlice";
// import { clearAdmin, setAdmin } from "@/store/adminSlice";
import { clearIsSuperAdmin } from "@/store/superAdminSlice";
import { clearAdmin } from "@/store/adminSlice";
import { useDispatch } from "react-redux";
import { queryClient } from "@/Providers";

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        null,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      dispatch(clearIsSuperAdmin());
      dispatch(clearAdmin());
      localStorage.removeItem("user");
      toast.success("Logged Out Successfully");
      queryClient.invalidateQueries({ queryKey: ["verifySuperAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["verifyAdmin"] });
      navigate("/");
      // navigate("/", { state: { refresh: Date.now() } });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Logout failed");
      console.error("Logout failed:", error.response?.data?.message);
    },
  });
  const realUser = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarImage src={realUser.url} alt={realUser.username} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {/* <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span> */}
                <span className="truncate font-medium">
                  {realUser.username}
                </span>
                <span className="truncate text-xs">{realUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarImage src={realUser.url} alt={realUser.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {/* <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span> */}
                  <span className="truncate font-medium">
                    {realUser.username}
                  </span>
                  <span className="truncate text-xs">{realUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
              }}
            >
              {/* <button className="flex gap-2" onClick={() => logout()}> */}
              <LogOut />
              Log out
              {/* </button> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
