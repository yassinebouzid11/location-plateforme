import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
import { Pencil,Trash2 } from "lucide-react"
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'


interface Offer {
  idPost: number
  ownerName: string
  email: string
  type: string
  date: string
  price: number
}

const requestedOffers: Offer[] = [
  {
    idPost: 101,
    ownerName: "Yasmine",
    email: "Yasmine@gmail.com",
    type: "S2",
    date: "2024-04-01",
    price: 550,
  },
  {
    idPost: 102,
    ownerName: "Ali",
    email: "ali@gmail.com",
    type: "S3",
    date: "2024-04-30",
    price: 700,
  },
  
  {
    idPost: 103,
    ownerName: "tawfik",
    type: "studio",
    email: "tawfik@gmail.com",
    date: "2024-04-15",
    price: 400,
  },
  {
    idPost: 104,
    ownerName: "samir",
    email: "samirr@gmail.com",
    type: "chambre",
    date: "2024-04-08",
    price: 460,
  },
  {
    idPost: 105,
    ownerName: "salsabil",
    email: "salsabil@gmail.com",
    type: "studio",
    date: "2024-04-24",
    price: 600,
  },
  // Add more offers here
]

export default function ManageOffersRequest() {
  const [offers, setOffers] = useState(requestedOffers)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<"date" | "price">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"delete" | "edit" | null>(null)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const Navigate=useNavigate();
  
  const ITEMS_PER_PAGE = 10

  const filteredOffers = offers
    .filter((offer) =>
      offer.ownerName.toLowerCase().includes(search.toLowerCase())
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
  const currentOffers = filteredOffers.slice(indexOfFirstUser, indexOfLastUser)

  const confirmDelete = (offer: Offer) => {
    setSelectedOffer(offer)
    setModalType("delete")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedOffer(null)
    setModalType(null)
  }

  const deleteUser = (id: number | undefined) => {
    setOffers(offers.filter((offer) => offer.idPost !== id))
    closeModal()
  }
  const handleSort = (key: "date" | "price") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Demandes des offres</h2>

      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Rechercher par nom du propriétaire"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <div className="space-x-2">
          <Button variant="outline" onClick={() => handleSort("date")}>Trier par date</Button>
          <Button variant="outline" onClick={() => handleSort("price")}>Trier par prix</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-muted">
              
              <th className="px-4 py-2">Nom Propriétaire</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOffers.map((offer) => (
              <tr key={offer.idPost} className="border-b">
                
                <td className="px-4 py-2">{offer.ownerName}</td>
                <td className="px-4 py-2">{offer.email}</td>
                <td className="px-4 py-2">{offer.type}</td>
                <td className="px-4 py-2">{offer.date}</td>
                <td className="px-4 py-2">{offer.price} TND</td>
                <td className="px-4 py-2 space-x-2">
                <Button variant="outline" size="sm"
                onClick={()=>Navigate(`/admin/offer-requests-details/${offer.idPost}`)}>
                    <Pencil className="w-4 h-4 mr-1" /> Details
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => confirmDelete(offer)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOffers.length === 0 && (
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
          Page {currentPage} sur {Math.ceil(filteredOffers.length / ITEMS_PER_PAGE)}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * ITEMS_PER_PAGE >= filteredOffers.length}
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
          <Button variant="destructive" onClick={() => deleteUser(selectedOffer?.idPost)}>
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
