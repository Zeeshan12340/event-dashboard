# CLAUDE.md

Guidance for working in this repo.

## What this is

A Next.js 14 (App Router) event-browsing dashboard. State is managed with Redux
Toolkit; UI uses Material UI + Tailwind. Event data comes from the PredictHQ API,
proxied through server routes, with a bundled sample dataset as the default and
fallback.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint
- `npm test` — Vitest suite (`npm run test:watch` for watch mode)

Run `npm run lint && npm test && npm run build` before considering a change done.

## Architecture

- **Data flow:** `Header` dispatches a search → `GET /api/events?q=` →
  `eUpdate` populates `event` slice → `EventList`/`EventSummary`/`EventCard` read
  from the store. `EventList` separately fetches the total count from
  `GET /api/events/count`.
- **Server routes** (`src/app/api/events/route.ts` and `.../count/route.ts`)
  hold the PredictHQ key (`process.env.PREDICTHQ_API_KEY`, server-only) and fall
  back to `src/app/results.json` / `eventsCount.json` when the key is missing or
  the upstream call fails.
- **State** lives in `src/features/`:
  - `eventSlice` — the `Event[]` and per-event `liked` / `open` flags. The shared
    `Event` interface is exported here; reuse it instead of redefining shapes.
  - `querySlice` — search string, `finished` flag, and `error` message.
  - `pageSlice` — `expandEvents` / `likedEvents` UI toggles.
- Use the typed hooks from `src/features/hooks.ts` (`useAppSelector`,
  `useAppDispatch`), not the raw react-redux ones.

## Conventions

- Import the shared `Event` type from `@/features/eventSlice`; don't re-declare
  event shapes inline.
- Interactive controls are real `<button>`s (or `role="button"` + key handling)
  with `aria-label`/`aria-pressed`; decorative SVGs get `aria-hidden="true"`.
- Format dates/times with `convertToLocalTime(start, fullDate?, timeZone?)` from
  `src/app/utils.tsx`, passing the event's own `timezone`.

## Notes

- The sample dataset is a small, fixed historical snapshot (10 events,
  Jan 2025). Stats derived from "the current month" anchor to the data's own
  latest month, not the wall clock, so they stay meaningful offline.
- `@/*` resolves to `src/*` (see `tsconfig.json`).
