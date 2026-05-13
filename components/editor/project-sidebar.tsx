"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose?: () => void
  className?: string
}

function EmptyProjectState({ label }: { label: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-surface-border bg-elevated/60 px-6 text-center">
      <p className="text-sm font-medium text-copy-primary">{label}</p>
      <p className="mt-2 max-w-48 text-sm leading-6 text-copy-muted">
        Projects will appear here when they are available.
      </p>
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  className,
}: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={cn(
        "fixed bottom-4 left-4 top-16 z-40 flex w-[min(22rem,calc(100vw-2rem))] flex-col rounded-2xl border border-surface-border bg-surface/90 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-surface-border pb-4">
        <h2 className="text-base font-semibold text-copy-primary">Projects</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close project sidebar"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="min-h-0 flex-1 pt-4">
        <TabsList className="grid w-full grid-cols-2 bg-elevated">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>

        <TabsContent value="my-projects" className="mt-4">
          <EmptyProjectState label="No projects yet" />
        </TabsContent>
        <TabsContent value="shared" className="mt-4">
          <EmptyProjectState label="No shared projects" />
        </TabsContent>
      </Tabs>

      <Button type="button" className="mt-4 w-full">
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </aside>
  )
}
