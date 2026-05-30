# Event Dashboard

A [Next.js](https://nextjs.org/) dashboard for browsing events — search, filter,
and favorite events sourced from the [PredictHQ](https://www.predicthq.com/) API,
with a bundled sample dataset so it runs with zero configuration.

![image](https://i.imgur.com/S63ElCn.png)

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Redux Toolkit** for state (`src/features/*Slice.ts`)
- **Material UI** + **Tailwind CSS** for UI
- **Vitest** + **React Testing Library** for tests

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

By default the app serves the bundled sample data in `src/app/results.json`.
To use live PredictHQ data, copy the env template and add your key:

```bash
cp .env.example .env
# then set PREDICTHQ_API_KEY in .env
```

The key is read **only** on the server (`src/app/api/events`), so it is never
exposed to the browser. If the upstream API is unavailable or rate-limited, the
routes fall back to the sample data automatically.

## Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start the dev server                     |
| `npm run build`  | Production build                         |
| `npm start`      | Serve the production build               |
| `npm run lint`   | Run ESLint                               |
| `npm test`       | Run the Vitest suite once                |
| `npm run test:watch` | Run Vitest in watch mode             |

## Project structure

```
src/
├── app/
│   ├── page.tsx            # Root page, wires up the Redux Provider
│   ├── Header.tsx          # Search bar → /api/events
│   ├── EventList.tsx       # Main list + stat cards
│   ├── EventRow.tsx        # A single event row
│   ├── EventSummary.tsx    # "Upcoming events" sidebar
│   ├── EventCard.tsx       # "Event of the month" card
│   ├── EventModal.tsx      # Event detail modal
│   ├── EventFilter.tsx     # Category / date filter UI
│   ├── utils.tsx           # Date + number formatting helpers
│   └── api/events/         # Server routes that proxy PredictHQ
└── features/               # Redux store + slices
```

## Continuous integration

`.github/workflows/ci.yml` runs lint, tests, and a production build on every
push and pull request.
