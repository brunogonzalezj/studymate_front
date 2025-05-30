"use client"

import {useEffect, useState} from "react"
import {AppShell} from "@/components/app-shell"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {FileText, Plus, Search, Filter, BookOpen} from "lucide-react"
import Link from "next/link"
import {Badge} from "@/components/ui/badge"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

interface Documents {
    titulo: string;
    materia: string;
    tema: string;
    fechaSubida: number;
}

export default function DocumentsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [documentsApi, setDocumentsApi] = useState<Documents[] | null>(null)

    useEffect(() => {
        const fetchDocuments = async () => {
            const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
            if (!usuario.estudiante.id) {
                console.error("Usuario no encontrado o no tiene ID de estudiante");
                return;
            }
            try {
                const response = await fetch(`http://localhost:3000/api/documents/documentos-usuario/${usuario.estudiante.id}`);

                if (!response.ok) {
                    throw new Error("Error al cargar los documentos");
                }
                const data = await response.json();
                setDocumentsApi(data);
                console.log(data)
            } catch (error) {
                console.error("Error:", error);
                // Manejar el error (mostrar mensaje, etc.)
            }
        }
        fetchDocuments();
    }, []);

    // Mock data
    const documents = [
        {
            id: 1,
            title: "Resumen de Cálculo Diferencial",
            subject: "Matemáticas",
            topic: "Límites y Continuidad",
            date: "10 Abr 2023",
            type: "extended",
        },
        {
            id: 2,
            title: "Flashcards de Límites",
            subject: "Matemáticas",
            topic: "Límites y Continuidad",
            date: "8 Abr 2023",
            type: "flashcards",
        },
        {
            id: 3,
            title: "Apuntes de Termodinámica",
            subject: "Física",
            topic: "Termodinámica",
            date: "5 Abr 2023",
            type: "extended",
        },
        {
            id: 4,
            title: "Resumen de Estructuras de Datos",
            subject: "Programación",
            topic: "Estructuras de Datos",
            date: "2 Abr 2023",
            type: "short",
        },
        {
            id: 5,
            title: "Flashcards de Algoritmos",
            subject: "Programación",
            topic: "Algoritmos",
            date: "1 Abr 2023",
            type: "flashcards",
        },
    ]

    const recentDocuments = documentsApi?.slice(0, 3)

    return (
        <AppShell>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
                    <p className="text-muted-foreground">Gestiona tus documentos y resúmenes</p>
                </div>
                <Button asChild>
                    <Link href="/documents/upload">
                        <Plus className="mr-2 h-4 w-4"/>
                        Nuevo documento
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                    <Input
                        placeholder="Buscar documentos..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por materia"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las materias</SelectItem>
                            <SelectItem value="matematicas">Matemáticas</SelectItem>
                            <SelectItem value="fisica">Física</SelectItem>
                            <SelectItem value="programacion">Programación</SelectItem>
                            <SelectItem value="economia">Economía</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4"/>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="recent">Recientes</TabsTrigger>
                    <TabsTrigger value="by-subject">Por materia</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <div className="grid gap-4">
                        {recentDocuments && recentDocuments?.length > 0 ? (
                            recentDocuments?.map((doc) => <DocumentCard key={doc.titulo} document={doc}/>)
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50"/>
                                <h3 className="mt-4 text-lg font-semibold">No se encontraron documentos</h3>
                                <p className="text-muted-foreground">
                                    {searchQuery
                                        ? "No hay documentos que coincidan con tu búsqueda"
                                        : "Aún no has creado ningún documento"}
                                </p>
                                <Button className="mt-4" asChild>
                                    <Link href="/documents/upload">Crear nuevo documento</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="recent">
                    <div className="grid gap-4">
                        {recentDocuments?.map((doc) => (
                            <DocumentCard key={doc.titulo} document={doc}/>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="by-subject">
                    <div className="space-y-8">

                    </div>
                </TabsContent>
            </Tabs>
        </AppShell>
    )
}

function DocumentCard({ document }: { document: Documents }) {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="p-4 md:p-6 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5 text-muted-foreground"/>
                            <Badge variant="outline" className="text-xs">
                                {document.materia}
                            </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{document.titulo}</h3>
                        <div className="text-sm text-muted-foreground">
                            {document.tema} • {new Date(document.fechaSubida).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 md:pr-6 md:pl-0 border-t md:border-t-0 md:border-l">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/documents/${document.titulo}`}>Ver</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
