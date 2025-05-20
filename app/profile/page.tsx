"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, BookOpen, Clock, Edit, Save } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  // Mock data
  const user = {
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    career: "Ingeniería",
    institution: "Universidad Nacional",
    semester: "5to semestre",
    bio: "Estudiante de ingeniería apasionado por las matemáticas y la programación.",
    subjects: ["Matemáticas", "Física", "Programación", "Economía"],
    stats: {
      studyTime: "45h",
      documents: 15,
      completedTasks: 28,
    },
    achievements: [
      { id: 1, name: "Estudioso", description: "Estudiar por 10 días consecutivos", date: "5 Abr 2023" },
      { id: 2, name: "Organizador", description: "Crear 5 planes de estudio", date: "28 Mar 2023" },
      { id: 3, name: "Documentalista", description: "Subir 10 documentos", date: "15 Mar 2023" },
    ],
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar perfil
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        )}
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea id="bio" defaultValue={user.bio} />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Biografía</div>
                      <div className="text-sm text-muted-foreground">{user.bio}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información académica</CardTitle>
                <CardDescription>Detalles sobre tus estudios</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="career">Carrera o área de estudio</Label>
                      <Select defaultValue={user.career.toLowerCase()}>
                        <SelectTrigger id="career">
                          <SelectValue />
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
                      <Input id="institution" defaultValue={user.institution} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="semester">Semestre o año</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="semester">
                          <SelectValue />
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
                ) : (
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">Carrera</div>
                        <div className="text-sm text-muted-foreground">{user.career}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Semestre</div>
                        <div className="text-sm text-muted-foreground">{user.semester}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Institución</div>
                      <div className="text-sm text-muted-foreground">{user.institution}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Materias</CardTitle>
                <CardDescription>Materias que estás estudiando actualmente</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Selecciona tus materias</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Matemáticas",
                          "Física",
                          "Química",
                          "Programación",
                          "Economía",
                          "Derecho Civil",
                          "Anatomía",
                        ].map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Switch id={subject} defaultChecked={user.subjects.includes(subject)} />
                            <Label htmlFor={subject} className="font-normal">
                              {subject}
                            </Label>
                          </div>
                        ))}
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
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Resumen de actividad</CardTitle>
                <CardDescription>Tu actividad de estudio en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{user.stats.studyTime}</div>
                    <div className="text-sm text-muted-foreground">Tiempo de estudio</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{user.stats.documents}</div>
                    <div className="text-sm text-muted-foreground">Documentos</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                      <Bell className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{user.stats.completedTasks}</div>
                    <div className="text-sm text-muted-foreground">Tareas completadas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Logros</CardTitle>
                <CardDescription>Logros que has desbloqueado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {user.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-4">
                        <div className="text-lg font-bold text-primary">🏆</div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{achievement.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todos los logros
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>Configura tus preferencias de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificaciones</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-reminders">Recordatorios de estudio</Label>
                    <Switch id="notify-reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-pomodoro">Notificaciones de Pomodoro</Label>
                    <Switch id="notify-pomodoro" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-exams">Alertas de exámenes próximos</Label>
                    <Switch id="notify-exams" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Pomodoro</h3>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="work-time" className="text-xs">
                        Tiempo de trabajo (min)
                      </Label>
                      <Select defaultValue="25">
                        <SelectTrigger id="work-time">
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
                        <SelectTrigger id="break-time">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pomodoro-sound">Sonidos de Pomodoro</Label>
                    <Switch id="pomodoro-sound" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Apariencia</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Modo oscuro automático</Label>
                    <Switch id="dark-mode" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Privacidad</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share-progress">Compartir progreso con amigos</Label>
                    <Switch id="share-progress" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-collection">Permitir recolección de datos anónimos</Label>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Guardar preferencias</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  )
}
