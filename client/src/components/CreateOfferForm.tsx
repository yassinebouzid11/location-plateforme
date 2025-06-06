import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function CreateOfferForm() {
    const [title, setTitle] = useState("")
    const [adresse, setAdresse] = useState("")
    const [discription, setDiscription] = useState("")
    const [price, setPrice] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [images, setImages] = useState<File[]>([])
    const Navigate= useNavigate();



const types = ["Chambre", "Studio", "S1", "S2", "S3", "S4", "S5"]

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("titre", title)
    formData.append("adresse", adresse)
    formData.append("description", discription)
    formData.append("type", selectedType)
    formData.append("prix", price)
    images.forEach((image) => {
        formData.append("images", image)
    })

    try {
        const token = localStorage.getItem("token")

        const response = await axios.post("http://localhost:5000/offer/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        })
        Navigate("/");
        console.log("Success:", response.data);

    } catch (error: any) {
        alert("Erreur : " + (error.response?.data?.message || "Une erreur est survenue."))
    }
    }


    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     try {
    //         const offerData ={
    //             titre:title,
    //             adresse,
    //             description:discription,
    //             type:selectedType,
    //             prix:price,
    //             images:images,
    //         }
    //         const token = localStorage.getItem("token") 
    //         const response= await axios.post("http://localhost:5000/offer/create",offerData,{headers:{Authorization:`Bearer ${token}`}})
    //         console.log(response.data)
    //     } catch (error: any) {
    //         if (error.response) {
    //             alert("Erreur : " + (error.response.data.message || "Une erreur est survenue."))
    //         } else {
    //             alert("Erreur réseau. Veuillez réessayer plus tard.")
    //         } 
    //     }
    // }


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            setImages(selectedFiles)
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-lg mx-auto p-6 shadow-xl">

        
        <form onSubmit={handleSubmit} className="w-full">
            <div className="space-y-5">
            <CardHeader className="space-y-1 flex flex-col items-center">
                <CardDescription className="text-xl text-black-500 font-bold">Vous pouvez créer une offre en remplissant le formulaire ci-dessous</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Entrer un titre pour l'offre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                    id="adresse"
                    type="text"
                    placeholder="Entrer l'adresse de l'offre"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="discription">discription</Label>
                <Textarea
                    id="discription"
                    placeholder="Evrivez un bref discription"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                <label className="block mb-1 font-medium">Type</label>
                <select
                    className="w-full border rounded-lg p-2"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">Choisir un type</option>
                    {types.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                    </select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="price">Prix</Label>
                <Input
                    id="price"
                    type="number"
                    placeholder="Entrer un prix"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="images">Images</Label>
                    <Input
                    id="images"
                    type="file"
                    
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(e)}
                    />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                {images.map((image, index) => (
                    <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-md shadow"
                    />
                ))}
                </div>

                <div className="text-sm font-medium text-destructive"></div>
            </CardContent>
            <CardFooter>
                <Button className="w-full cursor-pointer" type="submit" >
                Publier
                </Button>
            </CardFooter>
            </div>
        </form>
        </Card>
    </div>
    )
}

