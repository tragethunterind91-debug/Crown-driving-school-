# Crown Pass Driving School — Product Record

## Original problem statement
Build a premium Crown Pass Driving School website (Northampton) with React, Tailwind, Framer Motion, React Router. All data through Firebase directly (Firestore, Auth, Storage, Analytics). Gold-and-black premium theme, 7-second cinematic loader, Home (12 sections), long Lessons/Pricing/Contact pages, dynamic 1–10 ratings, admin at `/adevglobpik`, Firestore rules, Firebase free plan.

## Architecture decisions
- No custom API. React + Firebase Web SDK only.
- Central Firebase init in `src/firebase.js` with exact user-supplied config.
- Firestore collections: `lessons`, `plans`, `messages`, `ratings`, `siteSettings`, `analytics`.
- Rules at `/app/firestore.rules` and `/app/storage.rules` (admin = signed-in user with `token.email == adevbossCDSuk@gmail.in`).
- Analytics counter uses atomic `increment(1)` on `analytics/{yyyy-mm-dd}` throttled by sessionStorage.
- Static fallback content (lessons, plans, FAQs, reviews) ships with the app so the site is informative even before admin seeds Firestore. Live Firestore documents take precedence when present.

## What's been implemented (2026-09-18)
- Modular refactor: `pages/Home`, `pages/Lessons`, `pages/Pricing`, `pages/Contact`, `pages/Admin`; `components/CinematicLoader`, `Navbar`, `Footer`, `Shell`, `RatingModal`, `AnimatedCounter`; `lib/data`, `lib/firestoreHelpers`.
- Cinematic 7-second loader with staged particles, headlights, crown glow, letter-by-letter CROWN/PASS reveal, tagline, gold progress bar.
- Home page: 12 sections — hero with particles, animated stat counters, about, features grid (8), extra services (6), lesson preview (6), image strip, rating with SVG ring + distribution bars + live reviews, pricing preview, contact quick links, eligibility, 20 FAQ accordion (all answered), final CTA.
- Lessons page: 6 alternating deep sections (each with description, what-you'll-learn list, meta stats, testimonial, booking CTA that prefills Contact) + full comparison table.
- Pricing page: 9 sections — pay-as-you-go plans, intensive package, intro offer, Pass Plus with insurance-saving calculator, add-on price table, live lesson-plan calculator, what's included, payment methods, cancellation policy.
- Contact page: full validated form (name, phone, whatsapp, country, plan pre-fill from URL, extra details 300-char counter, optional email) writing to Firestore `messages` with error surface; contact links; Google Maps embed; Instagram follow grid.
- Admin at `/adevglobpik`: Firebase email/password sign-in with shake-on-error, real-time dashboard with 5 stat cards, 3 Recharts charts (visitors line, messages bar, rating distribution), full CRUD tabs for Lessons, Plans, Messages (with status dropdown + WhatsApp deep link), Ratings (visibility toggle + delete), Site Settings (phone/whatsapp/email/instagram/address/maintenance toggle).
- Sticky glass navbar, mobile full-screen animated nav, floating WhatsApp CTA, scroll progress bar.
- Firestore rules: public read on lessons/plans/visible ratings/siteSettings; public create on messages/ratings (with rating range 1–10); admin-only write elsewhere; admin-only read on messages/analytics.

## Personas
- Northampton learner: wants clear pricing, easy WhatsApp booking, calm tuition.
- Nervous / mature / refresher driver: needs reassuring language, patient specialists, female-instructor option.
- School operator: real-time inbox, one-click content edits, no code required.

## Prioritized backlog
- P0 (BLOCKED ON FIREBASE CONSOLE): enable Email/Password sign-in provider, create `adevbossCDSuk@gmail.in` user, publish `firestore.rules` and `storage.rules`.
- P1: seed initial `lessons`/`plans`/`siteSettings` documents from admin panel (UI ready).
- P2: Storage image upload UI for admin (rules already in place).
- P2: SEO / OpenGraph meta tags per page.

## Remaining P0/P1/P2 tasks
- P0: Firebase Console Email/Password activation and rules deployment.
- P1: seed content via admin panel once auth is live.
- P2: instructor profiles, availability calendar, downloadable Pass Plus certificate flow.
