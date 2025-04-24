
import { SidebarRight } from "@/components/SideBarRight"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Main from "@/components/Main"




export default function Home() {
  return (
    <SidebarProvider>
      <Main />
      <SidebarInset>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
