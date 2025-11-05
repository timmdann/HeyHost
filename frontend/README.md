HeyHost frontend scaffold

This folder contains a Vite + React + TypeScript + TailwindCSS starter.

Quick start (run locally):

1. Install dependencies

   # PowerShell

   cd frontend
   npm install

2. Start dev server

   npm run dev

Tailwind is already configured (see `tailwind.config.cjs` and `postcss.config.cjs`).

Adding shadcn components

I prepared the project for shadcn UI, but you need to run the shadcn CLI locally to scaffold components and layouts. Recommended steps:

1. Install the CLI (optional) and run the init command:

   npm install -D shadcn-ui
   npx shadcn-ui init

   The CLI will prompt where to place components; accept defaults (will create `src/components` and add required dependencies).

2. Install runtime dependencies that shadcn components commonly need (examples):

   npm install lucide-react class-variance-authority tailwind-merge

3. After the CLI scaffolds components, import them into your pages and ensure Tailwind classes are picked up (restart dev server if needed).

Notes

- The shadcn CLI may add additional peer dependencies; follow its prompts and install them.
- For production builds, run `npm run build`.
