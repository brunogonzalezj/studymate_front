"use client"

import { useState, useEffect, useRef } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pause, Play, RotateCcw, Settings, Volume2, VolumeX } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type PomodoroMode = "work" | "shortBreak" | "longBreak"

export default function PomodoroPage() {
  const [mode, setMode] = useState<PomodoroMode>("work")
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [cycles, setCycles] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedTask, setSelectedTask] = useState("matematicas")

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const durations = {
    work: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  }

  // Mock data
  const tasks = [
    { id: "matematicas", name: "Matemáticas: Límites y Continuidad" },
    { id: "fisica", name: "Física: Leyes de Newton" },
    { id: "programacion", name: "Programación: Estructuras de Datos" },
  ]

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setTimeLeft(durations[mode])
  }, [mode])

  const startTimer = () => {
    setIsRunning(true)
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleTimerComplete()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const resetTimer = () => {
    pauseTimer()
    setTimeLeft(durations[mode])
  }

  const handleTimerComplete = () => {
    pauseTimer()

    // Play sound if enabled
    if (soundEnabled) {
      // Play sound logic would go here
    }

    // Switch modes
    if (mode === "work") {
      const newCycles = cycles + 1
      setCycles(newCycles)

      if (newCycles % 4 === 0) {
        setMode("longBreak")
      } else {
        setMode("shortBreak")
      }
    } else {
      setMode("work")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (timeLeft / durations[mode]) * 100

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] md:h-[calc(100vh-3.5rem)]">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <Tabs
              defaultValue="work"
              value={mode}
              onValueChange={(value) => setMode(value as PomodoroMode)}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="work" disabled={isRunning}>
                    Trabajo
                  </TabsTrigger>
                  <TabsTrigger value="shortBreak" disabled={isRunning}>
                    Descanso corto
                  </TabsTrigger>
                  <TabsTrigger value="longBreak" disabled={isRunning}>
                    Descanso largo
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setSoundEnabled(!soundEnabled)}>
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isRunning}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Configuración de Pomodoro</SheetTitle>
                        <SheetDescription>Personaliza tus tiempos de trabajo y descanso</SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="work-time">Tiempo de trabajo (min)</Label>
                          <Select defaultValue="25">
                            <SelectTrigger id="work-time">
                              <SelectValue />
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
                        <div className="grid gap-2">
                          <Label htmlFor="short-break">Descanso corto (min)</Label>
                          <Select defaultValue="5">
                            <SelectTrigger id="short-break">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="long-break">Descanso largo (min)</Label>
                          <Select defaultValue="15">
                            <SelectTrigger id="long-break">
                              <SelectValue />
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
                          <Label htmlFor="auto-start">Iniciar automáticamente</Label>
                          <Switch id="auto-start" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notifications">Notificaciones</Label>
                          <Switch id="notifications" defaultChecked />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <TabsContent value="work" className="mt-0">
                <div className="flex flex-col items-center">
                  <div className="text-7xl font-bold my-8 tabular-nums">{formatTime(timeLeft)}</div>
                  <Progress value={progress} className="h-2 w-full mb-8" />

                  <div className="w-full mb-6">
                    <Label htmlFor="task" className="mb-2 block">
                      Tarea actual
                    </Label>
                    <Select value={selectedTask} onValueChange={setSelectedTask} disabled={isRunning}>
                      <SelectTrigger id="task">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tasks.map((task) => (
                          <SelectItem key={task.id} value={task.id}>
                            {task.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    {!isRunning ? (
                      <Button onClick={startTimer} size="lg">
                        <Play className="mr-2 h-4 w-4" />
                        Iniciar
                      </Button>
                    ) : (
                      <Button onClick={pauseTimer} size="lg" variant="secondary">
                        <Pause className="mr-2 h-4 w-4" />
                        Pausar
                      </Button>
                    )}
                    <Button onClick={resetTimer} size="lg" variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reiniciar
                    </Button>
                  </div>

                  <div className="mt-6 text-sm text-muted-foreground">Ciclos completados: {cycles}</div>
                </div>
              </TabsContent>

              <TabsContent value="shortBreak" className="mt-0">
                <div className="flex flex-col items-center">
                  <div className="text-7xl font-bold my-8 tabular-nums">{formatTime(timeLeft)}</div>
                  <Progress value={progress} className="h-2 w-full mb-8" />

                  <div className="text-center mb-6">
                    <p className="text-muted-foreground">Tómate un breve descanso. Estira, respira, hidratate.</p>
                  </div>

                  <div className="flex gap-4">
                    {!isRunning ? (
                      <Button onClick={startTimer} size="lg">
                        <Play className="mr-2 h-4 w-4" />
                        Iniciar
                      </Button>
                    ) : (
                      <Button onClick={pauseTimer} size="lg" variant="secondary">
                        <Pause className="mr-2 h-4 w-4" />
                        Pausar
                      </Button>
                    )}
                    <Button onClick={resetTimer} size="lg" variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="longBreak" className="mt-0">
                <div className="flex flex-col items-center">
                  <div className="text-7xl font-bold my-8 tabular-nums">{formatTime(timeLeft)}</div>
                  <Progress value={progress} className="h-2 w-full mb-8" />

                  <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                      ¡Buen trabajo! Tómate un descanso largo. Camina un poco o come algo.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    {!isRunning ? (
                      <Button onClick={startTimer} size="lg">
                        <Play className="mr-2 h-4 w-4" />
                        Iniciar
                      </Button>
                    ) : (
                      <Button onClick={pauseTimer} size="lg" variant="secondary">
                        <Pause className="mr-2 h-4 w-4" />
                        Pausar
                      </Button>
                    )}
                    <Button onClick={resetTimer} size="lg" variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
