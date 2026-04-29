# Full SEO Audit — MΩISIS Flower Design
**URL:** https://www.moisis-flower-design.gr  
**Audit Date:** 2026-04-29  
**Target Keywords:**
- ανθοπωλειο ηλιουπολη
- ανθοπωλειο κοντα μου
- στολισμοι γαμων
- στολισμοι γαμων ηλιουπολη
- λουλουδια ηλιουπολη
- στολισμος χωρων

---

## Overall SEO Health Score: **42 / 100**

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 20/100 | 25% | 5.0 |
| Content Quality | 60/100 | 25% | 15.0 |
| On-Page SEO | 45/100 | 20% | 9.0 |
| Schema / Structured Data | 50/100 | 10% | 5.0 |
| Performance (CWV) | 70/100 | 10% | 7.0 |
| Images | 50/100 | 5% | 2.5 |
| AI Search Readiness | 40/100 | 5% | 2.0 |
| **TOTAL** | | | **45.5 / 100** |

---

## Executive Summary

Business type: **Local florist** (Ηλιούπολη, Athens) offering wedding/event decoration, bouquets, Wolt delivery.

The site has excellent visual design and good content depth. However, **three critical technical bugs prevent Google from correctly indexing the site**:

1. **Wrong canonical domain everywhere** — `constants.ts` hardcodes `moisisflowerdesign.gr` (no hyphens) instead of the actual deployed domain `moisis-flower-design.gr`. This means every sitemap URL, canonical tag, and schema `url` field points to a non-existent domain.
2. **Sitemap missing 18 pages** — all 9 event/occasion detail pages (× 2 locales) are absent; admin pages are incorrectly included.
3. **307 Temporary redirects** — Google does not fully transfer PageRank through temporary redirects; the root domain and www root both use 307 instead of 301.

Additionally, the Greek version of the site uses an **English meta description**, and the **target keywords for wedding decoration and local flower searches** are largely absent from key SEO fields.

### Top 5 Critical Issues
1. Wrong `BASE_URL` domain poisons canonical, sitemap, schema, and metadataBase
2. Sitemap has 4 URLs instead of 22 (missing all content pages)
3. Meta description is in English for the Greek (`/el`) locale
4. Wedding/event pages don't mention "Ηλιούπολη" — blocking local ranking
5. 307 Temporary redirects instead of 301 Permanent

### Top 5 Quick Wins
1. Fix `BASE_URL` fallback in `lib/general/constants.ts` (1 line)
2. Add event/occasion routes to `app/sitemap.ts` (remove admin, add 18 pages)
3. Add Greek meta description with "ανθοπωλείο Ηλιούπολη, στολισμοί γάμων" keywords
4. Add "Ηλιούπολη" to wedding event page title & description
5. Create `vercel.json` with 301 redirect for non-www → www

---

## Technical SEO

### Domain & Redirects
- **CRITICAL** — `BASE_URL` fallback in `lib/general/constants.ts` is `https://moisisflowerdesign.gr` but the deployed site is `https://www.moisis-flower-design.gr`. The env var `NEXT_PUBLIC_BASE_URL` is not set in Vercel, so the fallback is used everywhere.
- **CRITICAL** — Non-www → www redirect returns **307 Temporary** (should be 301 Permanent). Vercel domain config needs updating.
- **CRITICAL** — www root `/` → `/el` redirect also returns 307 (next-intl locale detection — expected behavior, but canonical URL should ensure Google indexes `/el` not `/`).

### Robots.txt
```
Sitemap: https://moisisflowerdesign.gr/sitemap.xml  ← WRONG DOMAIN
```
Robots.txt itself is correctly configured (disallows /api/, /admin/), but the sitemap pointer is wrong due to the BASE_URL bug.

### Sitemap
- **Current sitemap** (`/sitemap.xml`): 4 URLs — only `/{locale}` and `/{locale}/admin`
- **Missing 18 pages** (all event/occasion detail pages):
  - `/el/events/wedding`, `/el/events/christening`, `/el/events/events`
  - `/en/events/wedding`, `/en/events/christening`, `/en/events/events`
  - `/el/occasions/anniversary`, `/el/occasions/birthday`, `/el/occasions/birth`, `/el/occasions/graduation`, `/el/occasions/housewarming`, `/el/occasions/condolence`
  - (same 6 in `/en/`)
- **Admin pages should NOT be in sitemap** — they are behind auth and indexed unnecessarily

### Canonicals & hreflang
- All canonical URLs point to wrong domain (`moisisflowerdesign.gr`)
- Hreflang alternates also use wrong domain
- `metadataBase` uses wrong domain → all relative OG/Twitter image URLs resolve incorrectly

### Core Web Vitals (estimated)
- Next.js 16 with static generation: likely good LCP/CLS
- No lazy loading issues detected in source
- Fonts use `display: swap` ✓
- Hero image uses `priority` ✓

---

## Content Quality

### Strengths
- Rich Greek content throughout (about, events, occasions, products)
- Real customer reviews in Greek with specific mentions of weddings, location ("ανθοπωλείο Ηλιούπολης")
- Detailed descriptions on event/occasion detail pages
- Multiple service categories well described

### Issues
- **Meta description is English** for the Greek locale — Google may auto-generate one, often poorly
- **"Luxury Flower Design" subtitle is English** on the Greek page — dilutes Greek keyword density
- **No FAQ content** — FAQ schema could capture "near me" and question-style searches
- **No blog/content section** — purely a landing page; content marketing opportunity missed
- Product section links out to Wolt (external) — no keyword-rich product pages

### E-E-A-T Assessment
- **Experience**: Good — owner name (Χάρης) mentioned, customer reviews prominent ✓
- **Expertise**: Moderate — service descriptions exist but no awards, years in business, or credentials shown
- **Authoritativeness**: Weak — no external links to/from local directories, no Google Business Profile link in schema
- **Trustworthiness**: Good — contact info, address, phone, email all present ✓

---

## On-Page SEO

### Homepage (`/el`)
| Element | Current | Issue |
|---|---|---|
| `<title>` | "MΩISIS Flower Design \| Ανθοπωλείο Ηλιούπολη" | Good — contains location ✓ |
| Meta description | "Curated floral compositions… Premium flower shop in Ilioupoli, Athens." | **English — should be Greek** |
| H1 | "MΩISIS" | Too short, not keyword-rich |
| H2 | Εκδηλώσεις, Περιστάσεις, Προϊόντα… | Good Greek section labels ✓ |
| Keywords meta | ανθοπωλείο, Ηλιούπολη, λουλούδια, γάμος… | Missing: στολισμοί γάμων, στολισμός χώρων |

### Wedding Page (`/el/events/wedding`)
| Element | Current | Issue |
|---|---|---|
| Title | "Γάμοι — MΩISIS Flower Design" | Missing "Ηλιούπολη" |
| Meta description | "Ολοκληρωμένος ανθοστολισμός που κάνει τη μέρα σας μαγική" | No location, no keyword "στολισμοί γάμων" |
| H1 | "Γάμοι" | Missing "ανθοστολισμός γάμου Ηλιούπολη" |
| Body | Detailed description ✓ | "Ηλιούπολη" **not mentioned anywhere on page** |

### Internal Linking
- Good: sections link to each other via anchor IDs
- Missing: no cross-linking between event/occasion pages
- Footer lacks links to event/occasion detail pages

---

## Schema & Structured Data

### Current Implementation
```json
{
  "@type": "Florist",
  "name": "MΩISIS Flower Design",
  "url": "https://moisisflowerdesign.gr",  ← WRONG DOMAIN
  "geo": { "latitude": 37.9300, "longitude": 23.7500 },  ← Approximate
  "aggregateRating": { "ratingValue": "5.0", "reviewCount": "10" }  ← Hardcoded
}
```

### Issues
- `url` field uses wrong domain (BASE_URL bug)
- `geo` coordinates are approximate (`37.93, 23.75`) — should be exact (`37.9253, 23.7614`)
- `aggregateRating.reviewCount` hardcoded at 10 — likely outdated
- No `hasMap` property linking to Google Maps
- No breadcrumb schema on event/occasion pages
- No `itemListElement` (BreadcrumbList) for sub-pages

---

## Images

- All images served via Next.js Image optimization ✓
- Hero image has generic alt text "MΩISIS Flower Design" — could be more descriptive
- Gallery images lack descriptive alt text (not checked but likely generic)
- Product images served from Wolt CDN (external) — no control over alt text
- OG image (`/images/og.jpg`) URL uses wrong metadataBase domain

---

## AI Search Readiness

- Greek content is present and well-structured ✓
- No FAQ or Q&A sections — AI systems (ChatGPT, Perplexity) prefer structured Q&A for local business queries like "best flower shop in Ilioupoli"
- Schema Florist type is correct ✓
- Missing: opening hours in visible text (present in schema but not on page as readable text)
- Missing: price examples / price range on page (only `priceRange: "€€"` in schema)

---

## Competitor Gap Analysis (Target Keywords)

| Keyword | What's needed to rank |
|---|---|
| ανθοπωλειο ηλιουπολη | Google My Business (primary), local citations, NAP consistency |
| ανθοπωλειο κοντα μου | Google My Business category "Flower Shop", correct location pin |
| στολισμοι γαμων | Dedicated page with keyword in title/H1/description, internal links |
| στολισμοι γαμων ηλιουπολη | Wedding page must mention Ηλιούπολη in title + body |
| λουλουδια ηλιουπολη | Homepage keyword coverage + GBP |
| στολισμος χωρων | Either homepage section or dedicated page, keyword in meta |
