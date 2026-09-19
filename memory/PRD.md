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

## What's been implemented (2026-09-19)
- Modular refactor: `pages/Home`, `pages/Lessons`, `pages/Pricing`, `pages/Contact`, `pages/Admin`; `components/CinematicLoader`, `Navbar`, `Footer`, `Shell`, `RatingModal`, `AnimatedCounter`; `lib/data`, `lib/firestoreHelpers`.
- Cinematic 7-second loader with staged particles, headlights, crown glow, letter-by-letter CROWN/PASS reveal, tagline, gold progress bar.
- Home page: 13 sections — hero with particles, animated stat counters, about, features grid (8), extra services (6), lesson preview (6), image strip, rating with SVG ring + distribution bars + live reviews, pricing preview, contact quick links, eligibility, 20 FAQ accordion, final CTA.
- Lessons page: 6 alternating deep sections with comparison table.
- Pricing page: 9 sections — pay-as-you-go plans, intensive package, intro offer, Pass Plus with insurance-saving calculator, add-on price table, live lesson-plan calculator, what's included, payment methods, cancellation policy.
- Contact page: full validated form writing to Firestore `messages` with error surface; contact links; Google Maps embed; Instagram follow grid.
- Admin at `/adevglobpik`: Firebase email/password sign-in with proper error messages, real-time dashboard with stat cards, Recharts charts, full CRUD tabs for Lessons, Plans, Messages, Ratings, Site Settings.
- Sticky glass navbar, mobile full-screen animated nav, floating WhatsApp CTA, scroll progress bar.
- Firebase Hosting config files: `firebase.json`, `.firebaserc`, `firestore.rules`, `storage.rules`.
- SEO meta tags and Open Graph tags in index.html.

## Testing Status (2026-09-19)
- Testing agent run: YES (iteration_3)
- Frontend success rate: 100% (16/16 features tested and passing)
- All pages render correctly with fallback static data
- All interactive elements work (forms, calculators, accordion, modals, mobile menu)
- Admin login shows proper Firebase error messages
- Firebase Console configuration pending (user action required)

## Personas
- Northampton learner: wants clear pricing, easy WhatsApp booking, calm tuition.
- Nervous / mature / refresher driver: needs reassuring language, patient specialists, female-instructor option.
- School operator: real-time inbox, one-click content edits, no code required.

## Prioritized backlog
- P0 (BLOCKED ON FIREBASE CONSOLE): Enable Email/Password sign-in provider, create `adevbossCDSuk@gmail.in` user, publish `firestore.rules` and `storage.rules`, create Firestore database.
- P1: Seed initial `lessons`/`plans`/`siteSettings` documents from admin panel (UI ready).
- P2: Storage image upload UI for admin (rules already in place).
- P2: SEO / OpenGraph meta tags per page (basic tags added).

## Remaining P0/P1/P2 tasks
- P0: Firebase Console Email/Password activation and rules deployment (user action).
- P1: Seed content via admin panel once auth is live.
- P2: Instructor profiles, availability calendar, downloadable Pass Plus certificate flow.

## Firebase Hosting Deployment
Config files ready: `firebase.json`, `.firebaserc`, `firestore.rules`, `storage.rules`.
Deploy command: `cd frontend && npx craco build && firebase deploy`
Live URLs after deploy: `https://crown-pass-driving.web.app` / `https://crown-pass-driving.firebaseapp.com`
