import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [tel, setTel] = useState("")
  const [age, setAge] = useState("")
  const [cin, setCin] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  
  const [showPassword, setShowPassword] = useState(false)
  const navigate=useNavigate()

  const roles = ["propriétaire", "locataire"]
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }

    const userData = {
      nom,
      email,
      role:selectedRole,
      tele: parseInt(tel, 10),
      age: parseInt(age, 10),
      cin: parseInt(cin, 10),
      password,
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", userData)
      console.log("Inscription réussie :", response.data)
      // reset
      setNom("");  setEmail(""); setTel(""); setAge(""); setCin(""); setPassword(""); setConfirmPassword("");setSelectedRole("");

      // Redirection
      navigate("/login") 

    } catch (error: any) {
      if (error.response) {
        alert("Erreur : " + (error.response.data.message || "Une erreur est survenue."))
      } else {
        alert("Erreur réseau. Veuillez réessayer plus tard.")
      }
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="overflow-hidden w-[80%] max-w-xxl grid p-0 md:grid-cols-2">
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <CardHeader className="space-y-1 flex flex-col items-center">
              <CardTitle className="text-2xl font-bold">Register</CardTitle>
              <CardDescription className="text-red-500">Veulliez entrer attentivement vos informations pour créer un compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  type="text"
                  placeholder="Entrer votre nom ici"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  type="tel"
                  placeholder="Entrer votre numéro ici"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cin">CIN</Label>
                <Input
                  id="cin"
                  type="number"
                  placeholder="Entrer votre carte d'identité ici"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                      className="w-full border rounded-lg p-2"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                  >
                      <option value="">Choisir un role</option>
                      {roles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                      ))}
                </select>
              </div> 
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Entrer votre age ici"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="">
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
              <Label htmlFor="password">Confirmer mot de passe</Label>
              <Input
                    id="confirmerPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirmer password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
              </div>
              <div className="text-sm font-medium text-destructive"></div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" >
                Register
              </Button>
            </CardFooter>
            
          </div>
        </form>
        <div className="relative hidden bg-muted md:block">
            <img
              src="../../public/register3.avif"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
      </Card>
    </div>
  )
}

