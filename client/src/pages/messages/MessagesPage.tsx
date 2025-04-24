import { SidebarConversation } from "@/components/messages/SidebarConversation";
import { SidebarRight } from "@/components/SideBarRight";
import {  SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function MessagesPage() {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <SidebarConversation />
        <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
        </main>
        <SidebarRight />
      </SidebarProvider>
    </div>
  );
}
