"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en StudyMate</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="privacy">Privacidad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración general</CardTitle>
              <CardDescription>Personaliza la apariencia y comportamiento de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Apariencia</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Modo oscuro automático</Label>
                    <Switch id="dark-mode" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast">Modo de alto contraste</Label>
                    <Switch id="high-contrast" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size">Tamaño de fuente</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona tamaño" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeño</SelectItem>
                        <SelectItem value="medium">Mediano</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Idioma y región</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="language">Idioma</Label>
                    <Select defaultValue="es">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="date-format">Formato de fecha</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Formato de fecha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Comportamiento</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-save">Guardar automáticamente</Label>
                    <Switch id="auto-save" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Animaciones</Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="default-page">Página de inicio</Label>
                    <Select defaultValue="dashboard">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Página de inicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="subjects">Materias</SelectItem>
                        <SelectItem value="documents">Documentos</SelectItem>
                        <SelectItem value="study-plan">Plan de estudio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Recordatorios de estudio</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="study-reminders">Activar recordatorios</Label>
                    <Switch id="study-reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder-frequency">Frecuencia</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diaria</SelectItem>
                        <SelectItem value="weekdays">Días laborables</SelectItem>
                        <SelectItem value="custom">Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder-time">Hora del recordatorio</Label>
                    <Input id="reminder-time" type="time" defaultValue="18:00" className="w-[180px]" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificaciones de Pomodoro</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pomodoro-notifications">Notificaciones de Pomodoro</Label>
                    <Switch id="pomodoro-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pomodoro-sound">Sonidos</Label>
                    <Switch id="pomodoro-sound" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pomodoro-vibration">Vibración</Label>
                    <Switch id="pomodoro-vibration" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Alertas de exámenes</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="exam-alerts">Alertas de exámenes</Label>
                    <Switch id="exam-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="exam-alert-days">Días de anticipación</Label>
                    <Select defaultValue="7">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Días" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 día</SelectItem>
                        <SelectItem value="3">3 días</SelectItem>
                        <SelectItem value="5">5 días</SelectItem>
                        <SelectItem value="7">7 días</SelectItem>
                        <SelectItem value="14">14 días</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pomodoro" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pomodoro</CardTitle>
              <CardDescription>Personaliza los tiempos y comportamiento del temporizador Pomodoro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Intervalos de tiempo</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="work-time">Tiempo de trabajo (minutos)</Label>
                    <Select defaultValue="25">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Minutos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="45">45</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="short-break">Descanso corto (minutos)</Label>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Minutos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="long-break">Descanso largo (minutos)</Label>
                    <Select defaultValue="15">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Minutos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="long-break-interval">Ciclos antes de descanso largo</Label>
                    <Select defaultValue="4">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ciclos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Comportamiento</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-start-breaks">Iniciar descansos automáticamente</Label>
                    <Switch id="auto-start-breaks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-start-pomodoros">Iniciar pomodoros automáticamente</Label>
                    <Switch id="auto-start-pomodoros" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="strict-mode">Modo estricto (sin pausar)</Label>
                    <Switch id="strict-mode" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Sonidos</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ticking-sound">Sonido de tictac</Label>
                    <Switch id="ticking-sound" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alarm-sound">Sonido de alarma</Label>
                    <Select defaultValue="bell">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sonido" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bell">Campana</SelectItem>
                        <SelectItem value="digital">Digital</SelectItem>
                        <SelectItem value="kitchen">Cocina</SelectItem>
                        <SelectItem value="bird">Pájaro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alarm-volume">Volumen de alarma</Label>
                    <Input id="alarm-volume" type="range" min="0" max="100" defaultValue="80" className="w-[180px]" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Restaurar valores predeterminados
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacidad y seguridad</CardTitle>
              <CardDescription>Gestiona tus datos y preferencias de privacidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Privacidad</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share-progress">Compartir progreso con amigos</Label>
                    <Switch id="share-progress" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="public-profile">Perfil público</Label>
                    <Switch id="public-profile" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-collection">Permitir recolección de datos anónimos</Label>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Seguridad</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Autenticación de dos factores</Label>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="session-timeout">Tiempo de sesión (minutos)</Label>
                    <Select defaultValue="60">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Minutos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                        <SelectItem value="120">120</SelectItem>
                        <SelectItem value="0">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Datos</h3>
                <div className="grid gap-3">
                  <Button variant="outline">Exportar mis datos</Button>
                  <Button
                    variant="outline"
                    className="text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    Eliminar mi cuenta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  )
}
