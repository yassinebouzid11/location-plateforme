import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Réservation demander", path: "/reservation/requested" },
  { label: "Réservation recever", path: "/reservation/receved" },
]

export default function ReservationSidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 min-h-screen border-r bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Gérer les réservation</h2>
      <nav className="space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "block px-4 py-2 rounded hover:bg-gray-100 transition",
              location.pathname === link.path && "bg-gray-200 font-semibold"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
