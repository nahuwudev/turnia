import { CalendarCheck } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useSidebar } from "@/components/ui/sidebar";

export function NavLogo() {
  const { state } = useSidebar();

  return (
    <div
      className="flex items-center "
      style={{ marginTop: state === "expanded" ? 5 : 0 }}
    >
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className="rounded-lg">
          <CalendarCheck />
        </AvatarFallback>
      </Avatar>
      {state === "collapsed" ? null : (
        <h1 className="text-xl ml-2 font-bold">Turnia</h1>
      )}
    </div>
  );
}
