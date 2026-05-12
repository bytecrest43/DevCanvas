<p align="center">
  <img src="/public/devlogo.png" alt="DevCanvas" width="180" />
</p>

<h1 align="center">DevCanvas</h1>

<p align="center">
  A real-time collaborative workspace for designing software systems — describe your architecture in plain English, and watch it come to life on a shared canvas.
</p>

---

## What is DevCanvas?

DevCanvas turns natural language into system architecture diagrams. A team describes what they want to build, an AI agent maps that description onto a live collaborative canvas, and collaborators refine the result together in real time. When the design is ready, the app generates a persistent Markdown technical specification from the canvas graph.

**Core loop:**

```
Describe system → AI generates nodes/edges → Collaborators refine → Export Markdown spec
```

### Core User Flow

1. User signs in with Clerk
2. Creates or selects an existing project
3. Enters the project workspace
4. Optionally imports a prebuilt starter system design into the canvas
5. Prompts the AI to generate or extend the system design
6. AI generates nodes and edges in the shared Liveblocks canvas
7. Collaborators edit and refine the design in real time
8. Triggers spec generation to convert the graph into Markdown
9. App persists the generated spec to Vercel Blob
10. User reviews, downloads, or shares the technical specification

---

## Features

### Authentication & Projects

- User sign-in and route protection via Clerk
- Project creation with single owner and collaborator support
- Project workspace navigation and access control

### Collaborative Canvas

- Shared real-time canvas powered by Liveblocks and React Flow
- Live cursors, presence indicators, and simultaneous node/edge editing
- Canvas snapshots persisted to Vercel Blob

### Starter System Designs

- Curated library of prebuilt system design templates
- Import templates on project creation or anytime during editing
- Covers common patterns: monolith, microservices, event-driven, serverless, and more
- Templates are static snapshots loaded directly into the active room

### AI Architecture Generation

- Generate system designs from natural language prompts
- AI outputs structured as canvas nodes and edges
- Runs as a durable background task via Trigger.dev
- Execution context includes project info and current canvas state

### Spec Generation

- Convert current canvas graph into Markdown technical specifications
- Specs persisted to Vercel Blob with database references
- Users can view and download generated specs

### Project Management

- Create and manage multiple projects
- Single owner per project with collaborator support
- Only owner or collaborator can mutate resources
- Persistent metadata and access control

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 16 + TypeScript | Full-stack app with server/client boundaries |
| UI | Tailwind CSS + shadcn/ui | Component composition and styling |
| Auth | Clerk | User identity and route protection |
| Database | Prisma + PostgreSQL | Project metadata, collaborators, specs, task records |
| Canvas | Liveblocks + React Flow | Real-time shared canvas, presence, cursors |
| Background Tasks | Trigger.dev | Durable AI generation workflows |
| Artifact Storage | Vercel Blob | Canvas snapshots and generated Markdown specs |

---

## Architecture Overview

### System Boundaries

```
app/api/        → Authenticated request handlers (validation, ownership, task triggering)
trigger/        → Long-running background jobs (AI generation, spec generation)
lib/            → Shared infrastructure (Prisma client, access control, utilities)
components/     → UI composition (canvas, sidebars, dialogs)
prisma/         → Database schema and generated client
data/           → Legacy local directory (not used for new artifacts)
```

### Storage Model

| What | Where | Purpose |
|---|---|---|
| Project metadata, ownership, relationships | PostgreSQL via Prisma | First-class relational data |
| Canvas snapshots (`canvas/{projectId}.json`) | Vercel Blob | User-created canvas state |
| Generated specs (`specs/{projectId}/{specId}.md`) | Vercel Blob | Generated artifacts |
| Blob URL references | PostgreSQL (`canvasJsonPath`, `filePath`) | Durable references to artifacts |
| Task run records | PostgreSQL | Background job state tracking |

> **Key Principle:** Large generated content lives in Vercel Blob; database stores only the reference URL. Metadata and relationships remain in PostgreSQL.

### AI Generation Flows

#### Design Generation

1. User submits natural language prompt in editor
2. API route validates input and membership
3. Trigger.dev background task begins execution
4. Task calls AI with prompt + project context + current canvas state
5. AI generates structured node/edge updates
6. Updates written directly to shared Liveblocks room
7. All collaborators see changes in real time

#### Spec Generation

1. User triggers spec generation from completed design
2. API route captures current canvas graph
3. Trigger.dev background task begins execution
4. Task calls AI with canvas + project context
5. AI generates Markdown technical specification
6. Spec saved to Vercel Blob at `specs/{projectId}/{specId}.md`
7. Database record created with blob URL reference
8. User can view and download spec from project

> **Invariant:** Request handlers never run long-lived AI work. All AI generation belongs in background tasks.

### Auth & Access Control

- **Ownership:** Single owner per project (Clerk user ID)
- **Collaboration:** Projects can include additional named collaborators
- **Permissions:** Only owner or collaborator can read or mutate resources
- **Room Access:** Liveblocks room tokens issued only after verified membership
- **Enforcement:** Auth and ownership checks at every mutation boundary

### Starter System Designs

- **Storage:** Prebuilt templates stored as static canvas snapshots in the codebase
- **Import:** Loaded into Liveblocks room when user imports template
- **Timing:** Can import at project creation or anytime during editing
- **Schema:** Templates use identical node/edge schema as user-created content
- **Database:** No separate record; resolved by template ID at import time

---

## Canvas Design System

DevCanvas uses a **dark-only** theme — no light mode. The workspace is a technical environment with a layered, high-contrast visual language.

### Theme Foundation

All colors are defined as CSS custom properties in `globals.css` and mapped to Tailwind tokens. **Never use raw Tailwind color classes or hardcoded hex values** — always reference tokens through their CSS variables.

### Color Palette

| Role | CSS Variable | OKLch / Hex Value |
|---|---|---|
| Page background | `--bg-base` | `#020509` (deep void) |
| Surface | `--bg-surface-mid` | `oklch(10% 0.020 222)` |
| Elevated surface | `--bg-elevated-mid` | `oklch(14% 0.024 222)` |
| Subtle surface | `--bg-subtle-mid` | `oklch(18% 0.028 222)` |
| Default border | `--border-default` | `oklch(22% 0.032 222)` |
| Subtle border | `--border-subtle` | `oklch(28% 0.036 222)` |
| Primary text | `--text-primary` | `oklch(97% 0.006 210)` |
| Secondary text | `--text-secondary` | `oklch(74% 0.044 210)` |
| Muted text | `--text-muted` | `oklch(44% 0.040 215)` |
| Faint text | `--text-faint` | `oklch(24% 0.028 215)` |
| Brand accent | `--accent-primary` | `oklch(88% 0.18 192)` (neon cyan) |
| AI accent | `--accent-ai` | `oklch(62% 0.22 278)` (deep violet) |
| Error | `--state-error` | `oklch(62% 0.230 25)` (red) |
| Success | `--state-success` | `oklch(76% 0.168 160)` (green) |
| Warning | `--state-warning` | `oklch(78% 0.165 75)` (yellow) |

**Tailwind Utility Names:** Use mapped utilities like `bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.

### Typography

| Role | Font | CSS Variable |
|---|---|---|
| UI text | Geist Sans | `--font-geist-sans` |
| Code / mono | Geist Mono | `--font-geist-mono` |

Both fonts loaded via `next/font/google` and applied as CSS variables on `<html>`. Base `body` uses Geist Sans with `antialiased`.

### Border Radius Scale

Radius increases with surface depth — smaller for inner elements, larger for outer containers.

| Context | Class |
|---|---|
| Inline / small UI | `rounded-xl` |
| Cards / panels | `rounded-2xl` |
| Modals / overlays | `rounded-3xl` |

### Canvas Components

#### Node Color Palette

8 defined color pairs. Each specifies a dark node fill and vivid contrasting text tuned for readability on the dark canvas.

| Node Fill | Text Color | Character |
|---|---|---|
| `#1F1F1F` | `#EDEDED` | Neutral dark (default) |
| `#10233D` | `#52A8FF` | Blue |
| `#2E1938` | `#BF7AF0` | Purple |
| `#331B00` | `#FF990A` | Orange |
| `#3C1618` | `#FF6166` | Red |
| `#3A1726` | `#F75F8F` | Pink |
| `#0F2E18` | `#62C073` | Green |
| `#062822` | `#0AC7B4` | Teal |

#### Node Shapes

6 supported shapes, defined in `types/canvas.ts` as `NODE_SHAPES`. Complex shapes rendered as inline SVGs.

- `rectangle` — default general-purpose node
- `diamond` — decision / gateway
- `circle` — event / endpoint
- `pill` — service / process
- `cylinder` — database / storage
- `hexagon` — external system / boundary

#### Edge Styling

- Path: Smooth-step with arrow marker
- Color: `#f8fafc` (default)
- Stroke width: Thin — visually secondary to nodes

#### Connection Handles

- Appearance: Small white circular handles
- Visibility: Hidden by default, revealed on node hover
- Position: All four sides of each node

#### Canvas Background

React Flow `<Background>` component. Canvas sits on the base background color.

### Component Library

shadcn/ui on top of Tailwind. No custom design system. Components live in `components/ui/`. Use the `shadcn` CLI to add new components rather than writing from scratch.

> **Protected Foundation:** Do not modify `components/ui/*` (shadcn/ui components) or third-party library internals unless explicitly instructed. Implement project-specific styling and features in app-level components.

### Layout Patterns

| Pattern | Structure |
|---|---|
| **Editor workspace** | Full viewport: left floating sidebar overlay, center canvas, right slide-over AI sidebar |
| **Sidebars** | Floating overlay with dark semi-transparent background and subtle border |
| **Modals & dialogs** | Centered overlay, `rounded-3xl`, dark background with backdrop blur |
| **Navbar** | Top bar with dark background and bottom border |

### Icons

Lucide React. Stroke-based icons only — no filled variants.

| Context | Size |
|---|---|
| Inline | `h-4 w-4` |
| Buttons | `h-5 w-5` |
| Feature icons | `h-8 w-8` |

---

## Code Standards

### General Principles

- Keep modules small and single-purpose
- Fix root causes — do not layer workarounds
- Do not mix unrelated concerns in one component or route
- Respect system boundaries defined in architecture

### TypeScript

- Strict mode required throughout the project
- Avoid `any`; use explicit interfaces or narrowly scoped types
- Validate unknown external input at system boundaries before trusting it
- Use `interface` for object contracts

### Next.js

- Default to React Server Components
- Add `"use client"` only when the component needs browser interactivity, hooks, or real-time state
- Keep route handlers focused on a single responsibility
- Long-running work belongs in background tasks, not in request handlers

### Styling

- Use CSS custom property tokens defined in `globals.css` — no raw Tailwind color classes like `zinc-*` or hardcoded hex values
- Reference tokens through their Tailwind utility names: `bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.
- Maintain the border radius scale: `rounded-xl` for small elements, `rounded-2xl` for cards, `rounded-3xl` for modals

### API Routes

1. Validate and parse request input before any logic runs
2. Enforce auth and project ownership checks before any mutation
3. Return consistent, predictable response shapes
4. Keep route handlers thin — push complexity into shared modules or background tasks

### Data & Storage

- Project metadata and relationships belong in PostgreSQL via Prisma
- Canvas snapshots and generated specs belong in Vercel Blob; Prisma stores only the blob URL reference
- Do not store large generated content directly in the database
- Task run records are first-class relational data — treat ownership and run IDs as verified before any token issuance

### File Organization

- `lib/` — Shared infrastructure: Prisma client, auth helpers, utilities
- `trigger/` — All durable background tasks and AI workflows
- `components/` — UI composition only; no business logic
- `app/api/` — Route handlers for auth, triggering, and persistence
- Name files after the responsibility they contain, not the technology

### Protected Foundation Components

Do not modify generated third-party foundation components unless explicitly instructed. This includes:

- `components/ui/*` (shadcn/ui components)
- Third-party library internals

Project-specific styling, layout changes, and feature logic must be implemented in app-level components instead of modifying foundation components. Only modify these files when a task explicitly requires it.

### System Invariants

1. Request handlers do not run long-lived AI work — that belongs in background tasks
2. Metadata and large generated artifacts are stored in separate layers
3. Auth and ownership are enforced at every mutation boundary
4. Client components are used only where browser interactivity or real-time state requires them
5. The canvas schema must remain consistent between user-created content and imported templates

---

## Development Workflow

### Approach

Build this project incrementally using a spec-driven workflow. Context files define what to build, how to build it, and the current state of progress. Always implement against these specs — do not infer or invent behavior from scratch.

### Scoping Rules

- Work on one feature unit or subsystem at a time
- Prefer small, verifiable increments over large speculative changes
- Do not combine unrelated system boundaries in a single implementation step

### When To Split Work

Split an implementation step if it combines:

- UI changes and background task changes
- Real-time canvas state and database persistence
- Multiple unrelated API routes
- Behavior that is not clearly defined in the context files

If a change cannot be verified end to end quickly, the scope is too broad — split it.

### Handling Missing Requirements

- Do not invent product behavior that is not defined in the context files
- If a requirement is ambiguous, resolve it in the relevant context file before implementing
- If a requirement is missing, add it as an open question to `context/progress-tracker.md` before continuing

### Keeping Docs In Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries
- Storage model decisions
- Code conventions or standards
- Feature scope

Progress state must reflect the actual state of the implementation, not the intended state.

### Before Moving To The Next Feature

1. The current feature works end to end within its defined scope
2. No invariant defined in the architecture was violated
3. `context/progress-tracker.md` reflects the completed work

---

## What's Out of Scope

The following are explicitly not part of DevCanvas:

- Billing and subscriptions
- Enterprise permission tiers beyond owner/collaborator
- Versioned spec history and review workflows
- Production object storage migration
- Mobile-native applications

---

## Success Criteria

1. A signed-in user can create and open a project
2. Multiple users can collaborate in the same canvas simultaneously
3. A user can import a prebuilt starter design into the canvas
4. AI can generate an architecture into the shared room from a prompt
5. The graph can be converted into a persisted Markdown spec
6. Project metadata and generated artifacts are stored in the correct layers

---
