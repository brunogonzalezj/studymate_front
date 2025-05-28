"use client"

import {useEffect, useState} from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Copy, Download, Edit, FileText, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Documento {
  id: number;
    titulo: string;
  materia: string;
    tema: string;
    fechaSubida: number;
}

interface Summary {
    id: number;
    contenido: string;
}

export default function DocumentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("summary")
  const [summary, setSummary] = useState<Summary | null>(null)
  const [documentApi, setDocumentApi] = useState<Documento | null>(null)
    const [flashcards, setFlashcards] = useState<{ pregunta: string; respuesta: string }[]>([])

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/documents/${params.id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el documento');
        }
        const data = await response.json();
        setDocumentApi(data);
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error (mostrar mensaje, etc.)
      }
    };

    fetchDocument();
  }, []);

  useEffect(()=> {
    const fetchSummary = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/documents/resumen/${params.id}/`);
            if (!response.ok) {
            throw new Error('Error al cargar el resumen');
            }
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error('Error:', error);
            // Manejar el error (mostrar mensaje, etc.)
        }
    }
    fetchSummary();
  }, [])

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/documents/flashcards/${params.id}`);
        if (!response.ok) {
          throw new Error('Error al cargar las flashcards');
        }
        const data = await response.json();
        setFlashcards(data || []);
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error (mostrar mensaje, etc.)

      }
    }
    fetchFlashcards();
  }, []);

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
            <h1 className="text-2xl font-bold tracking-tight">{documentApi?.titulo || 'Titulo no disponible'}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {documentApi?.materia || 'Materia no disponible'}
              </Badge>
              <span>•</span>
              <span className="text-sm">{documentApi?.tema || "Tema no disponible" }</span>
              <span>•</span>
              <span className="text-sm">{new Date(documentApi?.fechaSubida).toLocaleDateString()}</span>
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
                dangerouslySetInnerHTML={{ __html: summary?.contenido || "No se encontró resumen" }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flashcards" className="mt-4">
          <div className="grid gap-4">
            {flashcards.map((card, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="font-medium mb-2">Pregunta:</h3>
                    <p>{card?.pregunta}</p>
                  </div>
                  <Separator />
                  <div className="p-6">
                    <h3 className="font-medium mb-2">Respuesta:</h3>
                    <p>{card?.respuesta}</p>
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
