import * as React from "react"
import {  MessageCircle, TicketCheck } from "lucide-react"

import {
  Collapsible,

  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

export function ElementRightBar({
  data,
}: {
  data: {
    name: string
    
  }[]
}) {
  const Navigate = useNavigate()
  const toMessagerie=()=>{
        Navigate("/messages")
  }
  
  const toReservation=()=>{
        Navigate("/reservation")
  }
  return (
    <>
      {data.map((ele, index) => (
        <React.Fragment key={ele.name}>
          <SidebarGroup key={ele.name} className="py-0">
            <Collapsible
              defaultOpen={index === 0}
              className="group/collapsible "
            >
              <SidebarGroupLabel
                asChild
                className="group/label  cursor-pointer w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger onClick={ele.name=="Messagerie" ? toMessagerie : toReservation} className="">
                {ele.name=="Messagerie" && <MessageCircle />}
                {ele.name=="Gérer les réservations" && <TicketCheck />}
                  {ele.name}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
            </Collapsible>
          </SidebarGroup>
          <SidebarSeparator className="mx-0" />
        </React.Fragment>
      ))}
    </>
  )
}
