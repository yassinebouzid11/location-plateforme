import { Outlet } from "react-router-dom"
import ReservationSidebar from "@/components/reservation/ReservationSidebar"

export default function ReservationLayout() {
  return (
    <div className="flex min-h-screen">
      <ReservationSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
