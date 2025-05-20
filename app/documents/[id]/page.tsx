"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Copy, Download, Edit, FileText, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function DocumentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("summary")

  // Mock data
  const document = {
    id: params.id,
    title: "Resumen de Cálculo Diferencial",
    subject: "Matemáticas",
    topic: "Límites y Continuidad",
    date: "10 Abr 2023",
    type: "extended",
    content: `
      <h2>Introducción a los Límites</h2>
      <p>El concepto de límite es fundamental en el cálculo diferencial. Un límite describe el comportamiento de una función cuando su variable independiente se acerca a un valor específico.</p>
      
      <h3>Definición formal</h3>
      <p>Sea f una función definida en un intervalo abierto que contiene a a, excepto posiblemente en a mismo. El límite de f(x) cuando x tiende a a es L, y se escribe:</p>
      <p class="formula">lim f(x) = L</p>
      <p class="formula">x→a</p>
      
      <p>Si para todo ε > 0, existe un δ > 0 tal que si 0 < |x - a| < δ, entonces |f(x) - L| < ε.</p>
      
      <h3>Propiedades de los límites</h3>
      <ul>
        <li>Límite de una suma: lim[f(x) + g(x)] = lim f(x) + lim g(x)</li>
        <li>Límite de un producto: lim[f(x) · g(x)] = lim f(x) · lim g(x)</li>
        <li>Límite de un cociente: lim[f(x)/g(x)] = lim f(x) / lim g(x), siempre que lim g(x) ≠ 0</li>
      </ul>
      
      <h2>Continuidad de Funciones</h2>
      <p>Una función f es continua en un punto a si se cumplen las siguientes condiciones:</p>
      <ol>
        <li>f(a) está definida</li>
        <li>lim f(x) existe cuando x→a</li>
        <li>lim f(x) = f(a) cuando x→a</li>
      </ol>
      
      <p>Una función es continua en un intervalo si es continua en cada punto del intervalo.</p>
      
      <h3>Tipos de discontinuidades</h3>
      <ul>
        <li><strong>Discontinuidad evitable:</strong> El límite existe pero no coincide con el valor de la función, o la función no está definida en ese punto.</li>
        <li><strong>Discontinuidad de salto:</strong> Los límites laterales existen pero son diferentes.</li>
        <li><strong>Discontinuidad infinita:</strong> Al menos uno de los límites laterales es infinito.</li>
      </ul>
    `,
    flashcards: [
      {
        question: "¿Qué es un límite en cálculo?",
        answer:
          "Un límite describe el comportamiento de una función cuando su variable independiente se acerca a un valor específico.",
      },
      {
        question: "¿Cuáles son las condiciones para que una función sea continua en un punto?",
        answer: "1) f(a) está definida, 2) lim f(x) existe cuando x→a, 3) lim f(x) = f(a) cuando x→a",
      },
      {
        question: "Menciona los tipos de discontinuidades",
        answer: "Discontinuidad evitable, discontinuidad de salto y discontinuidad infinita.",
      },
      { question: "¿Cuál es la propiedad del límite de una suma?", answer: "lim[f(x) + g(x)] = lim f(x) + lim g(x)" },
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
            <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {document.subject}
              </Badge>
              <span>•</span>
              <span className="text-sm">{document.topic}</span>
              <span>•</span>
              <span className="text-sm">{document.date}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="summary">
            <FileText className="mr-2 h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <BookOpen className="mr-2 h-4 w-4" />
            Flashcards
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-end mb-4">
                <Button variant="ghost" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar texto
                </Button>
              </div>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: document.content }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flashcards" className="mt-4">
          <div className="grid gap-4">
            {document.flashcards.map((card, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="font-medium mb-2">Pregunta:</h3>
                    <p>{card.question}</p>
                  </div>
                  <Separator />
                  <div className="p-6">
                    <h3 className="font-medium mb-2">Respuesta:</h3>
                    <p>{card.answer}</p>
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
