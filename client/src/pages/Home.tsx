import { SidebarRight } from "@/components/SideBarRight";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Main from "@/components/Main";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import ChatBot from "@/components/ChatBot";

export default function Home() {
  // const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <SidebarProvider>
      <Main />
      <SidebarInset></SidebarInset>
      <SidebarRight />
      {/* <Button onClick={() => setIsChatOpen(true)} className="fixed bottom-4 right-4 cursor-pointer">
        💬 Chat with us
      </Button>
      <ChatBot open={isChatOpen} onClose={() => setIsChatOpen(false)} /> */}
    </SidebarProvider>
  );
}
