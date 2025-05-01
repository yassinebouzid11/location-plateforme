import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom"
import { ContactFooter } from "./ContactFooter"
import axios from "axios"

// const offers = [
//   {
//     id: 1,
//     image: "https://via.placeholder.com/300x200",
//     title: "Chambre Meublée",
//     description: "Bien située à Tunis",
//     prix: 300,
//     type: "Chambre",
//     adresse: "Tunis",
//     link: "/offredetails/1",
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/300x200",
//     title: "Studio Moderne",
//     description: "Proche des transports",
//     prix: 400,
//     type: "Studio",
//     adresse: "Ariana",
//     link: "/offredetails/2",
//   },
//   {
//     id: 3,
//     image: "https://via.placeholder.com/300x200",
//     title: "Appartement S2",
//     description: "Confortable pour une petite famille",
//     prix: 600,
//     type: "S2",
//     adresse: "Sfax",
//     link: "/offredetails/3",
//   },
//   {
//     id: 4,
//     image: "https://via.placeholder.com/300x200",
//     title: "Appartement S4",
//     description: "Spacieux et lumineux",
//     prix: 800,
//     type: "S4",
//     adresse: "Tunis",
//     link: "/offredetails/4",
//   },
//   {
//     id: 5,
//     image: "https://via.placeholder.com/300x200",
//     title: "Studio Meublé",
//     description: "Idéal pour étudiants",
//     prix: 350,
//     type: "Studio",
//     adresse: "Tunis",
//     link: "/offredetails/5",
//   },
//   {
//     id: 6,
//     image: "https://via.placeholder.com/300x200",
//     title: "Appartement S3",
//     description: "Vue mer à Sousse",
//     prix: 700,
//     type: "S3",
//     adresse: "Sousse",
//     link: "/offredetails/6",
//   },
//   {
//     id: 7,
//     image: "https://via.placeholder.com/300x200",
//     title: "Appartement S1",
//     description: "Compact et pratique",
//     prix: 500,
//     type: "S1",
//     adresse: "Monastir",
//     link: "/offredetails/7",
//   },
// ]
interface OfferT {
  _id:string
  titre:string
  adresse:string
  description:string
  type:string
  prix:number
  images:File[]
}

const types = ["Chambre", "Studio", "S1", "S2", "S3", "S4", "S5"]

export default function OffersList() {

  const [offers, setOffers] = useState<OfferT[]>([])
  const [selectedType, setSelectedType] = useState("")
  const [adresse, setAdresse] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token= localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/offer/all",{
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          })
        setOffers(response.data)
      } catch (error) {
        console.error("Erreur lors du chargement des offres :", error)
      }
    }
  
    fetchOffers()
  }, [])
  
  const filteredOffers = offers
    .filter((offer) => {
      return (
        (selectedType === "" || offer.type === selectedType) &&
        offer.adresse.toLowerCase().includes(adresse.toLowerCase())
      )
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.prix - b.prix : b.prix - a.prix
    )

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage)
  const currentOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="max-w-7xl mx-auto p-4">
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
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
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
              setAdresse("")
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
            <Link to={"xxx"} key={offer._id}>
              <Card className="w-full h-full p-3 shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer">

                <img
                  src={`http://localhost:5000/offer/image/${offer._id}/0`}
                  alt={offer.titre}
                  className="w-47 h-50 object-cover rounded-md mb-2"
                />
                <h3 className="text-sm font-semibold mb-1 truncate">
                  {offer.titre}
                </h3>
                <p className="text-xs text-muted-foreground mb-1 truncate">
                  {offer.description}
                </p>
                <p className="text-sm font-bold text-primary mb-1">
                  {offer.prix} TND / mois
                </p>
                <p className="text-xs text-muted-foreground">
                  {offer.type} - {offer.adresse}
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
