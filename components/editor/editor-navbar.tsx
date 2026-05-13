"use client"

import type { ReactNode } from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
  centerContent?: ReactNode
  rightContent?: ReactNode
  className?: string
}

export function EditorNavbar({
  isSidebarOpen,
  onSidebarToggle,
  centerContent,
  rightContent,
  className,
}: EditorNavbarProps) {
  const SidebarIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center border-b border-surface-border bg-surface/95 px-4 backdrop-blur",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 items-center justify-start">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isSidebarOpen ? "Close project sidebar" : "Open project sidebar"}
          aria-pressed={isSidebarOpen}
          onClick={onSidebarToggle}
        >
          <SidebarIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center text-sm font-medium text-copy-secondary">
        {centerContent}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end">
        {rightContent}
      </div>
    </header>
  )
}
