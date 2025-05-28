"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, FileText, Plus, Timer } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data
  const upcomingExams = [
    { id: 1, subject: "Matemáticas", topic: "Cálculo Diferencial", date: "15 Abr", daysLeft: 5 },
    { id: 2, subject: "Física", topic: "Termodinámica", date: "22 Abr", daysLeft: 12 },
    { id: 3, subject: "Programación", topic: "Algoritmos", date: "30 Abr", daysLeft: 20 },
  ]

  const todayTasks = [
    { id: 1, subject: "Matemáticas", topic: "Límites y Continuidad", duration: "45 min", completed: true },
    { id: 2, subject: "Física", topic: "Leyes de Newton", duration: "30 min", completed: false },
    { id: 3, subject: "Programación", topic: "Estructuras de Datos", duration: "60 min", completed: false },
  ]

  const recentDocuments = [
    { id: 1, title: "Resumen Cálculo", subject: "Matemáticas", date: "Ayer" },
    { id: 2, title: "Apuntes Termodinámica", subject: "Física", date: "Hace 2 días" },
    { id: 3, title: "Guía Algoritmos", subject: "Programación", date: "Hace 3 días" },
  ]

  const subjects = [
    { id: 1, name: "Matemáticas", progress: 65 },
    { id: 2, name: "Física", progress: 40 },
    { id: 3, name: "Programación", progress: 80 },
    { id: 4, name: "Economía", progress: 25 },
  ]

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido de nuevo, {usuario?.nombre}. Aquí está tu resumen de estudio.</p>
        </div>
        <Button asChild>
          <Link href="/documents/upload">
            <Plus className="mr-2 h-4 w-4" />
            Subir documento
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de estudio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">+2.5h comparado con la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">3 nuevos esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materias activas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">De 6 materias totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo examen</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 días</div>
            <p className="text-xs text-muted-foreground">Matemáticas: Cálculo Diferencial</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Progreso por materia</CardTitle>
            <CardDescription>Tu avance en cada materia activa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{subject.name}</div>
                    <div className="text-sm text-muted-foreground">{subject.progress}%</div>
                  </div>
                  <Progress value={subject.progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Próximos exámenes</CardTitle>
            <CardDescription>Prepárate para tus evaluaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center">
                  <div
                    className={`w-2 h-12 rounded-full mr-4 ${
                      exam.daysLeft <= 7 ? "bg-red-500" : exam.daysLeft <= 14 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">
                      {exam.subject}: {exam.topic}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {exam.date} ({exam.daysLeft} días)
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/study-plan/${exam.id}`}>Preparar</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Tabs defaultValue="today">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="today">Hoy</TabsTrigger>
              <TabsTrigger value="recent">Recientes</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" asChild>
              <Link href="/pomodoro">
                <Timer className="mr-2 h-4 w-4" />
                Iniciar Pomodoro
              </Link>
            </Button>
          </div>
          <TabsContent value="today" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tareas para hoy</CardTitle>
                <CardDescription>Tu plan de estudio para hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayTasks.map((task) => (
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
                          {task.subject}: {task.topic}
                        </div>
                        <div className="text-sm text-muted-foreground">Duración: {task.duration}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        {task.completed ? "Completado" : "Iniciar"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recent" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos recientes</CardTitle>
                <CardDescription>Tus últimos documentos y resúmenes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center">
                      <div className="mr-4">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.subject} • {doc.date}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/documents/${doc.id}`}>Ver</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
