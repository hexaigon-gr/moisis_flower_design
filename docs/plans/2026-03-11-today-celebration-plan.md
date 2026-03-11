# Today's Celebration Component — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a self-contained card component that shows today's Greek namedays and holidays with a flower-shop CTA.

**Architecture:** Next.js API route caches external nameday API (1h), merges with static holidays map, serves to a client component with skeleton loading. Component is portable and placed below hero.

**Tech Stack:** Next.js App Router API routes, fetch with revalidate, Zustand-free (local state only), next-intl, motion/react, lucide-react, shadcn/ui Skeleton.

---

### Task 1: Add static GREEK_HOLIDAYS map to constants

**Files:**
- Modify: `lib/general/constants.ts:117` (after REVIEWS)

**Step 1: Add the holidays map**

Append to the end of `lib/general/constants.ts` (before the closing, after REVIEWS):

```ts
/** Greek national & religious holidays — key format: "M/D" */
export const GREEK_HOLIDAYS: Record<string, { el: string; en: string }> = {
  "1/1": { el: "Πρωτοχρονιά", en: "New Year's Day" },
  "6/1": { el: "Θεοφάνεια", en: "Epiphany" },
  "14/2": { el: "Αγίου Βαλεντίνου", en: "Valentine's Day" },
  "8/3": { el: "Παγκόσμια Ημέρα Γυναίκας", en: "International Women's Day" },
  "25/3": { el: "Εθνική Επέτειος 1821", en: "Greek Independence Day" },
  "1/5": { el: "Πρωτομαγιά", en: "May Day" },
  "15/8": { el: "Κοίμηση της Θεοτόκου", en: "Assumption of Mary" },
  "28/10": { el: "Ημέρα του ΟΧΙ", en: "Ohi Day" },
  "25/12": { el: "Χριστούγεννα", en: "Christmas Day" },
  "26/12": { el: "Σύναξη Θεοτόκου", en: "Synaxis of Theotokos" },
  "14/9": { el: "Ύψωση Τιμίου Σταυρού", en: "Exaltation of the Holy Cross" },
} as const;
```

**Step 2: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add lib/general/constants.ts
git commit -m "feat: add GREEK_HOLIDAYS static map to constants"
```

---

### Task 2: Create the API route with caching

**Files:**
- Create: `app/api/namedays/today/route.ts`

**Step 1: Create the API route**

```ts
import { NextResponse } from "next/server";
import { GREEK_HOLIDAYS } from "@/lib/general/constants";

interface NamedayApiResponse {
  success: boolean;
  today: {
    names: string[];
  };
}

interface TodayCelebrationResponse {
  names: string[];
  holiday: { el: string; en: string } | null;
  date: string;
}

// In-memory cache
let cache: { data: TodayCelebrationResponse; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

function getTodayKey(): string {
  const now = new Date();
  return `${now.getDate()}/${now.getMonth() + 1}`;
}

function getHolidayForToday(): { el: string; en: string } | null {
  const key = getTodayKey();
  // GREEK_HOLIDAYS uses "M/D" format — need to check "D/M" too since our map uses D/M
  return GREEK_HOLIDAYS[key] ?? null;
}

async function fetchNamedays(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://greek-namedays.herokuapp.com/api/v1/namedays/today",
      { signal: AbortSignal.timeout(5000) }
    );

    if (!res.ok) return [];

    const data: NamedayApiResponse = await res.json();
    return data.success ? data.today.names : [];
  } catch {
    return []; // Graceful fallback
  }
}

export async function GET() {
  const now = Date.now();

  // Return cached if fresh
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const [names, holiday] = await Promise.all([
    fetchNamedays(),
    Promise.resolve(getHolidayForToday()),
  ]);

  const response: TodayCelebrationResponse = {
    names,
    holiday,
    date: new Date().toISOString().split("T")[0],
  };

  // Update cache
  cache = { data: response, timestamp: now };

  return NextResponse.json(response);
}
```

**Step 2: Test manually**

Run: `curl http://localhost:3000/api/namedays/today` (with dev server running)
Expected: JSON with `names`, `holiday`, and `date` fields

**Step 3: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add app/api/namedays/today/route.ts
git commit -m "feat: add /api/namedays/today route with 1h cache"
```

---

### Task 3: Add translations for TodayCelebration

**Files:**
- Modify: `messages/el.json:153` (before closing `}`)
- Modify: `messages/en.json:153` (before closing `}`)

**Step 1: Add Greek translations**

Add before the final `}` in `messages/el.json`:

```json
"TodayCelebration": {
  "title": "Σήμερα γιορτάζουν",
  "holidayLabel": "Σημερινή γιορτή",
  "cta": "Στείλε λουλούδια",
  "ctaSubtext": "Παράγγειλε online μέσω Wolt",
  "noData": "Καλή σας μέρα!"
}
```

**Step 2: Add English translations**

Add before the final `}` in `messages/en.json`:

```json
"TodayCelebration": {
  "title": "Today's Celebrations",
  "holidayLabel": "Today's Holiday",
  "cta": "Send Flowers",
  "ctaSubtext": "Order online via Wolt",
  "noData": "Have a lovely day!"
}
```

**Step 3: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add messages/el.json messages/en.json
git commit -m "feat: add TodayCelebration translations (el + en)"
```

---

### Task 4: Install shadcn Skeleton component (if not present)

**Step 1: Check if Skeleton exists**

Run: `ls components/ui/skeleton.tsx 2>/dev/null && echo "EXISTS" || echo "MISSING"`

**Step 2: Install if missing**

Run (only if MISSING): `npx shadcn@latest add skeleton`

**Step 3: Commit if installed**

```bash
git add components/ui/skeleton.tsx
git commit -m "feat: add shadcn skeleton component"
```

---

### Task 5: Create the TodayCelebration client component

**Files:**
- Create: `components/today-celebration.tsx`

**Step 1: Create the component**

Use the `frontend-design` skill to create a visually polished card component with:

- `"use client"` directive
- `useTranslations("TodayCelebration")` for i18n
- `useLocale()` from next-intl to pick the right holiday language
- `useState` + `useEffect` to fetch `/api/namedays/today`
- 3 states: skeleton loading, data, error (renders nothing gracefully)
- Card layout: flower icon (Flower from lucide-react), nameday names, optional holiday badge, CTA button linking to `BUSINESS.wolt`
- `FadeIn` animation wrapper from `@/components/motion`
- Follows existing patterns: rounded-xl border, backdrop-blur, hover effects
- Responsive: full-width on mobile, contained on desktop
- Skeleton: 3 lines mimicking the final layout

**Step 2: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 3: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000 today-celebration`
Read the screenshot and verify the component looks correct.

**Step 4: Commit**

```bash
git add components/today-celebration.tsx
git commit -m "feat: add TodayCelebration component with skeleton loading"
```

---

### Task 6: Add component to landing page below hero

**Files:**
- Modify: `app/[locale]/page.tsx:19` (after HeroSection)

**Step 1: Import and add component**

Add import at top:
```ts
import { TodayCelebration } from "@/components/today-celebration";
```

Add after `<HeroSection />`:
```tsx
<TodayCelebration />
```

**Step 2: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 3: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000 landing-with-celebration`
Read the screenshot and verify the component renders correctly below the hero.

**Step 4: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: add TodayCelebration below hero on landing page"
```

---

### Task 7: Final verification

**Step 1: Run lint**

Run: `pnpm lint`
Expected: No errors

**Step 2: Run TypeScript check**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 3: Full screenshot test**

Run: `node screenshot.mjs http://localhost:3000 final-celebration`
Read and visually verify everything looks correct.

**Step 4: Test API caching**

Run `curl http://localhost:3000/api/namedays/today` twice — both should return same data with no delay on second call.
