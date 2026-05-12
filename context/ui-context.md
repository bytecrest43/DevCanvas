# UI Context

## Theme

Dark only. No light mode. The visual language is a dark technical workspace — near-black backgrounds, layered surfaces, and vivid accent colors for interactive elements.

All colors are defined as CSS custom properties in `globals.css` and mapped to Tailwind tokens via `@theme inline`. Components must use these tokens — no hardcoded hex values or raw Tailwind color classes like `zinc-*`.

| Role             | CSS Variable           | OKLch Value / Hex Approx.              |
| ---------------- | ---------------------- | -------------------------------------- |
| Page background  | `--bg-base`            | `#020509` (deep void)                  |
| Surface          | `--bg-surface-mid`     | `oklch(10% 0.020 222)`                 |
| Elevated surface | `--bg-elevated-mid`    | `oklch(14% 0.024 222)`                 |
| Subtle surface   | `--bg-subtle-mid`      | `oklch(18% 0.028 222)`                 |
| Default border   | `--border-default`     | `oklch(22% 0.032 222)`                 |
| Subtle border    | `--border-subtle`      | `oklch(28% 0.036 222)`                 |
| Primary text     | `--text-primary`       | `oklch(97% 0.006 210)`                 |
| Secondary text   | `--text-secondary`     | `oklch(74% 0.044 210)`                 |
| Muted text       | `--text-muted`         | `oklch(44% 0.040 215)`                 |
| Faint text       | `--text-faint`         | `oklch(24% 0.028 215)`                 |
| Brand accent     | `--accent-primary`     | `oklch(88% 0.18 192)` (neon cyan)      |
| Brand dim        | `--accent-primary-dim` | `oklch(88% 0.18 192 / 12%)`            |
| AI accent        | `--accent-ai`          | `oklch(62% 0.22 278)` (deep violet)    |
| AI text          | `--accent-ai-text`     | `oklch(76% 0.16 278)` (bright violet)  |
| Error            | `--state-error`        | `oklch(62% 0.230 25)` (red)            |
| Success          | `--state-success`      | `oklch(76% 0.168 160)` (green)         |
| Warning          | `--state-warning`      | `oklch(78% 0.165 75)` (yellow)         |

Tailwind utility names map to these variables. Use `bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.

## Typography

| Role      | Font       | CSS Variable        |
| --------- | ---------- | ------------------- |
| UI text   | Geist Sans | `--font-geist-sans` |
| Code/mono | Geist Mono | `--font-geist-mono` |

Both fonts are loaded via `next/font/google` and applied as CSS variables on the `<html>` element. The base `body` uses Geist Sans with `antialiased`.

## Border Radius

Radius increases with surface depth — smaller for inner elements, larger for outer containers.

| Context           | Class         |
| ----------------- | ------------- |
| Inline / small UI | `rounded-xl`  |
| Cards / panels    | `rounded-2xl` |
| Modal / overlay   | `rounded-3xl` |

## Canvas

### Node Color Palette

8 defined color pairs. Each pair specifies a dark node fill and a vivid contrasting text color tuned for readability on the dark canvas. Defined in `types/canvas.ts` as `NODE_COLORS`.

| Node fill | Text color | Character              |
| --------- | ---------- | ---------------------- |
| `#1F1F1F` | `#EDEDED`  | Neutral dark (default) |
| `#10233D` | `#52A8FF`  | Blue                   |
| `#2E1938` | `#BF7AF0`  | Purple                 |
| `#331B00` | `#FF990A`  | Orange                 |
| `#3C1618` | `#FF6166`  | Red                    |
| `#3A1726` | `#F75F8F`  | Pink                   |
| `#0F2E18` | `#62C073`  | Green                  |
| `#062822` | `#0AC7B4`  | Teal                   |

Default node color: `#1F1F1F` with `#EDEDED` text.

### Edge Style

Smooth-step path with an arrow marker. Default edge color: `#f8fafc`. Stroke width is thin — edges are visually secondary to nodes.

### Node Shapes

6 supported shapes, defined in `types/canvas.ts` as `NODE_SHAPES`. Complex shapes (diamond, hexagon, cylinder) are rendered as inline SVGs rather than CSS borders.

- `rectangle` — default general-purpose node
- `diamond` — decision / gateway
- `circle` — event / endpoint
- `pill` — service / process
- `cylinder` — database / storage
- `hexagon` — external system / boundary

### Connection Handles

Small white circular handles, hidden by default, revealed on node hover. Appear at all four sides of a node.

### Canvas Background

React Flow `<Background>` component. Canvas sits on the base background color.

## Component Library

shadcn/ui on top of Tailwind. No custom design system. Components live in `components/ui/`. Use the `shadcn` CLI to add new components rather than writing them from scratch.

## Layout Patterns

- Editor workspace: full-viewport layout — floating sidebar overlay on the left, center canvas, slide-over AI sidebar on the right.
- Sidebars: floating overlay with dark semi-transparent background and subtle border.
- Modals and dialogs: centered overlay, `rounded-3xl`, dark background with backdrop blur.
- Navbar: top bar with dark background and bottom border.

## Icons

Lucide React. Stroke-based icons only — no filled variants. Icon sizes: `h-4 w-4` for inline, `h-5 w-5` for buttons, `h-8 w-8` for feature icons in empty states.
