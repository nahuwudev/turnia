import { AppSidebar } from "@/components/app-sidebar";
import { NewDate } from "@/components/new-date";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { directories } from "@/lib/directorios";
import { Separator } from "@radix-ui/react-separator";

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

export default function DashboardLayout() {
  const location = useLocation().pathname;
  const isRootDashboard = location === "/dashboard";
  const locationLabel = location.replace("/dashboard/", "");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      const isContentScrollable = fullHeight > viewportHeight + 100;
      const hasScrolledEnough = scrollTop > 60;

      setIsScrolled(isContentScrollable && hasScrolledEnough);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className={`z-50 transition-all flex items-center justify-between ${
            isScrolled
              ? "fixed top-0 w-full bg-white/30 backdrop-blur-md shadow-md"
              : "relative"
          }`}
        >
          <div className="flex h-16 items-center gap-2 px-4 transition-[height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    to={directories.dashboard.url}
                    label={directories.dashboard.title}
                  />
                </BreadcrumbItem>
                {!isRootDashboard && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="select-none">
                      <BreadcrumbPage>
                        {locationLabel.charAt(0).toUpperCase() +
                          locationLabel.slice(1)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mr-5">
            <NewDate />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
