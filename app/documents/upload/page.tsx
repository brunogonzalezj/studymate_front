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
import { ArrowLeft, FileText, ImageIcon, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DocumentUploadPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadType, setUploadType] = useState("file")
  const [summaryType, setSummaryType] = useState("extended")

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      setIsProcessing(true)
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false)
        router.push("/documents/1")
      }, 2000)
    }, 1500)
  }

  return (
    <AppShell>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <div onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </div>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subir documento</h1>
          <p className="text-muted-foreground">Sube un documento o ingresa texto para generar un resumen</p>
        </div>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Nuevo documento</CardTitle>
          <CardDescription>Sube un archivo, imagen o ingresa texto manualmente</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full" onValueChange={(value) => setUploadType(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="file">
                <FileText className="mr-2 h-4 w-4" />
                Archivo
              </TabsTrigger>
              <TabsTrigger value="image">
                <ImageIcon className="mr-2 h-4 w-4" />
                Imagen
              </TabsTrigger>
              <TabsTrigger value="text">
                <FileText className="mr-2 h-4 w-4" />
                Texto
              </TabsTrigger>
            </TabsList>
            <TabsContent value="file" className="mt-4">
              <div className="grid gap-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="mb-4">
                    <h3 className="font-medium">Arrastra y suelta tu archivo</h3>
                    <p className="text-sm text-muted-foreground">Soporta PDF, DOCX, TXT (máx. 10MB)</p>
                  </div>
                  <Button variant="outline">Seleccionar archivo</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="image" className="mt-4">
              <div className="grid gap-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="mb-4">
                    <h3 className="font-medium">Arrastra y suelta tu imagen</h3>
                    <p className="text-sm text-muted-foreground">Soporta JPG, PNG (máx. 5MB)</p>
                  </div>
                  <Button variant="outline">Seleccionar imagen</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="text" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="text-content">Contenido</Label>
                  <Textarea
                    id="text-content"
                    placeholder="Pega o escribe el texto que deseas resumir..."
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 mt-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Título del documento</Label>
              <Input id="title" placeholder="Ej. Resumen de Cálculo Diferencial" />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                <Input id="topic" placeholder="Ej. Límites y Continuidad" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Tipo de resumen</Label>
              <RadioGroup defaultValue="extended" onValueChange={setSummaryType}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`flex flex-col items-start border rounded-lg p-4 ${summaryType === "extended" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="extended" id="extended" />
                      <Label htmlFor="extended" className="font-medium">
                        Extendido
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Resumen detallado con todos los conceptos importantes
                    </p>
                  </div>
                  <div
                    className={`flex flex-col items-start border rounded-lg p-4 ${summaryType === "short" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short" id="short" />
                      <Label htmlFor="short" className="font-medium">
                        Corto
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Resumen conciso con las ideas clave</p>
                  </div>
                  <div
                    className={`flex flex-col items-start border rounded-lg p-4 ${summaryType === "flashcards" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flashcards" id="flashcards" />
                      <Label htmlFor="flashcards" className="font-medium">
                        Flashcards
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Genera tarjetas de estudio con preguntas y respuestas
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={isUploading || isProcessing}>
            {isUploading ? "Subiendo..." : isProcessing ? "Procesando..." : "Generar resumen"}
          </Button>
        </CardFooter>
      </Card>
    </AppShell>
  )
}
