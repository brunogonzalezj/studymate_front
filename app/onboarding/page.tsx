"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      // Simulate completion
      setTimeout(() => {
        setIsLoading(false)
        router.push("/login")
      }, 1000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Configuración inicial</CardTitle>
            <div className="text-sm text-muted-foreground">Paso {step} de 3</div>
          </div>
          <CardDescription>
            {step === 1 && "Cuéntanos sobre ti para personalizar tu experiencia"}
            {step === 2 && "¿Qué materias estás estudiando actualmente?"}
            {step === 3 && "Configura tus preferencias de estudio"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {step === 1 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="career">Carrera o área de estudio</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ingenieria">Ingeniería</SelectItem>
                    <SelectItem value="medicina">Medicina</SelectItem>
                    <SelectItem value="derecho">Derecho</SelectItem>
                    <SelectItem value="economia">Economía</SelectItem>
                    <SelectItem value="psicologia">Psicología</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="institution">Institución educativa</Label>
                <Input id="institution" type="text" placeholder="Universidad, instituto, etc." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="semester">Semestre o año</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu semestre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1er semestre</SelectItem>
                    <SelectItem value="2">2do semestre</SelectItem>
                    <SelectItem value="3">3er semestre</SelectItem>
                    <SelectItem value="4">4to semestre</SelectItem>
                    <SelectItem value="5">5to semestre</SelectItem>
                    <SelectItem value="6">6to semestre</SelectItem>
                    <SelectItem value="7">7mo semestre</SelectItem>
                    <SelectItem value="8">8vo semestre</SelectItem>
                    <SelectItem value="9">9no semestre</SelectItem>
                    <SelectItem value="10">10mo semestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Selecciona tus materias actuales</Label>
                <div className="grid gap-2">
                  {["Matemáticas", "Física", "Química", "Programación", "Economía", "Derecho Civil", "Anatomía"].map(
                    (subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox id={subject} />
                        <Label htmlFor={subject} className="font-normal">
                          {subject}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="custom-subject">Agregar otra materia</Label>
                <div className="flex gap-2">
                  <Input id="custom-subject" type="text" placeholder="Nombre de la materia" />
                  <Button type="button" variant="outline" className="shrink-0">
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="study-time">Tiempo de estudio diario (horas)</Label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona las horas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hora</SelectItem>
                    <SelectItem value="2">2 horas</SelectItem>
                    <SelectItem value="3">3 horas</SelectItem>
                    <SelectItem value="4">4 horas</SelectItem>
                    <SelectItem value="5">5+ horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pomodoro">Configuración de Pomodoro</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="work-time" className="text-xs">
                      Tiempo de trabajo (min)
                    </Label>
                    <Select defaultValue="25">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="45">45</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="break-time" className="text-xs">
                      Tiempo de descanso (min)
                    </Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Preferencias</Label>
                <div className="grid gap-2">
                  {[
                    "Recibir notificaciones de recordatorio",
                    "Activar sonidos de notificación",
                    "Mostrar estadísticas de estudio",
                    "Activar modo oscuro automáticamente",
                  ].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox id={pref.replace(/\s+/g, "-").toLowerCase()} defaultChecked />
                      <Label htmlFor={pref.replace(/\s+/g, "-").toLowerCase()} className="font-normal">
                        {pref}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Anterior
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleNext} disabled={isLoading}>
            {step < 3 ? "Siguiente" : isLoading ? "Finalizando..." : "Finalizar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
