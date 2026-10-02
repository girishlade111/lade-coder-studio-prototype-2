# Lade Coder Studio — Prototype 2

An AI-powered coding studio prototype: a Next.js web app that pairs a Monaco-based code editor
with Genkit AI flows (Google AI) for code assistance, generation, and explanation — a browser-based
AI pair-programmer workbench.

## Features

- **Monaco code editor** — VS Code-grade editing in the browser (`@monaco-editor/react`).
- **AI code assistance** — Genkit flows (`@genkit-ai/googleai`, `@genkit-ai/next`) wired into `src/ai`
  for generation, explanation, and refactoring help (requires a Google AI API key).
- **Modern UI kit** — Radix UI primitives, Tailwind CSS, dark-mode-ready theming, toasts, dialogs,
  tabs, and form controls with React Hook Form + Zod validation.
- **App-router structure** — `src/app` routes, shared `src/components`, `src/contexts`, `src/hooks`,
  `src/lib`, and `src/types`.

## Tech Stack

Next.js (App Router) · TypeScript · React · Tailwind CSS · Genkit AI + Google AI ·
Monaco Editor · Radix UI · React Hook Form · Zod · Firebase App Hosting config (`apphosting.yaml`).

## Quick Start

```bash
npm install
# add your Google AI key:
# GOOGLE_GENAI_API_KEY=your-key  (in .env.local)
npm run dev -- -p 9002
```

Then open http://localhost:9002. Useful scripts: `npm run build`, `npm run start`,
`npm run typecheck`, `npm run lint`, `npm run genkit:dev` (Genkit developer UI).

## Project Structure

```
src/
  app/          Next.js App Router pages and layouts
  ai/           Genkit flows and AI configuration
  components/   Reusable UI components
  contexts/     React context providers
  hooks/        Custom hooks
  lib/          Utilities and shared logic
  types/        TypeScript type definitions
apphosting.yaml  Firebase App Hosting backend config
```

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GOOGLE_GENAI_API_KEY` | Yes | Google AI (Gemini) key for Genkit flows |

Without this key the AI features will not work; the UI still renders.

## Deployment

Originally scaffolded for Firebase App Hosting (`apphosting.yaml`). Any Next.js host
(Netlify, Vercel, Cloudflare) works — set `GOOGLE_GENAI_API_KEY` in the host's env vars.

## Author

Built by Girish Lade — https://ladestack.in
