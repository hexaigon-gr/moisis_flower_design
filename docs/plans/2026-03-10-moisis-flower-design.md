# Moisis Flower Design — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium showcase/portfolio website for MΩISIS Flower Design — a luxury flower shop in Ilioupoli, Athens.

**Architecture:** Next.js 16 App Router with next-intl (Greek-first), Tailwind CSS 4 with gold+dark brand palette, shadcn/ui components, server/client split pattern for i18n+interactivity. Homepage with 9 sections + 4 dedicated event pages. No e-commerce — Wolt handles ordering.

**Tech Stack:** Next.js 16.1.1, React 19, next-intl 4.7, Tailwind CSS 4, shadcn/ui, Lucide React, next-themes, Zustand, TypeScript strict.

**Design Reference:** See `prompts/moisis-flower-design-prompt.md` for full spec. Use `frontend-design` skill for ALL UI work.

---

## Phase 1: Foundation

### Task 1: Switch default locale to Greek

**Files:**
- Modify: `lib/i18n/routing.ts`

**Step 1: Update locale order**

Change `SUPPORTED_LOCALES` so Greek is first (default):

```typescript
export const SUPPORTED_LOCALES = ["el", "en"] as const;
```

This makes `el` the defaultLocale since it uses `SUPPORTED_LOCALES[0]`.

**Step 2: Verify it works**

Run: `pnpm dev` — visiting `localhost:3000` should redirect to `/el`.

**Step 3: Commit**

```bash
git add lib/i18n/routing.ts
git commit -m "feat: switch default locale to Greek (el)"
```

---

### Task 2: Create business constants

**Files:**
- Create: `lib/general/constants.ts`

**Step 1: Create the constants file**

```typescript
export const BUSINESS = {
  name: "MΩISIS Flower Design",
  tagline: "Curated floral compositions — Defined by quality & detail",
  owner: "Χάρης (Harris) / Μωυσής (Moisis)",
  address: {
    street: "Λεωφ. Δημοκρατίας 86",
    city: "Ηλιούπολη",
    zip: "163 44",
    full: "Λεωφ. Δημοκρατίας 86, Ηλιούπολη 163 44",
  },
  phone: "21 0975 2161",
  phoneHref: "tel:+302109752161",
  email: "moisisflowersdesign@gmail.com",
  wolt: "https://wolt.com/en/grc/athens/venue/misis-flower-design",
  socials: {
    facebook: "https://www.facebook.com/p/Moisis-flower-design-61562042782828/",
    instagram: "https://www.instagram.com/moisis_flower_design/",
    tiktok: "https://www.tiktok.com/@harris_moisis",
  },
  hours: {
    weekdays: { open: "09:00", close: "22:00" },
    saturday: { open: "10:00", close: "22:00" },
    sunday: { open: "10:00", close: "21:00" },
  },
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.5!2d23.75!3d37.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU1JzQ4LjAiTiAyM8KwNDUnMDAuMCJF!5e0!3m2!1sel!2sgr!4v1",
} as const;

export const OCCASIONS = [
  { slug: "love", icon: "Heart" },
  { slug: "birth", icon: "Baby" },
  { slug: "congratulations", icon: "PartyPopper" },
  { slug: "condolence", icon: "Flower2" },
  { slug: "plants", icon: "TreePine" },
  { slug: "bouquets", icon: "Flower" },
] as const;

export const EVENTS = [
  { slug: "wedding" },
  { slug: "christening" },
  { slug: "graduation" },
  { slug: "corporate" },
] as const;

export const REVIEWS = [
  {
    name: "Typical Lex",
    rating: 5,
    timeAgo: "1 year ago",
    text: "My husband gets me the most BEAUTIFUL flowers from here 1-2 times a month and they NEVER disappoint!! They are always fresh and last for literal weeks. Harris is a creative genius with his bouquet designs, and I'm wowed every. single. time.",
    lang: "en",
  },
  {
    name: "G full on",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Έκανα τον γάμο μου με στολισμό από το Moisis Flower και πραγματικά ήταν όνειρο! Όλα ήταν προσεγμένα μέχρι την τελευταία λεπτομέρεια — μοναδικές συνθέσεις, φίνα…",
    lang: "el",
  },
  {
    name: "Αλεξάνδρα Στίγκα",
    rating: 5,
    timeAgo: "5 months ago",
    text: "Η ποιότητα, η ποικιλία αλλά και η ομορφιά των δημιουργιών αυτού του ανθοπωλείου ειλικρινά δεν συναντάται εύκολα. Είναι κοσμήμα για την περιοχή.",
    lang: "el",
  },
  {
    name: "Μαρθα Μακ",
    rating: 5,
    timeAgo: "5 months ago",
    text: "Εμπιστευτήκαμε το Χάρη για το στολισμό του γάμου μας. Ότι και να πω είναι λίγο! Ήταν όλα πολύ καλύτερα απ'ότι μπορούσαμε να φανταστούμε.",
    lang: "el",
  },
  {
    name: "stavroula haldoupi",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Είχα καιρό να μπω σε τόσο όμορφο, περιποιημένο και γεμάτο επιλογές ανθοπωλείο! Επιχείρηση με σύγχρονη και νεανική ματιά!",
    lang: "el",
  },
  {
    name: "βασια μπουρ",
    rating: 5,
    timeAgo: "6 months ago",
    text: "Ότι ανθοδέσμες έχω πάρει, είναι πάντα προσεγμένες και τα λουλούδια φρέσκα, κρατάνε πολλές μέρες. Εξυπηρέτηση πάντα άψογη!!!",
    lang: "el",
  },
  {
    name: "A G",
    rating: 5,
    timeAgo: "1 year ago",
    text: "Ίσως το ομορφότερο Flower design shop που υπάρχει σήμερα στην περιοχή της Ηλιούπολης.",
    lang: "el",
  },
  {
    name: "anna papoydh",
    rating: 5,
    timeAgo: "1 year ago",
    text: "Εξαιρετική εξυπηρέτηση! Πολύ καλές τιμές όμορφο περιβάλλον!! Τα τριαντάφυλλα έχουν μεγάλη διάρκεια!",
    lang: "el",
  },
  {
    name: "Έλενα Δημοβασίλη",
    rating: 5,
    timeAgo: "8 months ago",
    text: "Ο Χάρης ανέλαβε τον στολισμό του γάμου μας! Έδειξε πάρα πολλή προσοχή στη λεπτομέρεια και το αποτέλεσμα ήταν θεαματικό.",
    lang: "el",
  },
  {
    name: "Eleni K",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Ένα υπέροχο ανθοπωλείο-έκπληξη! Ωραία άνθη, συνθέσεις, μεγάλη ποικιλία σε κασπώ, ευγενική και καλοσυνάτη υπάλληλος.",
    lang: "el",
  },
] as const;
```

**Step 2: Commit**

```bash
git add lib/general/constants.ts
git commit -m "feat: add business constants (contact, socials, reviews, occasions, events)"
```

---

### Task 3: Brand color palette + typography in globals.css

**Files:**
- Modify: `app/[locale]/globals.css`
- Modify: `app/[locale]/layout.tsx`

**Step 1: Add Google Fonts**

In `layout.tsx`, replace Roboto with Cormorant Garamond (serif headings) + Manrope (sans-serif body). Both support Greek. Import via `next/font/google`.

```typescript
import { Cormorant_Garamond, Manrope } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const manrope = Manrope({
  subsets: ["latin", "greek"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});
```

Apply both font variables to `<html>` className.

**Step 2: Update globals.css with brand colors**

Replace the generic shadcn colors with Moisis brand palette. Key additions:

```css
:root {
  /* Brand colors */
  --gold: oklch(0.74 0.1 85);       /* #C4A962 */
  --gold-light: oklch(0.8 0.09 85);  /* #D4BE82 */
  --cream: oklch(0.96 0.015 80);     /* #F5F0E8 */
  --cream-dark: oklch(0.91 0.02 80); /* #E8E0D0 */
  --forest: oklch(0.2 0.01 260);     /* #1A1A1A */
  --wolt-blue: oklch(0.62 0.16 230); /* #009DE0 */

  /* Map gold to primary */
  --primary: var(--gold);
  --primary-foreground: oklch(0.15 0.01 80); /* dark text on gold */

  /* Light mode: cream backgrounds */
  --background: var(--cream);
  --foreground: oklch(0.2 0.02 260);
  --card: oklch(1 0 0);
  /* ... rest of light mode */
}

.dark {
  /* Dark mode: dark backgrounds, gold accents */
  --background: oklch(0.18 0.01 260);  /* ~#2A2A2A */
  --foreground: var(--cream);
  --card: oklch(0.2 0.015 260);
  /* ... rest of dark mode */
}
```

Add to `@theme inline`:
```css
--font-heading: var(--font-heading);
--font-body: var(--font-body);
--color-gold: var(--gold);
--color-gold-light: var(--gold-light);
--color-cream: var(--cream);
--color-cream-dark: var(--cream-dark);
--color-forest: var(--forest);
--color-wolt-blue: var(--wolt-blue);
```

Add smooth scrolling:
```css
html {
  scroll-behavior: smooth;
}
```

**Step 3: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/el foundation`

**Step 4: Commit**

```bash
git add app/[locale]/globals.css app/[locale]/layout.tsx
git commit -m "feat: brand color palette (gold+dark) and premium typography (Cormorant+Manrope)"
```

---

### Task 4: Download images from Pexels + Wolt logo

**Files:**
- Create: `public/images/` directory structure
- Download: hero, occasions, events, gallery images + Wolt logo

**Step 1: Create directory structure**

```bash
mkdir -p public/images/{hero,occasions,events,gallery}
```

**Step 2: Download Wolt logo**

Download the Wolt blue wordmark logo and save to `public/images/wolt-logo.png`.

**Step 3: Download hero image**

Search Pexels for "luxury flower arrangement dark background" or "premium bouquet dark moody". Download at w=800. Save to `public/images/hero/hero.jpg`. Verify visually.

**Step 4: Download occasion images (6)**

Search Pexels and download for each:
- `public/images/occasions/love.jpg` — romantic red roses bouquet
- `public/images/occasions/birth.jpg` — soft pastel baby flower arrangement
- `public/images/occasions/congratulations.jpg` — celebratory colorful bouquet
- `public/images/occasions/condolence.jpg` — white sympathy wreath/arrangement
- `public/images/occasions/plants.jpg` — indoor plants, greenery decoration
- `public/images/occasions/bouquets.jpg` — elegant mixed bouquet

Verify EACH image visually after downloading.

**Step 5: Download event images (4)**

- `public/images/events/wedding.jpg` — wedding floral decoration/arch
- `public/images/events/christening.jpg` — baptism ceremony flowers
- `public/images/events/graduation.jpg` — graduation flowers/celebration
- `public/images/events/corporate.jpg` — corporate event florals

**Step 6: Download gallery images (8-12)**

Search for various premium floral arrangements. Save as `public/images/gallery/1.jpg` through `public/images/gallery/12.jpg`. Variety: bouquets, table settings, close-ups, arrangements in vases.

**Step 7: Commit**

```bash
git add public/images/
git commit -m "feat: add hero, occasion, event, gallery images and Wolt logo"
```

---

### Task 5: Write translation files

**Files:**
- Rewrite: `messages/el.json` (Greek primary — complete)
- Rewrite: `messages/en.json` (English secondary — complete)

**Step 1: Write el.json**

Full Greek translations for all sections: Nav, Hero, About, Occasions (6), Events (4), Gallery, Reviews, Contact, Footer, Event pages. Keep existing Admin translations.

**Step 2: Write en.json**

Mirror structure with English translations. Keep existing Admin translations.

Key translation namespaces:
```
Nav: { home, about, occasions, events, gallery, reviews, contact, orderOnWolt }
Hero: { headline, subheadline, location, woltButton, contactButton, phone }
About: { title, description, highlights: { quality, creativity, service } }
Occasions: { title, subtitle, items: { love, birth, congratulations, condolence, plants, bouquets } }
Events: { title, subtitle, seeMore, items: { wedding, christening, graduation, corporate } }
Gallery: { title, subtitle }
Reviews: { title, subtitle, overallRating, fromGoogle }
Contact: { title, subtitle, form: { name, email, phone, subject, message, send }, hours: { title, weekdays, saturday, sunday } }
Footer: { quickLinks, contact, followUs, copyright, madeWith }
EventPage: { backToEvents, bookConsultation, portfolio }
```

**Step 3: Commit**

```bash
git add messages/el.json messages/en.json
git commit -m "feat: complete Greek and English translations for all sections"
```

---

## Phase 2: Homepage Sections

> **IMPORTANT:** Use the `frontend-design` skill for EVERY section. Screenshot after each section.

### Task 6: Navbar

**Files:**
- Create: `components/navbar.tsx` (client component — scroll detection, mobile menu state)
- Modify: `app/[locale]/layout.tsx` (add Navbar to layout)

**Design spec:**
- Fixed position, z-50
- **Transparent with glass effect** over hero (backdrop-blur when scrolled)
- Transitions to solid `bg-background` on scroll
- Toggle `border-transparent` / `border-border` (NOT `border-b` on/off)
- **Left:** Logo image (from `app/moisis_logo_clean_bg.png` — move to `public/images/logo.png`)
- **Center:** Nav links (Αρχική, Σχετικά, Περιστάσεις, Εκδηλώσεις, Gallery, Κριτικές, Επικοινωνία)
- **Right:** Phone icon (clickable tel: link), small Wolt logo (clickable), LanguageSwitcher, ThemeSwitcher
- **Mobile:** Hamburger icon → slide-in panel from right with backdrop blur overlay, nav links, social icons, Wolt button
- All transitions `duration-300`

**After building:** Screenshot at top of page (transparent) and after scrolling (solid).

**Commit:**
```bash
git commit -m "feat: transparent navbar with glass effect, mobile slide-in menu"
```

---

### Task 7: Hero Section

**Files:**
- Create: `components/hero-section.tsx` (server wrapper)
- Create: `components/hero-content.tsx` (client child — for any animations)
- Modify: `app/[locale]/page.tsx` (replace placeholder with Hero)

**Design spec:**
- Full viewport height (`min-h-screen`)
- Background: hero image with dark gradient overlay (`bg-linear-to-t from-black/70 via-black/40 to-black/30`)
- Content centered vertically and horizontally
- **Headline:** Business name in heading font, white, large
- **Subheadline:** Tagline text, cream/muted, smaller
- **Location badge:** Pill with MapPin icon + "Ηλιούπολη"
- **Wolt button (STAR):** `<a>` styled with transparent bg, 2px border in Wolt blue (#009DE0), Wolt logo image inside (`public/images/wolt-logo.png`), "Παράγγειλε" text next to logo, rounded-lg, px-6 py-3. Hover: `bg-[#009DE0]/10`. Opens in new tab.
- **Secondary CTA:** Gold outline button → scrolls to contact section
- **Phone:** Clickable phone number link

**After building:** Screenshot hero at full viewport.

**Commit:**
```bash
git commit -m "feat: hero section with Wolt CTA button and dark gradient overlay"
```

---

### Task 8: About Section

**Files:**
- Create: `components/about-section.tsx` (server component with getTranslations)

**Design spec:**
- Section with `id="about"`
- Two-column layout: text left (60%), highlight cards right (40%)
- Left: Section title (gold accent underline) + 2-3 paragraphs about Harris/Moisis philosophy
- Right: 3 stacked cards with CircleIcon (gold bg) + title + description
  - Ποιότητα (Award icon)
  - Δημιουργικότητα (Sparkles icon)
  - Εξυπηρέτηση (Heart icon)
- Responsive: stacks on mobile

**After building:** Screenshot about section.

**Commit:**
```bash
git commit -m "feat: about section with philosophy text and highlight cards"
```

---

### Task 9: Occasions Section (Περιστάσεις)

**Files:**
- Create: `components/occasions-section.tsx` (server wrapper)
- Create: `components/occasions-grid.tsx` (client child — hover effects)

**Design spec:**
- Section with `id="occasions"`
- Section title + subtitle centered
- 3-column responsive grid (2 on tablet, 1 on mobile)
- 6 cards, each with:
  - Real photo background (from `public/images/occasions/`)
  - Dark gradient overlay
  - Title in white over image
  - Short description on hover or below
  - Hover: `scale-105` + `shadow-xl` + gradient shifts
  - Rounded corners, overflow hidden
- Aspect ratio ~3:4 (portrait cards)

**After building:** Screenshot occasions grid.

**Commit:**
```bash
git commit -m "feat: occasions section with 6 photo cards"
```

---

### Task 10: Events Section (Εκδηλώσεις)

**Files:**
- Create: `components/events-section.tsx` (server wrapper)
- Create: `components/events-grid.tsx` (client child)

**Design spec:**
- Section with `id="events"`
- Section title + subtitle centered
- 2x2 grid on desktop, 1-column on mobile
- 4 large cards linking to `/[locale]/events/[slug]`:
  - Large photo background (from `public/images/events/`)
  - Dark gradient overlay
  - Event title + short teaser
  - "Δείτε περισσότερα →" link with gold color
  - Hover: zoom image + lift card
- Use `Link` from `lib/i18n/navigation.ts` for locale-aware routing

**After building:** Screenshot events grid.

**Commit:**
```bash
git commit -m "feat: events section with 4 portfolio cards linking to dedicated pages"
```

---

### Task 11: Gallery Section with Lightbox

**Files:**
- Create: `components/gallery-section.tsx` (server wrapper)
- Create: `components/gallery-grid.tsx` (client child — lightbox state)

**Design spec:**
- Section with `id="gallery"`
- Masonry-style grid (CSS columns or grid with varying row spans)
- 8-12 photos from `public/images/gallery/`
- Click opens lightbox:
  - Full-screen overlay with dark backdrop
  - Current image centered, max-w-4xl
  - Close button (X) top-right
  - Left/Right arrows on sides
  - Image counter "3 / 12"
  - Keyboard nav: Escape closes, Arrow keys navigate
  - Body scroll lock when open
- Smooth transitions on open/close

**After building:** Screenshot gallery grid + lightbox open.

**Commit:**
```bash
git commit -m "feat: gallery masonry grid with full lightbox (keyboard nav, counter)"
```

---

### Task 12: Reviews Section

**Files:**
- Create: `components/reviews-section.tsx` (server wrapper)
- Create: `components/reviews-carousel.tsx` (client child — carousel/scroll)

**Design spec:**
- Section with `id="reviews"`
- Overall rating badge: large "5.0" + 5 gold stars + "Google Reviews" label
- Horizontally scrollable row of review cards (or auto-play carousel)
- Each card:
  - Customer name (bold)
  - 5 gold stars
  - Time ago (muted)
  - Review text (line-clamp-4, expand on click)
  - Google "G" icon badge
- Cards have subtle border, rounded, card background
- Use reviews from `REVIEWS` constant in `constants.ts`

**After building:** Screenshot reviews section.

**Commit:**
```bash
git commit -m "feat: reviews section with Google rating badge and scrollable cards"
```

---

### Task 13: Contact Section

**Files:**
- Create: `components/contact-section.tsx` (server wrapper)
- Create: `components/contact-form.tsx` (client child — form state)

**Design spec:**
- Section with `id="contact"`
- Two-column layout:
  - **Left (40%):** Contact info cards (Address with MapPin, Phone with Phone icon, Email with Mail icon, Hours with Clock icon) + embedded Google Maps iframe
  - **Right (60%):** Contact form with shadcn/ui inputs:
    - Name (Input)
    - Email (Input)
    - Phone (Input)
    - Subject (Select dropdown: General, Wedding, Christening, Graduation, Corporate, Other)
    - Message (Textarea)
    - Send button (gold bg, hover gold-light)
  - Form action: `mailto:moisisflowersdesign@gmail.com` with subject and body
- Hours displayed as a mini table:
  - Δευ-Παρ: 09:00-22:00
  - Σάβ: 10:00-22:00
  - Κυρ: 10:00-21:00

**After building:** Screenshot contact section.

**Commit:**
```bash
git commit -m "feat: contact section with form, map, and business hours"
```

---

### Task 14: Footer

**Files:**
- Modify: `components/footer.tsx` (rewrite existing footer)

**Design spec:**
- Dark background (forest/darker color)
- 4-column grid:
  - **Brand:** Logo + name + tagline + short description
  - **Quick Links:** Αρχική, Σχετικά, Περιστάσεις, Εκδηλώσεις, Gallery, Επικοινωνία
  - **Events:** Γάμος, Βάπτισμα, Ορκωμοσία, Εταιρικά (links to event pages)
  - **Contact:** Address, Phone, Email + Social icons (Instagram, Facebook, TikTok via SocialIcon component) + Wolt link
- Bottom bar: Copyright "© 2025 MΩISIS Flower Design" + "Crafted with ❤️"
- Gold accents for headings and hover states
- Responsive: stacks on mobile

**After building:** Screenshot footer.

**Commit:**
```bash
git commit -m "feat: footer with brand, links, events, contact, and social icons"
```

---

### Task 15: Assemble homepage

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1: Replace placeholder content**

Import all sections and render in order:
```tsx
<Navbar />        {/* in layout.tsx actually */}
<HeroSection />
<AboutSection />
<OccasionsSection />
<EventsSection />
<GallerySection />
<ReviewsSection />
<ContactSection />
<Footer />        {/* in layout.tsx actually */}
```

Remove all placeholder/demo content (feature cards, todo demo, etc.).

**Step 2: Screenshot full page**

Take screenshots of each section visible at different scroll positions.

**Step 3: Commit**

```bash
git commit -m "feat: assemble complete homepage with all sections"
```

---

## Phase 3: Event Pages

### Task 16: Event page layout and template

**Files:**
- Create: `app/[locale]/events/[slug]/page.tsx`
- Create: `app/[locale]/events/[slug]/layout.tsx` (optional, if needed)
- Create: `components/event-page-hero.tsx`
- Create: `components/event-page-content.tsx`
- Create: `components/event-portfolio-gallery.tsx` (reuse gallery-grid lightbox)

**Step 1: Create the dynamic event page**

Route: `/[locale]/events/[slug]` where slug = wedding | christening | graduation | corporate

Page structure:
- Validate slug against `EVENTS` constant
- 404 for invalid slugs
- `generateStaticParams()` for all event + locale combos

**Step 2: Event page sections**

Each event page:
1. **Hero banner** — Event photo with dark overlay, event title, short description
2. **About the service** — 2-3 translated paragraphs
3. **Portfolio gallery** — Reuse lightbox component with event-specific images
4. **CTA** — "Κλείστε ραντεβού" gold button → scrolls to or links to homepage contact section
5. **Back link** — "← Πίσω στις Εκδηλώσεις" link

**Step 3: Add event page translations**

Add to messages/el.json and en.json:
```json
"EventPages": {
  "wedding": { "title": "Γάμος", "description": "...", "about": "..." },
  "christening": { "title": "Βάπτισμα", "description": "...", "about": "..." },
  "graduation": { "title": "Ορκωμοσία", "description": "...", "about": "..." },
  "corporate": { "title": "Εταιρικά", "description": "...", "about": "..." }
}
```

**Step 4: Screenshot each event page**

**Step 5: Commit**

```bash
git commit -m "feat: dedicated event pages (wedding, christening, graduation, corporate)"
```

---

## Phase 4: Polish & Verification

### Task 17: Dark mode testing + fixes

**Files:** Various — fix any sections that don't look right in dark mode

**Step 1:** Toggle to dark mode and screenshot every section
**Step 2:** Fix any contrast issues, missing dark variants, or broken layouts
**Step 3:** The dark mode should feel natural — gold on dark IS the primary brand identity

**Commit:**
```bash
git commit -m "fix: dark mode polish across all sections"
```

---

### Task 18: Mobile responsive testing + fixes

**Step 1:** Screenshot at 375px width for every section
**Step 2:** Fix any layout breaks, text overflow, touch target sizes
**Step 3:** Verify mobile menu works (slide-in, backdrop, body scroll lock)
**Step 4:** Verify Wolt button is prominent on mobile hero

**Commit:**
```bash
git commit -m "fix: mobile responsive polish (375px)"
```

---

### Task 19: Lint + TypeScript + final verification

**Step 1: Run linters**

```bash
pnpm lint
pnpm tsc --noEmit
```

Fix all errors (not warnings).

**Step 2: Functional tests**

- [ ] Greek locale loads as default
- [ ] English locale works
- [ ] All nav links scroll smoothly to sections
- [ ] Wolt button opens in new tab
- [ ] Phone number is clickable (tel: link)
- [ ] Email link works
- [ ] Gallery lightbox: open, arrows, keyboard, close
- [ ] Mobile menu: open, close, links work
- [ ] All 4 event pages load correctly
- [ ] Contact form submit works (mailto)
- [ ] Social links open in new tabs
- [ ] Dark/light mode toggle works
- [ ] Language switcher works

**Step 3: Final screenshots of complete site**

**Step 4: Commit**

```bash
git commit -m "chore: lint fixes and final verification"
```

---

### Task 20: Code simplification

**Step 1:** Run the `simplify` skill to review all changed code
**Step 2:** Extract any duplicated patterns
**Step 3:** Verify no hardcoded strings remain (all in translations or constants)

**Commit:**
```bash
git commit -m "refactor: code simplification and deduplication"
```
