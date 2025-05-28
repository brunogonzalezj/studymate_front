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
    e.preventDefault();
    setIsLoading(true);

    try {
      // Obtener los valores del formulario
      const formData = new FormData(e.currentTarget);
      const nombre = formData.get('name') as string;
      const correo = formData.get('email') as string;
      const contrasena = formData.get('password') as string;
      const confirmarContrasena = formData.get('confirm-password') as string;

      console.log("Datos a enviar:", {
        nombre,
        correo,
        contrasena,
        rol: 'ESTUDIANTE'
      });

      // Validar que las contraseñas coincidan
      if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
      }

      // Llamar a la API de registro
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          correo,
          contrasena,
          rol: 'ESTUDIANTE'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si hay un error, mostrar el mensaje
        alert(`Error: ${data.error || 'Error al registrar usuario'}`);
        setIsLoading(false);
        return;
      }

      // Si el registro es exitoso, redirigir a la página de onboarding
      console.log('Usuario registrado:', data.usuario);
      router.push('/onboarding');
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de conexión. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

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
              <Input id="name" name={"name"} type="text" placeholder="Juan Pérez" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name={"email"} type="email" placeholder="tu@ejemplo.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name={"password"} type="password" placeholder="••••••••" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input id="confirm-password" name={"confirm-password"} type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
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
