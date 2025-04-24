import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Dashboard", path: "/admin" },
  { label: "Utilisateurs", path: "/admin/users" },
  { label: "Offres", path: "/admin/offers" },
  { label: "Demandes des offres", path: "/admin/offer-requests" },
]

export default function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 min-h-screen border-r bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
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
