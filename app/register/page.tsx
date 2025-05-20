"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Apple, ArrowLeft, Mail } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      router.push("/onboarding")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Volver</span>
              </Link>
            </Button>
            <CardTitle className="text-2xl">Crear cuenta</CardTitle>
          </div>
          <CardDescription>Ingresa tus datos para crear una cuenta</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" type="text" placeholder="Juan Pérez" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" type="button" disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              <Apple className="mr-2 h-4 w-4" />
              Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Inicia sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
