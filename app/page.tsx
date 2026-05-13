import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-base text-copy-primary">
      <section className="relative flex min-h-dvh items-center justify-center px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--accent-glow),transparent_34%),radial-gradient(circle_at_15%_80%,color-mix(in_oklch,var(--accent-ai)_16%,transparent),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--border-default)_1px,transparent_1px),linear-gradient(90deg,var(--border-default)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

        <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
          <Image
            src="/devlogo.png"
            alt="DevCanvas"
            width={64}
            height={64}
            className="mb-8 h-16 w-16 rounded-2xl"
          />
          <h1 className="text-5xl font-semibold leading-tight text-copy-primary sm:text-6xl">
            DevCanvas
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-copy-secondary">
            Turn rough system ideas into collaborative architecture canvases and
            implementation-ready technical specs.
          </p>
          <Button asChild size="lg" className="mt-9">
            <Link href="/editor">Open Editor</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
