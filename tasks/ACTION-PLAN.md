# SEO Action Plan — MΩISIS Flower Design
**Generated:** 2026-04-29  
**Target:** Rank for ανθοπωλειο ηλιουπολη, στολισμοι γαμων, λουλουδια ηλιουπολη, στολισμος χωρων

---

## 🔴 CRITICAL — Fix Immediately (Blocking Indexing)

### C1. Fix wrong BASE_URL domain
**File:** `lib/general/constants.ts`  
**Problem:** Fallback URL is `moisisflowerdesign.gr` but deployed site is `moisis-flower-design.gr`. Poisons canonical tags, sitemap, robots.txt, and schema everywhere.  
**Fix:** Change fallback to `https://www.moisis-flower-design.gr`  
**Also:** Set `NEXT_PUBLIC_BASE_URL=https://www.moisis-flower-design.gr` in Vercel dashboard environment variables.  
**Impact:** Fixes canonical, sitemap, robots.txt, OG images, schema in one change.

### C2. Fix sitemap — add 18 missing pages, remove admin
**File:** `app/sitemap.ts`  
**Problem:** Only 4 URLs indexed. All event/occasion detail pages missing. Admin pages wrongly included.  
**Fix:** Import `EVENTS` and `OCCASIONS` constants, add all slugs × locales to sitemap, remove `/admin` route.  
**Impact:** Google discovers and indexes the most valuable pages (wedding, christening, bouquets).

### C3. Fix 301 redirect — non-www → www
**File:** `vercel.json` (create)  
**Problem:** Non-www to www redirect is 307 Temporary — Google doesn't fully transfer PageRank.  
**Fix:** Create `vercel.json` with permanent redirect rule.  
**Also:** In Vercel dashboard → Domains, set www as primary and enable "Redirect to www" as permanent (301).

---

## 🟠 HIGH — Fix Within 1 Week (Directly Impacts Target Keywords)

### H1. Greek meta description for /el locale
**File:** `app/[locale]/layout.tsx`  
**Problem:** Meta description is English: "Curated floral compositions…" — Google ignores this for Greek searches.  
**Fix:** Use locale-aware metadata generation with Greek description containing target keywords:  
> "Ανθοπωλείο στην Ηλιούπολη — μπουκέτα, στολισμοί γάμων, βαπτίσεις & λουλούδια για κάθε περίσταση. Παραδίδουμε μέσω Wolt. MΩISIS Flower Design."

### H2. Add "Ηλιούπολη" to wedding event page
**File:** `messages/el.json` (EventPage.wedding section)  
**Problem:** The wedding page (`/el/events/wedding`) never mentions "Ηλιούπολη" — critical for "στολισμοι γαμων ηλιουπολη" ranking.  
**Fix:** Update title to "Στολισμός Γάμου — Ηλιούπολη" and description to include location.

### H3. Add missing keywords to metadata
**File:** `app/[locale]/layout.tsx` (keywords array)  
**Add:** "στολισμοί γάμων", "στολισμός χώρων", "ανθοπωλείο κοντά μου", "ανθοστολισμός", "βαπτίσεις"

### H4. Optimize Google My Business (EXTERNAL — must do manually)
- Ensure business category is "Flower Shop" (Ανθοπωλείο)
- Add secondary category: "Wedding Service" / "Event Planner"
- Verify address shows "Ηλιούπολη" exactly
- Add photos (wedding decorations, bouquets, shop interior)
- Respond to all existing reviews
- Add business description with keywords: "ανθοπωλείο Ηλιούπολη, στολισμοί γάμων, λουλούδια"
- Set service areas: Ηλιούπολη, Δάφνη, Αργυρούπολη, Γλυφάδα
- **This is the #1 action for "ανθοπωλειο κοντα μου" — GBP presence is mandatory**

### H5. Submit sitemap to Google Search Console (EXTERNAL)
After fixing C1+C2: Go to Google Search Console → Sitemaps → Submit `https://www.moisis-flower-design.gr/sitemap.xml`

---

## 🟡 MEDIUM — Fix Within 1 Month

### M1. Fix Schema.org data
**File:** `app/[locale]/layout.tsx` (JSON-LD script)  
- Fix `url` field (resolved by C1)
- Update `geo` to exact coordinates: `{ latitude: 37.9253, longitude: 23.7614 }`
- Add `hasMap` property linking to Google Maps
- Update `aggregateRating.reviewCount` to match actual Google reviews

### M2. Per-page schema on event/occasion pages
**File:** `app/[locale]/events/[slug]/page.tsx`, `occasions/[slug]/page.tsx`  
Add `Service` or `LocalBusiness` service schema on wedding/christening pages with location signals.

### M3. Add "Ηλιούπολη" mentions to more pages
Event pages for christening and occasions like birthday/anniversary should also mention Ηλιούπολη in descriptions to reinforce local relevance.

### M4. Improve H1 keyword richness
**File:** `components/hero-section.tsx`  
Current H1: "MΩISIS" — consider adding a visually hidden `<span>` with full business name or adding a subtitle as H1:  
"MΩISIS | Ανθοπωλείο Ηλιούπολη"

### M5. Add FAQ section to homepage
Add a simple FAQ component with 4-5 Q&As targeting key searches:
- "Που βρίσκεστε;" → address + maps link
- "Κάνετε στολισμούς γάμου;" → yes, description
- "Παραδίδετε λουλούδια;" → Wolt delivery info
- "Ποιο το ωράριο σας;" → hours

Add `FAQPage` JSON-LD schema alongside.

---

## 🔵 LOW — Backlog

### L1. Update footer links to include event/occasion pages
Footer currently lacks links to `/el/events/wedding` etc. — add them for internal linking.

### L2. Add breadcrumb schema on detail pages
Add `BreadcrumbList` JSON-LD on event/occasion pages.

### L3. Add descriptive alt text to gallery images
Review all `<Image>` alt attributes in gallery component — make them descriptive ("ανθοδέσμη γάμου Ηλιούπολη").

### L4. Register on local directories (EXTERNAL)
- Vrisko.gr
- XO.gr  
- Taxydromos.gr
- Attica business directories  
NAP (Name, Address, Phone) must match exactly across all.

### L5. Consider Greek URL slugs for event pages
`/el/events/wedding` → consider `/el/stolismoi-gamou` for better Greek keyword URL signals. (Medium effort, high long-term value)

---

## Implementation Checklist

- [ ] C1: Fix BASE_URL in `lib/general/constants.ts`
- [ ] C1b: Set `NEXT_PUBLIC_BASE_URL` in Vercel dashboard
- [ ] C2: Fix `app/sitemap.ts`
- [ ] C3: Create `vercel.json` with 301 redirect
- [ ] H1: Add locale-aware Greek meta description
- [ ] H2: Update wedding event page content (el.json)
- [ ] H3: Expand keywords array in layout metadata
- [ ] H4: Optimize Google My Business *(manual)*
- [ ] H5: Submit sitemap in Search Console *(manual, after C1+C2)*
- [ ] M1: Fix schema coordinates, reviewCount, hasMap
- [ ] M2: Per-page schema on event/occasion pages
- [ ] M3: Add Ηλιούπολη to more page descriptions
- [ ] M4: Improve H1 keyword richness
- [ ] M5: Add FAQ section with FAQPage schema
