# Today's Celebration Component — Design

## Overview

A self-contained card component that displays today's Greek namedays and national/religious holidays, with a subtle CTA to order flowers. Placed below the hero section on the landing page.

## Architecture

```
API Route (/api/namedays/today)
  ├── Fetches from Heroku greek-namedays-api
  ├── Merges with static GREEK_HOLIDAYS map
  ├── 1h cache (revalidate + in-memory)
  └── Fallback: static holidays only if API down

Client Component (<TodayCelebration />)
  ├── Fetches /api/namedays/today
  ├── Skeleton → Data → Error states
  ├── Card: flower icon + names + holiday + CTA
  └── i18n via useTranslations
```

## Data Sources

### Primary: greek-namedays-api (Heroku)
- Endpoint: `GET https://greek-namedays.herokuapp.com/api/v1/namedays/today`
- Returns: `{ success: true, today: { names: [...] } }`
- Handles movable feasts (Easter-dependent namedays)

### Secondary: Static holidays map
- Added to `lib/general/constants.ts` as `GREEK_HOLIDAYS`
- Fixed-date holidays: 1/1, 6/1, 14/2, 25/3, 28/10, 25/12, 26/12, etc.
- Merged with API response in the API route

## API Route: `/api/namedays/today`

- Method: GET
- Cache: `revalidate: 3600` (1 hour) + in-memory cache with timestamp
- Response: `{ names: string[], holiday: string | null }`
- Error handling: if Heroku API fails, return static holiday data only

## Component: `<TodayCelebration />`

- Client component ("use client")
- Self-contained, portable — can be placed anywhere
- States: skeleton loading / data / error (hidden gracefully)
- Uses `useTranslations("TodayCelebration")` for i18n
- CTA links to Wolt order page from BUSINESS.wolt constant

## Visual Design

Card with flower icon, nameday names, optional holiday, and CTA button.
Follows existing section patterns (FadeIn animation, Tailwind styling).

## Files

| File | Action |
|------|--------|
| `app/api/namedays/today/route.ts` | Create — API route with cache |
| `components/today-celebration.tsx` | Create — client component |
| `lib/general/constants.ts` | Edit — add GREEK_HOLIDAYS map |
| `messages/en.json` / `messages/el.json` | Edit — add TodayCelebration translations |
| `app/[locale]/page.tsx` | Edit — add component below HeroSection |

## Translations

Key: `TodayCelebration`
- `title` — "Σήμερα γιορτάζουν" / "Today's Celebrations"
- `holiday` — "Σημερινή γιορτή" / "Today's Holiday"
- `cta` — "Στείλε λουλούδια" / "Send Flowers"
- `noNames` — fallback when no namedays
