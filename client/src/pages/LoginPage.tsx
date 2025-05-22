import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate=useNavigate()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const loginData = {
      email,
      password,
    }
    try {
      const response = await axios.post("http://localhost:5000/auth/login",loginData);
  
      console.log("Login successful:", response.data);
      
      const { accessToken, email, id } = response.data
      localStorage.setItem("token", accessToken)
      localStorage.setItem("user", JSON.stringify({ email, id }))
      // Redirect or store auth info here (e.g., navigate to dashboard)
      navigate("/")
    } catch (error: any) {
      if (error.response && error.response.data?.message) {
        alert("Erreur : " + error.response.data.message);
      } else {
        alert("Erreur réseau. Veuillez réessayer plus tard.");
      }
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="overflow-hidden w-[70%] max-w-xxl grid p-0 md:grid-cols-2">
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <CardHeader className="space-y-1 flex flex-col items-center">
              <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
              <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Button type="button"  variant="link" className="px-0 font-normal text-xs text-muted-foreground h-auto">
                    Mot de passe oublié?
                  </Button>
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
              <div className="text-sm font-medium text-destructive"></div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" >
                Se connecter
              </Button>
            </CardFooter>
            <div className="px-8 pb-6 text-center text-sm">
              Vous n'avez pas de compte?
              <Button variant="link" className="p-0 font-normal h-auto">
                S'inscrire
              </Button>
            </div>
          </div>
        </form>
        <div className="relative hidden bg-muted md:block">
            <img
              src="../../public/login4.avif"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover  dark:brightness-[0.2] dark:grayscale"
            />
        </div>
      </Card>
    </div>
  )
}

