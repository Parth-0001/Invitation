# Personalized Mobile Wedding Website

A mobile-first, scroll-based wedding invitation and event website — one shareable URL for your entire celebration.

## Features

- **Mobile-first design** — optimized for portrait phones, responsive on desktop
- **Fully customizable theme** — colors, fonts, decorative elements via JSON config
- **Hero invitation** — elegant opening with couple names
- **Scratch-to-reveal** — canvas-based date reveal (touch + mouse)
- **Live countdown** — days, hours, minutes, seconds
- **Couple introduction** — groom/bride photos, parents, descriptions
- **Photo & video gallery** — lightbox with swipe navigation
- **Dynamic events** — any number of events with dress code, venue, maps
- **Personalized message** — custom invitation text section
- **Family details** — dynamic family member lists
- **Music player** — tap-to-play (mobile-friendly, no autoplay)
- **Google Maps** — embedded map + Open in Maps button
- **Shareable URLs** — e.g. `/joshua-richa`

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and visit `/joshua-richa` for the demo.

## Build

```bash
npm run build
npm run preview
```

## Customizing a Wedding

1. Copy `src/data/joshua-richa.json` to a new file (e.g. `src/data/your-couple.json`)
2. Edit all fields — theme, couple, events, gallery, music, venue
3. Register the slug in `src/data/index.ts`:

```ts
import yourCouple from './your-couple.json'

const weddings: Record<string, WeddingData> = {
  'joshua-richa': joshuaRicha as WeddingData,
  'your-couple': yourCouple as WeddingData,
}
```

4. Share `yourdomain.com/your-couple`

## Data Model

See `src/types/wedding.ts` for the full TypeScript schema. All content is data-driven.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router

## Deployment

Deploy the `dist/` folder to any static host. Configure SPA routing so all paths serve `index.html`.
