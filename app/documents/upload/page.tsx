"use client"

import {useEffect, useState} from "react"
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

interface UserProps {
  id: number;
  nombre: string;
  correo: string;
  estudiante: {
    id: number;
  }
}

export default function DocumentUploadPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadType, setUploadType] = useState("file")
  const [summaryType, setSummaryType] = useState("EXTENDIDO")
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [textContent, setTextContent] = useState("")
  const [estudianteId, setEstudianteId] = useState<UserProps | null>(null)

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    setEstudianteId(usuario?.estudiante.id)
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!title) {
        alert("Por favor, ingresa un título para el documento");
        return;
      }

      if (uploadType === "file") {
        if (!file || file.type !== "application/pdf") {
          alert("Por favor, selecciona un archivo PDF válido");
          return;
        }
      } else if (uploadType === "text") {
        if (!textContent) {
          alert("Por favor, ingresa texto para procesar");
          return;
        }
      } else if (uploadType === "image") {
        if (!file || !file.type.startsWith("image/")) {
          alert("Por favor, selecciona una imagen válida");
          return;
        }
      }

      setIsUploading(true);

      // Crear un FormData para enviar el archivo
      const formData = new FormData();

      if (uploadType === "file" && file) {
        formData.append("archivo", file);
        formData.append("titulo", title);
        formData.append("materia", subject);
        formData.append("tema", topic);
        // @ts-ignore
        formData.append("estudianteId", estudianteId);
      }

      // Paso 1: Subir el documento PDF
      let documentId;

      try {
        const uploadResponse = await fetch('http://localhost:3000/api/documents/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Error al subir el documento');
        }

        const documentoSubido = await uploadResponse.json();
        documentId = documentoSubido.id;

        setIsUploading(false);
        setIsProcessing(true);

      } catch (error) {
        setIsUploading(false);
        console.error("Error al subir el documento:", error);
        alert("Error al subir el documento");
        return;
      }

      // Paso 2: Generar el resumen con el tipo seleccionado
      try {
        const resumenResponse = await fetch('http://localhost:3000/api/documents/generate-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: documentId,
            tipo: summaryType
          }),
        });

        if (!resumenResponse.ok) {
          throw new Error('Error al generar el resumen');
        }

        await resumenResponse.json();

      } catch (error) {
        console.error("Error al generar el resumen:", error);
        // Continuamos aunque falle la generación del resumen
      } finally {
        setIsProcessing(false);
      }

      // Redirigir al usuario a la página del documento creado
      router.push(`/documents/${documentId}`);

    } catch (error) {
      setIsUploading(false);
      setIsProcessing(false);
      console.error("Error al procesar el documento:", error);
      alert("Ocurrió un error al procesar el documento");
    }
  };

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
            <CardDescription>Sube un archivo porfavor.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="file" className="w-full" onValueChange={(value) => setUploadType(value)}>
              <TabsList className="flex-col items-center justify-between space-y-2 md:space-y-0 md:flex-row">
                <TabsTrigger value="file">
                  <FileText className="mr-2 h-4 w-4 justify-center items-center" />
                  Archivo
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
                    <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                      Seleccionar archivo
                    </Button>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.txt"
                    />
                    {file && (
                        <p className="text-sm mt-2">
                          Archivo seleccionado: {file.name}
                        </p>
                    )}
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
                    <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                      Seleccionar imagen
                    </Button>
                    <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {file && file.type.startsWith("image/") && (
                        <p className="text-sm mt-2">
                          Imagen seleccionada: {file.name}
                        </p>
                    )}
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
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid gap-4 mt-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Título del documento</Label>
                <Input
                    id="title"
                    placeholder="Ej. Resumen de Cálculo Diferencial"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Materia</Label>
                  <Select onValueChange={(value) => setSubject(value)}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Selecciona una materia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Matematicas">Matemáticas</SelectItem>
                      <SelectItem value="Fisica">Física</SelectItem>
                      <SelectItem value="Quimica">Química</SelectItem>
                      <SelectItem value="Programacion">Programación</SelectItem>
                      <SelectItem value="Economia">Economía</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Tema</Label>
                  <Input
                      id="topic"
                      placeholder="Ej. Límites y Continuidad"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Tipo de resumen</Label>
                <RadioGroup defaultValue="EXTENDIDO" onValueChange={setSummaryType}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        className={`flex flex-col items-start border rounded-lg p-4 ${summaryType === "EXTENDIDO" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="EXTENDIDO" id="extended" />
                        <Label htmlFor="extended" className="font-medium">
                          Extendido
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Resumen detallado con todos los conceptos importantes
                      </p>
                    </div>
                    <div
                        className={`flex flex-col items-start border rounded-lg p-4 ${summaryType === "CORTO" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="CORTO" id="short" />
                        <Label htmlFor="short" className="font-medium">
                          Corto
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Resumen conciso con las ideas clave</p>
                    </div>
                    <div
                        className={`flex flex-col items-start border rounded-lg p-4 ${summaryType === "FLASHCARDS" ? "border-primary bg-primary/5" : ""}`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FLASHCARDS" id="flashcards" />
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