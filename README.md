## Phrases Management

### What it does

This app lets you add short phrases, view them in a grid, search to filter them, and delete any you no longer need. Your phrases are saved in the browser, so they persist across refreshes.

## Deployment

Deployed on Vercel: [phrases-matrix.vercel.app](https://phrases-matrix.vercel.app/).

## Design Decisions

### React State vs. React Context (or other state libraries)

For this small app, simple React state with custom hooks is sufficient. There is no prop drilling, so adding Context or a state library would add setup and bundle weight without clear benefits.

### UI Components

The UI uses `shadcn/ui` components styled with Tailwind CSS. These components are accessible by default and easy to theme. Tailwind keeps styles close to the markup and enables quick customization without writing much CSS.

### Persistent Storage (localStorage)

Phrases are stored in `localStorage` so they survive reloads without needing a backend. This is simple, fast, and appropriate for this use case (small personal data per browser). The storage key is centralized in `src/phrase/constants.ts` as `PHRASES_STORAGE_KEY`.

### Build and Test Tooling (Vite + Vitest)

The project uses Vite for development and production builds, providing fast HMR and an optimized production output in `dist/`. Vitest is used for unit tests; it integrates seamlessly with Vite and Testing Library for React, running in a JSDOM environment. Run tests with `pnpm test`.

## How to run it

1. Install dependencies

```bash
pnpm install
```

2. Start the dev server

```bash
pnpm dev
```

3. Run tests

```bash
pnpm test
```

Optional: build and preview the production bundle

```bash
pnpm build && pnpm preview
```

## Requirements

- Node.js 18+ (LTS recommended)
- pnpm 9+ (or use npm/yarn with equivalent commands)
- A modern browser (Chrome, Edge, Firefox, Safari)
