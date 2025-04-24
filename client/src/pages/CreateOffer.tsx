import CreateOfferForm from "@/components/CreateOfferForm"
import { SidebarRight } from "@/components/SideBarRight"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"





export default function CreateOffer() {
  return (
    <SidebarProvider>
        <CreateOfferForm />
        <SidebarInset>
        </SidebarInset>
        <SidebarRight />
    </SidebarProvider>
  )
}
