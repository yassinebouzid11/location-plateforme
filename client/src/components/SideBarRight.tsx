import { ElementRightBar } from "@/components/ElementRightBar";
import { DatePicker } from "@/components/DatePicker";
import { useAuth } from "@/store/authContext";

import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  // user: {
  //   name: "user",
  //   email: "m@example.com",
  //   avatar: "avatars.jpg",
  // },
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
};

export function SidebarRight() {
  const { isLogged } = useAuth();
  return (
    <Sidebar
      collapsible="none"
      className="sticky flex top-18 h-screen border-l"
    >
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        {isLogged && (
          <>
            <ElementRightBar data={data.messages} />
            <ElementRightBar data={data.reservation} />
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
