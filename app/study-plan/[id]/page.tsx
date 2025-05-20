"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calendar, Clock, FileText, Timer } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function StudyPlanDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const plan = {
    id: params.id,
    subject: "Matemáticas",
    topic: "Cálculo Diferencial",
    examDate: "15 Abr 2023",
    daysLeft: 5,
    progress: 40,
    dailyGoal: "2 horas",
    overview:
      "Este plan está diseñado para prepararte para el examen de Cálculo Diferencial. Se enfoca en los conceptos fundamentales como límites, continuidad y derivadas.",
    documents: [
      { id: 1, title: "Resumen de Cálculo Diferencial", type: "summary" },
      { id: 2, title: "Flashcards de Límites", type: "flashcards" },
    ],
    schedule: [
      {
        day: "Hoy",
        date: "10 Abr",
        completed: true,
        tasks: [
          { id: 1, title: "Introducción a límites", duration: "45 min", completed: true },
          { id: 2, title: "Propiedades de límites", duration: "30 min", completed: true },
          { id: 3, title: "Ejercicios de límites", duration: "45 min", completed: true },
        ],
      },
      {
        day: "Mañana",
        date: "11 Abr",
        completed: false,
        tasks: [
          { id: 4, title: "Continuidad de funciones", duration: "45 min", completed: false },
          { id: 5, title: "Teoremas de continuidad", duration: "30 min", completed: false },
          { id: 6, title: "Ejercicios de continuidad", duration: "45 min", completed: false },
        ],
      },
      {
        day: "Miércoles",
        date: "12 Abr",
        completed: false,
        tasks: [
          { id: 7, title: "Introducción a derivadas", duration: "45 min", completed: false },
          { id: 8, title: "Reglas de derivación", duration: "45 min", completed: false },
          { id: 9, title: "Ejercicios de derivadas", duration: "30 min", completed: false },
        ],
      },
      {
        day: "Jueves",
        date: "13 Abr",
        completed: false,
        tasks: [
          { id: 10, title: "Aplicaciones de derivadas", duration: "60 min", completed: false },
          { id: 11, title: "Problemas de optimización", duration: "60 min", completed: false },
        ],
      },
      {
        day: "Viernes",
        date: "14 Abr",
        completed: false,
        tasks: [
          { id: 12, title: "Repaso general", duration: "60 min", completed: false },
          { id: 13, title: "Examen de práctica", duration: "60 min", completed: false },
        ],
      },
    ],
  }

  return (
    <AppShell>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <div onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </div>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {plan.subject}: {plan.topic}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                Examen: {plan.examDate}
              </Badge>
              <span>•</span>
              <span className="text-sm">{plan.daysLeft} días restantes</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/pomodoro">
              <Timer className="mr-2 h-4 w-4" />
              Iniciar Pomodoro
            </Link>
          </Button>
          <Button size="sm">Editar plan</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7 mb-6">
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle>Progreso general</CardTitle>
            <CardDescription>Tu avance en el plan de estudio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Progreso: {plan.progress}%</div>
              <div className="text-sm text-muted-foreground">{plan.daysLeft} días restantes</div>
            </div>
            <Progress value={plan.progress} className="h-2" />
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium">{plan.dailyGoal}</div>
                <div className="text-xs text-muted-foreground">Meta diaria</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium">{plan.daysLeft}</div>
                <div className="text-xs text-muted-foreground">Días restantes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium">{plan.documents.length}</div>
                <div className="text-xs text-muted-foreground">Documentos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Documentos de estudio</CardTitle>
            <CardDescription>Material de apoyo para tu plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plan.documents.map((doc) => (
                <div key={doc.id} className="flex items-center">
                  <div className="mr-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {doc.type === "summary" ? "Resumen" : "Flashcards"}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/documents/${doc.id}`}>Ver</Link>
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/documents/upload">Agregar documento</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Descripción</TabsTrigger>
          <TabsTrigger value="schedule">Cronograma</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>{plan.overview}</p>
                <h3>Objetivos del plan</h3>
                <ul>
                  <li>Comprender los conceptos fundamentales de límites y continuidad</li>
                  <li>Dominar las reglas de derivación y sus aplicaciones</li>
                  <li>Resolver problemas de optimización utilizando derivadas</li>
                  <li>Prepararse adecuadamente para el examen final</li>
                </ul>
                <h3>Recomendaciones</h3>
                <p>Para aprovechar al máximo este plan, se recomienda:</p>
                <ul>
                  <li>Seguir el cronograma diario de estudio</li>
                  <li>Utilizar la técnica Pomodoro para mantener la concentración</li>
                  <li>Revisar los documentos de apoyo proporcionados</li>
                  <li>Practicar con ejercicios adicionales si es necesario</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="mt-4">
          <div className="space-y-4">
            {plan.schedule.map((day, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {day.day} ({day.date})
                    </CardTitle>
                    <Badge variant={day.completed ? "success" : "outline"}>
                      {day.completed ? "Completado" : "Pendiente"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {day.tasks.map((task) => (
                      <div key={task.id} className="flex items-center">
                        <div className="mr-4">
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                              task.completed ? "bg-primary border-primary" : "border-muted-foreground"
                            }`}
                          >
                            {task.completed && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </div>
                          <div className="text-xs text-muted-foreground">Duración: {task.duration}</div>
                        </div>
                        <Button variant="outline" size="sm" disabled={task.completed}>
                          {task.completed ? "Completado" : "Iniciar"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  )
}
