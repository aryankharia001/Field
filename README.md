# FIELD — Agency Website

A production-quality, animation-driven website for a web development agency,
built with React, Vite, Tailwind CSS, GSAP (ScrollTrigger + SplitText) and
Lenis for smooth scrolling.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## What to edit before launch

Everything below is centralized so the placeholder content can be swapped
without touching component code:

- `src/data/content.js` — agency name, tagline, email/phone, social links,
  nav links, the trust-numbers row. **`AGENCY.email`, `AGENCY.phone` and the
  numbers are placeholders — replace with real, verified values.**
- `src/data/projects.js` — case studies shown in the homepage horizontal
  showcase, `/work` grid and `/work/:slug` detail pages. These are
  illustrative/fictional projects; replace with real client work (and real
  screenshots, if you want to swap the CSS-composed visuals for imagery).
- `src/data/testimonials.js` — structured for the circular testimonial
  orbit. `name`, `role` and `company` are intentionally placeholder-style —
  **do not publish without swapping in real, verified client quotes.**
- `src/data/reviews.js` — short review-strip content for the marquee, same
  caveat as testimonials.
- `src/data/services.js`, `src/data/process.js`, `src/data/technologies.js`
  — services list, process timeline, technology wall.

## Architecture

- `src/lib/gsap.js` — single place GSAP + ScrollTrigger + SplitText are
  registered, plus a shared easing vocabulary.
- `src/hooks/` — `useLenis` (smooth-scroll provider + GSAP ticker sync),
  `useScrollVelocity`, `useMagnetic`, `useMediaQuery` (+ touch/mobile/
  tablet/reduced-motion variants).
- `src/components/ui/` — reusable primitives: `RevealText` (scroll-triggered
  line/word/char reveals via SplitText), `SectionHeading`, `MagneticButton`.
- `src/components/layout/` — `Navbar`, `Footer`, `CustomCursor`,
  `PageTransition` (route-change wipe), mounted once in `App.jsx`.
- `src/components/home/` — one component per homepage section (Preloader,
  Hero, Intro, Services, HorizontalProjects, ProjectTransition, Philosophy,
  Process, Technology, TestimonialOrbit, ReviewMarquee, Numbers, CTA).
- `src/pages/` — route-level pages: Home, About, Work, ProjectDetail,
  Services, Contact, NotFound.

All scroll-driven animation lives behind `gsap.context()` with cleanup on
unmount, and every animated section respects `prefers-reduced-motion`
(reduced or disabled complex motion; content remains fully readable and
navigable). The custom cursor is desktop-only and disabled on touch
devices. The horizontal project showcase and testimonial orbit fall back to
simpler vertical/stacked layouts under 768px.

## Notes

- The contact form (`/contact`) is a frontend-only interaction — no backend
  is wired up. Hook `onSubmit` in `src/pages/Contact.jsx` up to your API or
  form service of choice.
- Fonts are loaded from Google Fonts in `index.html` (Space Grotesk, Inter,
  JetBrains Mono). Self-host via `@fontsource` if you need to avoid the
  external request.
