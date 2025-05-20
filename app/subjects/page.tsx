import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function SubjectsPage() {
  // Mock data
  const subjects = [
    {
      id: 1,
      name: "Matemáticas",
      description: "Cálculo diferencial e integral",
      progress: 65,
      documents: 5,
      topics: [
        { id: 1, name: "Límites y Continuidad", progress: 80 },
        { id: 2, name: "Derivadas", progress: 60 },
        { id: 3, name: "Aplicaciones de Derivadas", progress: 40 },
      ],
    },
    {
      id: 2,
      name: "Física",
      description: "Mecánica y termodinámica",
      progress: 40,
      documents: 3,
      topics: [
        { id: 1, name: "Leyes de Newton", progress: 70 },
        { id: 2, name: "Trabajo y Energía", progress: 50 },
        { id: 3, name: "Termodinámica", progress: 20 },
      ],
    },
    {
      id: 3,
      name: "Programación",
      description: "Algoritmos y estructuras de datos",
      progress: 80,
      documents: 7,
      topics: [
        { id: 1, name: "Algoritmos Básicos", progress: 100 },
        { id: 2, name: "Estructuras de Datos", progress: 75 },
        { id: 3, name: "Algoritmos Avanzados", progress: 60 },
      ],
    },
    {
      id: 4,
      name: "Economía",
      description: "Microeconomía y macroeconomía",
      progress: 25,
      documents: 2,
      topics: [
        { id: 1, name: "Oferta y Demanda", progress: 40 },
        { id: 2, name: "Mercados", progress: 20 },
        { id: 3, name: "Indicadores Económicos", progress: 10 },
      ],
    },
  ]

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Materias</h1>
          <p className="text-muted-foreground">Gestiona tus materias y temas de estudio</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva materia
        </Button>
      </div>

      <div className="grid gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{subject.name}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">{subject.progress}%</div>
                    <div className="text-xs text-muted-foreground">Progreso</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">{subject.documents}</div>
                    <div className="text-xs text-muted-foreground">Documentos</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subject.topics.map((topic) => (
                  <div key={topic.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{topic.name}</div>
                      <div className="text-sm text-muted-foreground">{topic.progress}%</div>
                    </div>
                    <Progress value={topic.progress} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/subjects/${subject.id}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Ver temas
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/documents?subject=${subject.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Ver documentos
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}
