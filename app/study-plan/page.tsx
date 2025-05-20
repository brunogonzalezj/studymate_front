"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Check, Clock, Plus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useRouter } from "next/navigation"

export default function StudyPlanPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false)
      router.push("/study-plan/1")
    }, 2000)
  }

  // Mock data
  const upcomingExams = [
    { id: 1, subject: "Matemáticas", topic: "Cálculo Diferencial", date: "15 Abr", daysLeft: 5 },
    { id: 2, subject: "Física", topic: "Termodinámica", date: "22 Abr", daysLeft: 12 },
    { id: 3, subject: "Programación", topic: "Algoritmos", date: "30 Abr", daysLeft: 20 },
  ]

  const activePlans = [
    { id: 1, subject: "Matemáticas", topic: "Cálculo Diferencial", progress: 40, daysLeft: 5 },
    { id: 2, subject: "Física", topic: "Termodinámica", progress: 20, daysLeft: 12 },
  ]

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Plan de Estudio</h1>
          <p className="text-muted-foreground">Organiza tu tiempo de estudio de manera eficiente</p>
        </div>
        <Button asChild>
          <div onClick={() => document.getElementById("new-plan")?.scrollIntoView({ behavior: "smooth" })}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo plan
          </div>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="active">Planes activos</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {activePlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{plan.subject}</CardTitle>
                  <CardDescription>{plan.topic}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">Progreso: {plan.progress}%</div>
                    <div className="text-sm text-muted-foreground">{plan.daysLeft} días restantes</div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${plan.progress}%` }} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <div onClick={() => router.push(`/study-plan/${plan.id}`)}>Ver plan</div>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {activePlans.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No tienes planes de estudio activos</p>
                <Button className="mt-4" asChild>
                  <div onClick={() => document.getElementById("new-plan")?.scrollIntoView({ behavior: "smooth" })}>
                    Crear nuevo plan
                  </div>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={es} className="mx-auto" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-xl font-bold tracking-tight mb-4">Exámenes próximos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {upcomingExams.map((exam) => (
            <Card key={exam.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{exam.subject}</CardTitle>
                <CardDescription>{exam.topic}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{exam.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{exam.daysLeft} días</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <div onClick={() => router.push(`/study-plan/new?exam=${exam.id}`)}>Crear plan</div>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-8" id="new-plan">
        <CardHeader>
          <CardTitle>Nuevo plan de estudio</CardTitle>
          <CardDescription>Genera un plan de estudio personalizado según tus necesidades</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Materia</Label>
            <Select>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Selecciona una materia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matematicas">Matemáticas</SelectItem>
                <SelectItem value="fisica">Física</SelectItem>
                <SelectItem value="quimica">Química</SelectItem>
                <SelectItem value="programacion">Programación</SelectItem>
                <SelectItem value="economia">Economía</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topic">Tema</Label>
            <Input id="topic" placeholder="Ej. Cálculo Diferencial" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="exam-date">Fecha del examen</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={es} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="study-time">Tiempo de estudio diario</Label>
              <Select defaultValue="2">
                <SelectTrigger id="study-time">
                  <SelectValue />
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
          </div>
          <div className="grid gap-2">
            <Label htmlFor="knowledge-level">Nivel de conocimiento</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="knowledge-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Principiante - Estoy empezando</SelectItem>
                <SelectItem value="medium">Intermedio - Tengo conocimientos básicos</SelectItem>
                <SelectItem value="advanced">Avanzado - Necesito reforzar conceptos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documents">Documentos relacionados</Label>
            <Select>
              <SelectTrigger id="documents">
                <SelectValue placeholder="Selecciona documentos para incluir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doc1">Resumen de Cálculo Diferencial</SelectItem>
                <SelectItem value="doc2">Apuntes de Límites y Continuidad</SelectItem>
                <SelectItem value="doc3">Guía de Derivadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>Generando plan...</>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Generar plan de estudio
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </AppShell>
  )
}
