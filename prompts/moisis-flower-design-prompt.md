# Moisis Flower Design — Website Build Prompt

Build a complete, production-ready showcase/portfolio website for a **premium flower design** business.

Use the `frontend-design` plugin for ALL UI work. Do NOT make a generic-looking website. This should feel luxurious, elegant, and refined — matching the gold + dark brand identity.

## Business Info

```
Business name:         MΩISIS Flower Design
Tagline:               Curated floral compositions — Defined by quality & detail
Address:               Λεωφ. Δημοκρατίας 86, Ηλιούπολη 163 44
Phone:                 21 0975 2161
Email:                 moisisflowersdesign@gmail.com
Google Maps link:      Λεωφ. Δημοκρατίας 86, Ηλιούπολη 163 44
Wolt:                  https://wolt.com/en/grc/athens/venue/misis-flower-design
Facebook:              https://www.facebook.com/p/Moisis-flower-design-61562042782828/
Instagram:             https://www.instagram.com/moisis_flower_design/
TikTok:                https://www.tiktok.com/@harris_moisis
Working hours:         Mon-Fri 09:00-22:00, Sat 10:00-22:00, Sun 10:00-21:00
Languages:             Greek (default), English
Owner:                 Harris (Χάρης) / Moisis (Μωυσής)
```

## Brand Identity & Color Palette

Derived from the logo (gold lotus on dark background):

```
--gold:       #C4A962   (primary accent — CTAs, highlights, headings, hover states)
--gold-light: #D4BE82   (lighter gold for hover/active states)
--dark:       #2A2A2A   (dark backgrounds, dark mode base)
--darker:     #1A1A1A   (navbar, footer, deepest backgrounds)
--cream:      #F5F0E8   (light mode backgrounds, text on dark)
--cream-dark: #E8E0D0   (secondary light surfaces)
```

The site should feel like the logo — elegant gold on sophisticated dark tones. NOT generic green like competitor sites.

### Typography

- **Headings**: A refined serif font — Playfair Display or Cormorant Garamond (supports Greek characters)
- **Body**: A clean sans-serif — Manrope or DM Sans (supports Greek)
- Do NOT use Inter/Roboto/Arial. The typography should feel premium and match the floral luxury brand.

## Images I Provide

- Logo: `app/moisis_logo_clean_bg.png` (gold lotus + MΩISIS text on dark background)
- Hero background: Will need a stunning floral arrangement photo — download from Pexels (search "luxury flower arrangement dark background" or "premium bouquet dark")
- Gallery photos: Source from the business Instagram (@moisis_flower_design) and Google Business listing. For any gaps, use high-quality Pexels photos of premium floral arrangements.
- Event portfolio: Will need event-specific photos (wedding florals, baptism decorations, graduation flowers, corporate events) — use Pexels with careful visual verification.

For any images I DON'T have, download real photos from Pexels. Search by keyword, verify EACH image visually matches its intended use before keeping it. Pexels IDs are unreliable — always verify after downloading.

## Site Structure

This is a **showcase/portfolio** site — NO e-commerce, NO shopping cart, NO checkout. The Wolt link handles online ordering. Contact form handles custom/event inquiries.

### Homepage Sections (top to bottom)

1. **Navbar** — Fixed, fully transparent over hero (glass effect), transitions to solid on scroll. Logo left, nav links center, icon buttons right (phone icon, Wolt icon, language switcher, theme switcher). Keep it minimal and icon-driven when transparent. Mobile: full slide-in panel from right with backdrop blur overlay (NOT a simple dropdown). Toggle `border-transparent`/`border-border` on scroll (not `border-b` on/off) to avoid transition flicker.

2. **Hero** — Full viewport height, beautiful floral background image with dark gradient overlay. Content:
   - Headline: "MΩISIS Flower Design" (or translated tagline)
   - Subheadline: "Curated floral compositions — Events • Custom Arrangements • Seasonal Design"
   - Location badge: "Ηλιούπολη" with map pin icon
   - **Wolt Order Button** — This is the STAR of the hero. Transparent background with Wolt blue (#009DE0) outline/border, the actual Wolt logo image inside (downloaded locally to `public/images/wolt-logo.png`). Optional "Παράγγειλε" text next to logo. Hover: subtle blue fill at low opacity. Must be impossible to miss but still elegant — not a cheap flashing banner. Opens Wolt link in new tab.
   - Secondary CTA: "Επικοινωνία / Contact Us" linking to contact section
   - Phone number clickable

3. **About** — Who is Moisis/Harris. The philosophy behind the craft. Emphasize: quality, detail, creativity, fresh flowers that last. Two-column layout: text left, highlight cards right.
   - 3 highlight cards with icons:
     - Ποιότητα / Quality — Fresh flowers, long-lasting arrangements
     - Δημιουργικότητα / Creativity — Unique designs for every occasion
     - Εξυπηρέτηση / Service — Personal attention, from consultation to delivery

4. **Περιστάσεις (Occasions)** — 6 cards in a responsive grid. Each card: REAL PHOTO with gradient overlay + title + short description. Hover: zoom + shadow + lift. These are occasion-based flower categories:
   ```
   - Αγάπη / Love — Romantic bouquets and arrangements for your special someone
   - Γέννηση / Birth — Welcome new life with beautiful floral gifts
   - Συγχαρητήρια / Congratulations — Celebrate achievements with flowers
   - Συλλυπητήρια / Condolence — Respectful sympathy arrangements
   - Διακόσμηση χώρου με φυτά / Space Decoration with Plants — Transform spaces with greenery
   - Ανθοδέσμες για κάθε περίσταση / Bouquets for Every Occasion — Custom bouquets tailored to you
   ```

5. **Εκδηλώσεις (Events)** — 4 cards linking to dedicated event pages. Each card: large photo background, gradient overlay, event type title, short teaser text, "Δείτε περισσότερα / See more" link. These should feel premium and portfolio-like.
   ```
   - Γάμος / Wedding — Complete wedding floral design & decoration
   - Βάπτισμα / Christening — Beautiful baptism ceremony florals
   - Ορκωμοσία / Graduation — Celebrate with elegant arrangements
   - Εταιρικά / Corporate — Professional event florals & office decoration
   ```

6. **Gallery** — Masonry grid of the best work. Click opens lightbox with: close button, left/right arrows, keyboard nav (Escape, Arrow keys), image counter, caption, body scroll lock. Show 8-12 curated photos.

7. **Reviews** — Customer testimonials carousel/grid. Star ratings, customer names, review text. Overall rating badge (5/5 from Google). Use these real reviews:
   ```
   - Typical Lex (5/5, 1 year ago): "My husband gets me the most BEAUTIFUL flowers from here 1-2 times a month and they NEVER disappoint!! They are always fresh and last for literal weeks. Harris is a creative genius with his bouquet designs, and I'm wowed every. single. time."
   - G full on (5/5, 3 months ago): "Έκανα τον γάμο μου με στολισμό από το Moisis Flower και πραγματικά ήταν όνειρο! Όλα ήταν προσεγμένα μέχρι την τελευταία λεπτομέρεια..."
   - Αλεξανδρα Στιγκα (5/5, 5 months ago): "Η ποιότητα, η ποικιλία αλλά και η ομορφιά των δημιουργιών αυτού του ανθοπωλείου ειλικρινά δεν συναντάται εύκολα..."
   - Μαρθα Μακ (5/5, 5 months ago): "Εμπιστευτήκαμε το Χάρη για το στολισμό του γάμου μας. Ότι και να πω είναι λίγο! Ήταν όλα πολύ καλύτερα απ'ότι μπορούσαμε να φανταστούμε."
   - stavroula haldoupi (5/5, 3 months ago): "Είχα καιρό να μπω σε τόσο όμορφο, περιποιημένο και γεμάτο επιλογές ανθοπωλείο! Επιχείρηση με σύγχρονη και νεανική ματιά!"
   - βασια μπουρ (5/5, 6 months ago): "Ότι ανθοδέσμες έχω πάρει, είναι πάντα προσεγμένες και τα λουλούδια φρέσκα, κρατάνε πολλές μέρες."
   - A G (5/5, 1 year ago): "Ίσως το ομορφότερο Flower design shop που υπάρχει σήμερα στην περιοχή της Ηλιούπολης."
   - anna papoydh (5/5, 1 year ago): "Εξαιρετική εξυπηρέτηση! Πολύ καλές τιμές όμορφο περιβάλλον!! Τα τριαντάφυλλα έχουν μεγάλη διάρκεια!"
   - Έλενα Δημοβασίλη (5/5, 8 months ago): "Ο Χάρης ανέλαβε τον στολισμό του γάμου μας! Έδειξε πάρα πολλή προσοχή στη λεπτομέρεια και το αποτέλεσμα ήταν θεαματικό."
   - Eleni K (5/5, 2 months ago): "Ένα υπέροχο ανθοπωλείο-έκπληξη! Ωραία άνθη, συνθέσεις, μεγάλη ποικιλία σε κασπώ, ευγενική και καλοσυνάτη υπάλληλος."
   ```

8. **Contact** — Left side: contact info (address, phone, email, working hours) + embedded Google Map. Right side: contact form (name, email, phone, subject dropdown, message) that sends via mailto to moisisflowersdesign@gmail.com. Working hours displayed nicely.

9. **Footer** — Brand logo + name, quick links (sections + event pages), contact info, social icons (Instagram, Facebook, TikTok) using the `SocialIcon` component from `components/social-icon.tsx`, embedded mini map, copyright.

### Dedicated Event Pages

Route: `/[locale]/events/[event-slug]`

Each event type gets its own page with:
- **Hero banner** — Event-specific photo with dark overlay + event title + short description
- **About the service** — 2-3 paragraphs describing what Moisis offers for this event type
- **Portfolio gallery** — Masonry grid of past work photos (with lightbox)
- **CTA section** — "Κλείστε ραντεβού / Book a consultation" button linking to contact form
- **Back to events** link

Event slugs:
- `/events/wedding` — Γάμος
- `/events/christening` — Βάπτισμα
- `/events/graduation` — Ορκωμοσία
- `/events/corporate` — Εταιρικά

## Social Icons

Use the existing `SocialIcon` component (`components/social-icon.tsx`) for all social media links. Add a TikTok entry to the COLOR_CLASSES if not already present. Social links appear in:
- Footer (always)
- Mobile menu
- Contact section

## Wolt Integration

The Wolt button is a KEY feature. Download the Wolt logo locally to `public/images/wolt-logo.png` (the light blue cursive "Wolt" wordmark — color #009DE0).

**Wolt button styling:**
- **Transparent background** with a **border/outline in Wolt blue (#009DE0)**
- Wolt logo image inside the button (not text — use the actual logo)
- Optional: "Παράγγειλε / Order" text next to the logo
- Rounded corners, elegant padding
- Hover: subtle fill with Wolt blue at low opacity (e.g. `bg-[#009DE0]/10`)
- The button should feel premium and match the site's elegance — not a cheap banner ad

It should appear in:
1. **Hero section** — Primary CTA, prominent and beautiful, the STAR of the hero
2. **Navbar** — Small Wolt icon/logo (visible but not overwhelming)
3. **Footer** — Link with Wolt branding

The Wolt URL: `https://wolt.com/en/grc/athens/venue/misis-flower-design`

Do NOT embed Wolt — just link to it externally (opens in new tab).

## Tech Stack

- Next.js with App Router + React Server Components
- next-intl for i18n (messages/el.json as PRIMARY, messages/en.json as secondary)
- Tailwind CSS 4 with CSS variables + oklch colors
- shadcn/ui (install via `npx shadcn@latest add [component]`)
- Lucide React icons
- next-themes for dark mode (class strategy)
- TypeScript strict mode

## Design Rules

- **Color palette**: Use the gold + dark palette defined above. Define as CSS variables in globals.css. The gold should be the hero color — used for CTAs, highlights, borders, hover states.
- **Typography**: Serif headings (Playfair Display/Cormorant Garamond) + sans-serif body (Manrope/DM Sans). Must support Greek characters.
- **Real photos over icons**: For occasions and events, use actual photos with gradient overlays. Only use Lucide icons for small UI elements and highlight cards.
- **Dark mode**: Every section must work in light AND dark. The dark mode should feel natural for this brand (gold on dark is the primary identity).
- **Mobile responsive**: Test at 375px. Mobile menu = slide-in panel with backdrop blur, never a cramped dropdown.
- **Smooth scrolling**: `scroll-behavior: smooth` on html. All anchor links scroll smoothly.
- **Hover states**: Every clickable element needs cursor-pointer + visible hover effect with gold accent.
- **Transitions**: Use duration-300 on all state changes. No jarring jumps.
- **Greek-first**: All default text, placeholders, and primary content in Greek. English is the translation, not the other way around.

## Architecture Rules

- Server Components by default. Add "use client" only for interactivity.
- For sections needing both i18n AND interactivity: server wrapper (getTranslations) renders a client child (useTranslations + useState).
- Extract ALL business data (phone, email, URLs, socials, hours) into `lib/general/constants.ts` as a single object. Never hardcode in components.
- Every user-visible string in messages/el.json (primary) and messages/en.json (secondary). No hardcoded display text.
- shadcn/ui goes in `components/ui/`. Custom components go in `components/`.
- Reviews data in a separate constant or JSON file — not inline in components.

## Image Downloads

When downloading from Pexels:
1. Search pexels.com for the specific keyword (use luxury/premium flower-related terms)
2. Pick a photo that ACTUALLY matches the service (not just vaguely related)
3. Download at w=800 quality
4. View/verify the image after downloading — if wrong, search again
5. Save to appropriate paths:
   - `public/images/hero/` — hero backgrounds
   - `public/images/occasions/` — occasion category photos (love, birth, congratulations, condolence, plants, bouquets)
   - `public/images/events/` — event page photos (wedding, christening, graduation, corporate)
   - `public/images/gallery/` — general gallery photos
   - `public/images/reviews/` — reviewer avatars (if needed)

## Competitor Reference

Petridis LV (petridislv.gr) is the main competitor. They have:
- Full e-commerce Shopify site with 26 product collections
- Events section with dedicated wedding portfolio pages (13+ venues)
- Dark green + gold color scheme
- Trirong + Poppins fonts

**We beat them by**: Better design quality, cleaner UX (showcase not e-commerce clutter), stronger brand identity (gold + dark matching the logo), Wolt integration for easy ordering, more elegant typography, better mobile experience.

## After Building

1. `pnpm lint` + `pnpm tsc --noEmit` — fix all errors
2. Test Greek (default) and English languages
3. Test dark mode (should feel native to brand)
4. Test mobile menu (slide-in panel)
5. Test gallery lightbox (click, arrows, keyboard, close)
6. Test contact form
7. Test all anchor links scroll smoothly
8. Test Wolt button links correctly
9. Test all event pages load and display correctly
10. Test all social links open in new tabs
11. Screenshot and visually verify each section
12. Run code simplifier to deduplicate and extract constants
13. Commit with conventional commit prefixes (feat:, fix:, refactor:)
