"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, FileText, Calendar, Clock, Settings, Menu, User, LogOut, Moon, Sun } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Image from "next/image";

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [usuario, setUsuario] = useState<{ nombre: string; correo: string } | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Materias",
      path: "/subjects",
      icon: BookOpen,
    },
    {
      name: "Documentos",
      path: "/documents",
      icon: FileText,
    },
    {
      name: "Plan de Estudio",
      path: "/study-plan",
      icon: Calendar,
    },
    {
      name: "Pomodoro",
      path: "/pomodoro",
      icon: Clock,
    },
    {
      name: "Configuración",
      path: "/settings",
      icon: Settings,
    },
  ]

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    setUsuario(usuario)
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 justify-between">
          <div className="flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] pr-0">
                <div className="flex flex-col h-full">
                  <div className="px-2 py-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image src={"/logo_studymate.jpeg"} alt={"Logo StudyMate"} width={32} height={32} className="rounded-xl" />
                        <span className="hidden md:inline">StudyMate</span>
                    </Link>
                  </div>
                  <nav className="flex-1 overflow-auto">
                    <div className="grid gap-1 px-2">
                      {routes.map((route) => (
                        <Button
                          key={route.path}
                          variant={pathname === route.path ? "secondary" : "ghost"}
                          className="justify-start"
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={route.path}>
                            <route.icon className="mr-2 h-4 w-4" />
                            {route.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </nav>
                  <div className="border-t p-4 ">
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{usuario?.nombre}</div>
                        <div className="text-xs text-muted-foreground">{usuario?.correo}</div>
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <Button variant="ghost" className="justify-start" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/profile">
                          <User className="mr-2 h-4 w-4" />
                          Perfil
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => isMounted && setTheme(theme === "dark" ? "light" : "dark")}
                      >
                        {isMounted && theme === "dark" ? (
                          <>
                            <Sun className="mr-2 h-4 w-4" />
                            Modo claro
                          </>
                        ) : (
                          <>
                            <Moon className="mr-2 h-4 w-4" />
                            Modo oscuro
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/login">
                          <LogOut className="mr-2 h-4 w-4" />
                          Cerrar sesión
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold ml-2 md:ml-0">
              <Image src={"/logo_studymate.jpeg"} alt={"Logo StudyMate"} width={44} height={32} className="rounded-xl" />
                <span className="hidden md:inline">StudyMate</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => isMounted && setTheme(theme === "dark" ? "light" : "dark")}
            >
              {isMounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden md:block w-[240px] h-screen overflow-y-auto fixed border-r bg-background">
          <div className="flex flex-col gap-1 p-4">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={pathname === route.path ? "secondary" : "ghost"}
                className="justify-start"
                asChild
              >
                <Link href={route.path}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.name}
                </Link>
              </Button>
            ))}
          </div>
          <div className="mt-auto border-t p-4">
            <div className="flex items-center gap-2 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{usuario?.nombre}</div>
                <div className="text-xs text-muted-foreground">{usuario?.correo}</div>
              </div>
            </div>
            <div className="grid gap-1">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                asChild
              >
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Link>
              </Button>
            </div>
          </div>
        </aside>
        <main className={cn("flex-1 ml-0 md:ml-[240px]", pathname === "/pomodoro" ? "overflow-hidden" : "p-4 md:p-6")}>
          {children}
        </main>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10">
        <nav className="flex justify-around p-2">
          {routes.slice(0, 5).map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md",
                pathname === route.path ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{route.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
