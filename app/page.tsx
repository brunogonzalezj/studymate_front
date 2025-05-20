import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  // In a real app, we would check if the user is authenticated
  // If authenticated, redirect to dashboard
  // const isAuthenticated = false
  // if (isAuthenticated) {
  //   redirect("/dashboard")
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="StudyMate Logo"
                width={96}
                height={96}
                className="rounded-xl bg-primary p-2"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">StudyMate</h1>
          <p className="text-muted-foreground">Tu compañero de estudio con IA</p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Potencia tu estudio</CardTitle>
              <CardDescription>Organiza, resume y aprende de manera eficiente</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  1
                </div>
                <div>Sube documentos y genera resúmenes con IA</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  2
                </div>
                <div>Crea planes de estudio personalizados</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  3
                </div>
                <div>Practica con flashcards y tests generados automáticamente</div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">Registrarse</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
