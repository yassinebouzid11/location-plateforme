import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom"
import { ContactFooter } from "./ContactFooter"

const offers = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    title: "Chambre Meublée",
    description: "Bien située à Tunis",
    price: 300,
    type: "Chambre",
    place: "Tunis",
    link: "/offredetails/1",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    title: "Studio Moderne",
    description: "Proche des transports",
    price: 400,
    type: "Studio",
    place: "Ariana",
    link: "/offredetails/2",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S2",
    description: "Confortable pour une petite famille",
    price: 600,
    type: "S2",
    place: "Sfax",
    link: "/offredetails/3",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S4",
    description: "Spacieux et lumineux",
    price: 800,
    type: "S4",
    place: "Tunis",
    link: "/offredetails/4",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x200",
    title: "Studio Meublé",
    description: "Idéal pour étudiants",
    price: 350,
    type: "Studio",
    place: "Tunis",
    link: "/offredetails/5",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S3",
    description: "Vue mer à Sousse",
    price: 700,
    type: "S3",
    place: "Sousse",
    link: "/offredetails/6",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S1",
    description: "Compact et pratique",
    price: 500,
    type: "S1",
    place: "Monastir",
    link: "/offredetails/7",
  },
]

const types = ["Chambre", "Studio", "S1", "S2", "S3", "S4", "S5"]

export default function OffersList() {
  const [selectedType, setSelectedType] = useState("")
  const [place, setPlace] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const filteredOffers = offers
    .filter((offer) => {
      return (
        (selectedType === "" || offer.type === selectedType) &&
        offer.place.toLowerCase().includes(place.toLowerCase())
      )
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    )

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage)
  const currentOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            className="w-full border rounded-lg p-2"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Tous les types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Lieu</label>
          <Input
            placeholder="Rechercher un lieu..."
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Trier par prix</label>
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "Prix croissant" : "Prix décroissant"}
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => {
              setSelectedType("")
              setPlace("")
              setSortOrder("asc")
              setCurrentPage(1)
            }}
            className="w-full"
          >
            Réinitialiser
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6 w-max">
        {currentOffers.length > 0 ? (
          currentOffers.map((offer) => (
            <Link to={offer.link} key={offer.id}>
              <Card className="w-full h-full p-3 shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer">

                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-sm font-semibold mb-1 truncate">
                  {offer.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-1 truncate">
                  {offer.description}
                </p>
                <p className="text-sm font-bold text-primary mb-1">
                  {offer.price} TND / mois
                </p>
                <p className="text-xs text-muted-foreground">
                  {offer.type} - {offer.place}
                </p>
              </Card>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            Aucun résultat trouvé.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
      <div className="pb-6">
        <ContactFooter />
      </div>
    </div>
  )
}
