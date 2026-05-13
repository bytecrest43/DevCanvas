"use client"

import type { ReactNode } from "react"
import { useState } from "react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { cn } from "@/lib/utils"

interface EditorLayoutProps {
  children: ReactNode
  className?: string
}

export function EditorLayout({ children, className }: EditorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className={cn("min-h-dvh bg-base text-copy-primary", className)}>
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((current) => !current)}
        centerContent="DevCanvas"
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="min-h-dvh pt-14">{children}</main>
    </div>
  )
}
