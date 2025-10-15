// src/pages/OfferDetail.tsx
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios"
import { OfferT } from "@/components/OffresList"


export default function OfferDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [offer, setOffer] = useState<OfferT>()

  
    useEffect(() => {
      const fetchOffer = async () => {
        try {
          const token= localStorage.getItem("token")
          const response = await axios.get(`http://localhost:5000/offer/${id}`,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            })
          setOffer(response.data)
          console.log(response.data)
        } catch (error) {
          console.error("Erreur lors du chargement des offres :", error)
        }
      }
    
      fetchOffer()
    }, [id])
    
  if (!offer) {
    return <p className="text-center p-4">Offre non trouvée.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{offer.titre}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {offer.images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000${img.url}`}
            alt={`Image ${index + 1}`}
            className="w-full h-60 object-cover rounded-lg shadow-xl"
          />
        ))}
      </div>

      <Card className="p-4 shadow-xl mb-6">
        <p className="mb-2"><strong>Description:</strong> {offer.description}</p>
        <p className="mb-2"><strong>Prix:</strong> {offer.prix} TND / mois</p>
        <p className="mb-2"><strong>Type:</strong> {offer.type}</p>
        <p className="mb-2"><strong>Lieu:</strong> {offer.adresse}</p>
      </Card>

      <div className="flex justify-end gap-4 mr-3">
        <Button className="cursor-pointer" variant="outline" onClick={() => navigate("/offres")}>Plus d'offres</Button>
        <Button className="cursor-pointer" onClick={() => alert("Réservation en cours...")}>Réserver</Button>
      </div>
    </div>
  )
}
