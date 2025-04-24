import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
import { Pencil,Trash2 } from "lucide-react"
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'


interface Request {
  idRes: number
  ownerName: string
  type: string
  dateRes: string
  price: number
}

const requestedReservation: Request[] = [
  {
    idRes: 101,
    ownerName: "Yasmine B.",
    type: "S2",
    dateRes: "2024-04-01",
    price: 550,
  },
  {
    idRes: 102,
    ownerName: "Ali K.",
    type: "Studio",
    dateRes: "2024-04-10",
    price: 400,
  },
  
  {
    idRes: 103,
    ownerName: "Ali c.",
    type: "Studio",
    dateRes: "2024-04-10",
    price: 400,
  },
  {
    idRes: 104,
    ownerName: "Ali d.",
    type: "Studio",
    dateRes: "2024-04-10",
    price: 400,
  },
  {
    idRes: 105,
    ownerName: "Ali b.",
    type: "Studio",
    dateRes: "2024-04-10",
    price: 400,
  },
  // Add more requests here
]

export default function ReservationRequest() {
  const [requests, setrRquests] = useState(requestedReservation)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<"dateRes" | "price">("dateRes")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"delete" | "edit" | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const Navigate=useNavigate();
  
  const ITEMS_PER_PAGE = 10

  const filteredrequests = requests
    .filter((request) =>
      request.ownerName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      if (valA < valB) return sortOrder === "asc" ? -1 : 1
      if (valA > valB) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  const indexOfLastUser = currentPage * ITEMS_PER_PAGE
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE
  const currentrequests = filteredrequests.slice(indexOfFirstUser, indexOfLastUser)

  const confirmDelete = (request: Request) => {
    setSelectedRequest(request)
    setModalType("delete")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedRequest(null)
    setModalType(null)
  }

  const deleteUser = (id: number | undefined) => {
    setrRquests(requests.filter((request) => request.idRes !== id))
    closeModal()
  }
  const handleSort = (key: "dateRes" | "price") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Gérer les Offres</h2>

      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Rechercher par nom du propriétaire"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <div className="space-x-2">
          <Button variant="outline" onClick={() => handleSort("dateRes")}>Trier par date</Button>
          <Button variant="outline" onClick={() => handleSort("price")}>Trier par prix</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom Propriétaire</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date réservation</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentrequests.map((request) => (
              <tr key={request.idRes} className="border-b">
                <td className="px-4 py-2">{request.idRes}</td>
                <td className="px-4 py-2">{request.ownerName}</td>
                <td className="px-4 py-2">{request.type}</td>
                <td className="px-4 py-2">{request.dateRes}</td>
                <td className="px-4 py-2">{request.price} TND</td>
                <td className="px-4 py-2 space-x-2">
                <Button variant="outline" size="sm"
                onClick={()=>Navigate(`/reservation/request-details/${request.idRes}`)}>
                    <Pencil className="w-4 h-4 mr-1" /> Details
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => confirmDelete(request)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredrequests.length === 0 && (
          <p className="text-center text-muted-foreground mt-4">
            Aucun résultat trouvé.
          </p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <span className="mx-2">
          Page {currentPage} sur {Math.ceil(filteredrequests.length / ITEMS_PER_PAGE)}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * ITEMS_PER_PAGE >= filteredrequests.length}
        >
          Suivant
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen && modalType === "delete"}
        onRequestClose={closeModal}
        contentLabel="Confirmer la suppression"
        className="max-w-sm w-full mx-auto mt-40 bg-white rounded-md shadow-lg p-6 focus:outline-none"
      >
        <h2 className="text-lg font-semibold">Confirmer la suppression</h2>
        <p className="text-sm text-muted-foreground mb-4">Êtes-vous sûr de vouloir supprimer cet demande ?</p>
        <div className="flex gap-2 justify-end">
          <Button variant="destructive" onClick={() => deleteUser(selectedRequest?.idRes)}>
            Supprimer
          </Button>
          <Button variant="outline" onClick={closeModal}>
            Annuler
          </Button>
        </div>
      </Modal>

    </div>
  )
}
