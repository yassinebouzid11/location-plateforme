


import { ElementRightBar } from "@/components/ElementRightBar"
import { DatePicker } from "@/components/DatePicker"
import { NavUser } from "@/components/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "user",
    email: "m@example.com",
    avatar: "avatars.jpg",
  },
  messages: [
    {
      name: "Messagerie",
    },
  ],
  reservation: [
    {
      name: "Gérer les réservations",
    },
  ],
}

export function SidebarRight() {
  return (
    <Sidebar
      collapsible="none"
      className="sticky flex top-18 h-screen border-l"
    >

      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <ElementRightBar data={data.messages} />
        <ElementRightBar data={data.reservation} />
      </SidebarContent>
    </Sidebar>
  )
}