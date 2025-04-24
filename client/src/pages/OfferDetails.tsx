// src/pages/OfferDetail.tsx
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

const mockOffers = [
  {
    id: 1,
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x401",
      "https://via.placeholder.com/600x401",
    ],
    title: "Chambre Meublée",
    description: "Bien située à Tunis avec toutes les commodités nécessaires.",
    price: 300,
    type: "Chambre",
    place: "Tunis",
    publisher: "Yasmine B.",
  },
  {
    id: 2,
    images: [
      "https://via.placeholder.com/600x402",
      "https://via.placeholder.com/600x403",
    ],
    title: "Studio Moderne",
    description: "Studio moderne proche des transports à Ariana.",
    price: 400,
    type: "Studio",
    place: "Ariana",
    publisher: "Ali K.",
  },
  // Add more mock offers as needed
]

export default function OfferDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [offer, setOffer] = useState<any>(null)

  useEffect(() => {
    const foundOffer = mockOffers.find((o) => o.id === Number(id))
    if (foundOffer) {
      setOffer(foundOffer)
    }
  }, [id])

  if (!offer) {
    return <p className="text-center p-4">Offre non trouvée.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{offer.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {offer.images.map((img: string, index: number) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
            className="w-full h-60 object-cover rounded-lg shadow-xl"
          />
        ))}
      </div>

      <Card className="p-4 shadow-xl mb-6">
        <p className="mb-2"><strong>Description:</strong> {offer.description}</p>
        <p className="mb-2"><strong>Prix:</strong> {offer.price} TND / mois</p>
        <p className="mb-2"><strong>Type:</strong> {offer.type}</p>
        <p className="mb-2"><strong>Lieu:</strong> {offer.place}</p>
        <p className="mb-2"><strong>Publié par:</strong> {offer.publisher}</p>
      </Card>

      <div className="flex justify-end gap-4 mr-3">
        <Button className="cursor-pointer" variant="outline" onClick={() => navigate("/offers")}>Plus d'offres</Button>
        <Button className="cursor-pointer" onClick={() => alert("Réservation en cours...")}>Réserver</Button>
      </div>
    </div>
  )
}
