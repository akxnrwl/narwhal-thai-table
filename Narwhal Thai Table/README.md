# Narwhal Thai Table

A Next.js 15 (App Router + TypeScript) marketing site for Narwhal Thai Table, Huntington Beach, CA.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Available scripts

| Command              | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `npm run dev`        | Local dev server with hot reload                          |
| `npm run build`      | Production build (statically prerenders all dish pages)   |
| `npm start`          | Start the production server (after `build`)               |
| `npm run lint`       | ESLint via `next lint`                                    |
| `npm run typecheck`  | TypeScript type check (no emit)                           |

## Project layout

```
app/
  layout.tsx              Global <html>, <Nav>, <Footer>, metadata
  page.tsx                / — home (hero + story + chef + menu preview + reserve + contact)
  globals.css             All brand tokens, base resets, component styles, breakpoints
  menu/
    page.tsx              /menu — full menu with ARIA tabs (horizontal scroll on mobile)
    [slug]/page.tsx       /menu/[slug] — dish detail page (statically generated for every dish)
    [slug]/not-found.tsx  404 inside the menu route
components/
  Nav.tsx                 Sticky nav + mobile hamburger + drawer (Save a Seat lives in ONE place per breakpoint)
  Footer.tsx              Brand + socials
  Hero.tsx                Hero with video fallback
  HomeSections.tsx        Story / Chef / MenuPreview / Experience / Reserve / Contact
  MenuTabs.tsx            ARIA tabs + horizontal scroll on mobile
  ReserveForm.tsx         Reservation form (front-end only; wire backend later)
  MediaFrame.tsx          Universal photo/video container (wraps next/image)
  FadeUp.tsx              IntersectionObserver-based fade-in
  NarwhalMark.tsx         Decorative SVG used in the hero card
lib/
  dishes.ts               Single source of truth for every dish + the long-form stories
  categories.ts           Category IDs and labels
public/
  images/                 Drop dish/restaurant photos here
  media/                  Drop the hero video here
_legacy/
  index.html              The original single-file prototype, kept for reference
```

## Adding a real photo to a dish

Drop the file in `/public/images/dishes/`, then in `lib/dishes.ts` add:

```ts
{
  slug: 'crying-tiger',
  // ...existing fields
  image: { src: '/images/dishes/crying-tiger.jpg', alt: 'Crying Tiger — grilled rib-eye sliced over jaew' },
},
```

The detail page already wires `dish.image` into `<MediaFrame>` and will fade out the placeholder automatically.

## Adding a story to a dish

Three dishes ship with full stories (OG Pad Thai, Tom Kha, Crying Tiger). To add one to any other dish, edit `lib/dishes.ts`:

```ts
{
  slug: 'panang-curry',
  // ...
  ingredients: [ /* ... */ ],
  allergens: ['peanut', 'shellfish'],
  pairing: { drink: '...', sides: ['Sticky Rice'] },
  story: {
    lede: '...',         // shown right under the title
    history: '...',      // multi-paragraph supported (separate with blank lines)
    howToEat: '...',
    chefNote: '...',     // first-person Chef Namfon quote
  },
},
```

Pages without `story` show a friendly "story coming soon" line — they don't break.

## Hero video

`components/Hero.tsx` has a `<video>` whose `<source>` is commented out. Drop your file at `public/media/wok.mp4` and uncomment the source:

```tsx
<source src="/media/wok.mp4" type="video/mp4" />
```

The animated fallback (orange/brass glow) keeps the hero alive until the video plays. Recommended: 1080p, 8–15s, seamless loop, muted, under 4MB.

## Reservation form backend

`components/ReserveForm.tsx` currently shows an inline confirmation message on submit. To wire it to a real endpoint:

1. Pick a backend — Formspree, Resend, a Next.js API route at `app/api/reserve/route.ts`, etc.
2. In `handleSubmit`, replace the `setTimeout` block with a `fetch('/api/reserve', { method: 'POST', body: new FormData(form) })`.
3. The honeypot field (`name="company"`) should be checked server-side too — if it's filled, drop the submission silently.

## Deployment

Vercel is the smoothest path (created by the Next.js team):

```bash
npx vercel
```

For any other host (Netlify, Cloudflare Pages, your own server), `npm run build` produces a `.next/` directory; serve it with `npm start` behind a reverse proxy.

## Outstanding placeholders

These are intentional — they have inline `TODO`-style comments where they live:

- 4 social URLs in `Footer.tsx` (Instagram / Facebook / Yelp / Google)
- Phone number `(714) 000-0000` in `HomeSections.tsx`
- `og:image` and `og:url` in `app/layout.tsx`
- Hero video source in `Hero.tsx`
- Real photography for hero card, story, chef, dish details
- Reservation form backend
- 10 dishes still need long-form stories (the other 3 are written)
