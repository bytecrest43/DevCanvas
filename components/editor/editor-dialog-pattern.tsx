import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function EditorDialogPanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid gap-5 rounded-3xl border border-surface-border bg-elevated p-6 text-copy-primary shadow-2xl",
        className
      )}
      {...props}
    />
  )
}

function EditorDialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("grid gap-2 text-left", className)} {...props} />
  )
}

function EditorDialogTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-7 text-copy-primary", className)}
      {...props}
    />
  )
}

function EditorDialogDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm leading-6 text-copy-secondary", className)}
      {...props}
    />
  )
}

function EditorDialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-surface-border pt-5 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

export {
  EditorDialogDescription,
  EditorDialogFooter,
  EditorDialogHeader,
  EditorDialogPanel,
  EditorDialogTitle,
}
