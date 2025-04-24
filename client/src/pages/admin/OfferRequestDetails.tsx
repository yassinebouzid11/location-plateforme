// src/pages/OfferDetail.tsx
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface Offer {
  id: number
  ownerName: string
  type: string
  date: string
  place: string
  description: string
  price: number
  images:string[]
}
const OffersRequest:Offer[] = [
  {
    id: 101,
    ownerName: "Yasmine B.",
    type: "S2",
    date: "2024-04-01",
    price: 550,
    description:"fvvf",
    place:"sahloul",
    images: [
      "https://via.placeholder.com/600x402",
      "https://via.placeholder.com/600x403",
    ],
  },
  {
    id: 102,
    ownerName: "Ali K.",
    type: "Studio",
    date: "2024-04-10",
    price: 400,
    description:"fvvf",
    place:"sahloul",
    images: [
      "https://via.placeholder.com/600x402",
      "https://via.placeholder.com/600x403",
    ],
  },
  
  {
    id: 103,
    ownerName: "Ali c.",
    type: "Studio",
    date: "2024-04-10",
    price: 400,
    description:"fvvf",
    place:"sahloul",
    images: [
      "https://via.placeholder.com/600x402",
      "https://via.placeholder.com/600x403",
    ],
  },

  // Add more mock offers as needed
]

export default function OfferRequestDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [offer, setOffer] = useState<Offer>()

  useEffect(() => {
    const foundOffer = OffersRequest.find((o) => o.id === Number(id))
    if (foundOffer) {
      setOffer(foundOffer)
    }
  }, [id])

  if (!offer) {
    return <p className="text-center p-4">Offre non trouvée.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
  

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
        <p className="mb-2"><strong>Publié par:</strong> {offer.ownerName}</p>
      </Card>

      <div className="flex justify-end gap-4 mr-3">
        <Button className="cursor-pointer" onClick={() => navigate("/admin/offer-requests")}>Annuler</Button>
      </div>
    </div>
  )
}
