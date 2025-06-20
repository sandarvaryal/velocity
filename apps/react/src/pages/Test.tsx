import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProtectedWrap from "@/hoc/ProtectedWrap";
import { Outlet } from "react-router-dom";

function UnprotectedUser() {
  const realUser = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(realUser, "realUser");
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          {/* <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset> */}

          {/* <Outlet /> */}
          <div style={{ flex: 1, overflow: "auto" }}>
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
export const User = ProtectedWrap(UnprotectedUser);
