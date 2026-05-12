# CV Builder

Single-page CV/resume builder built with Next.js 16, React 19, Tailwind CSS 4, and shadcn-style UI primitives. The app renders a print-friendly resume preview and an inline editor so you can adjust content, toggle sections, and export to PDF from the browser.

## What it does

- Live-edit core CV fields: identity, contact info, summary, social links, experience, and projects
- Toggle optional sections like additional info, skills, education, inspirations, awards, and portfolio QR
- Render a one-page, print-oriented layout optimized for browser PDF export
- Seed the app with default CV data from a typed local data model

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `next-themes`
- `lucide-react`
- `qrcode`

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run typecheck
```

## How the app is organized

- [app/page.tsx](/Users/kostyniuk/engineering/next/cv-builder/app/page.tsx) contains the main builder UI and preview composition
- [lib/cv.ts](/Users/kostyniuk/engineering/next/cv-builder/lib/cv.ts) defines the CV types, default data, blank item templates, and helper utilities
- [components/cv](/Users/kostyniuk/engineering/next/cv-builder/components/cv) contains the resume sections and editor panels
- [components/ui](/Users/kostyniuk/engineering/next/cv-builder/components/ui) contains the shared UI primitives
- [app/globals.css](/Users/kostyniuk/engineering/next/cv-builder/app/globals.css) holds the global styles and print/layout styling

## Customization

The default content ships from `initialData` in [lib/cv.ts](/Users/kostyniuk/engineering/next/cv-builder/lib/cv.ts). If you want the app to open with your own resume data, update that object.

The builder currently stores changes in client state only. Reloading the page resets the form back to `initialData`.

To adjust layout or styling:

- Edit the preview composition in [app/page.tsx](/Users/kostyniuk/engineering/next/cv-builder/app/page.tsx)
- Update section-specific rendering in [components/cv](/Users/kostyniuk/engineering/next/cv-builder/components/cv)
- Tweak print and visual styling in [app/globals.css](/Users/kostyniuk/engineering/next/cv-builder/app/globals.css)

## Exporting

Use the `Download PDF` button in the UI. It triggers the browser print flow, which is intended for saving the resume as a PDF.
