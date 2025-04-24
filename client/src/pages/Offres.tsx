
import OffersList from "@/components/OffresList"
import { SidebarRight } from "@/components/SideBarRight"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"





export default function Offres() {
  return (
    <SidebarProvider>
      <OffersList />
      <SidebarInset>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
