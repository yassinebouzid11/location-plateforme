import * as React from "react"
import {  MessageCircle, TicketCheck } from "lucide-react"

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
        <div key={ele.name} className="py-0">
          <div
            onClick={ele.name === "Messagerie" ? toMessagerie : toReservation}
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md cursor-pointer"
          >
            {ele.name === "Messagerie" && <MessageCircle className="w-4 h-4" />}
            {ele.name === "Gérer les réservations" && <TicketCheck className="w-4 h-4" />}
            <span className="flex-1 truncate">{ele.name}</span>
          </div>
          <div className="h-px bg-border mx-0" />
        </div>

          
        </React.Fragment>
      ))}
    </>
  )
}
