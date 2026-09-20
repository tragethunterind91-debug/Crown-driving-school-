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

## What's been implemented (2026-09-19 · v2 — "real website" expansion, no payment gateway)
- Per user direction ("Stripe/Razorpay leave that all, just contact to dealer") — NO online payments. All booking routes to Contact form / WhatsApp / phone.
- New **Instructors / Meet the Team** page (`/instructors`): 5 instructor profiles (AI-generated consistent portraits), grade badges, specialties, languages, bios, "Request [name]" CTA that deep-links to Contact with instructor prefilled. Team stats band + Crown Pass promise section.
- New **Areas We Cover** page (`/areas`): 10 Northampton pick-up locations, 10-mile radius card with embedded map, WhatsApp postcode check CTA.
- Home: added "Meet the team" preview section (4 instructors → /instructors).
- Navbar + Footer updated with Instructors and Areas links.
- Contact form now reads `?instructor=` query param and prefills Extra details.
- Data: `INSTRUCTORS`, `AREAS`, `TEAM_STATS`, `ASSETS.team`, `ASSETS.northampton` added to `lib/data.js`.
- New CSS blocks in App.css (instructor-grid/card, team-preview, areas-grid, area-map-card) with responsive breakpoints.
- Self-tested via screenshots: 5 instructor cards render, 10 area cards render, nav links present, instructor→contact prefill verified.

## Media simplification (2026-09-20)
- Per client feedback, reduced the visual footprint to three purposeful real photographs: the Crown Pass vehicle hero, a learner-at-the-wheel lesson photo, and a Northampton street image.
- Removed all five AI-generated instructor portraits, the Home team image grid, the six repeated lesson-detail images, and the six-tile Contact/Instagram gallery.
- Instructor and lesson pages are now text-first, retaining all instructor matching, booking, lesson, and contact functionality.
- Verified: production build completes successfully; preview confirms all five instructor cards render without portraits.

## Admin access migration (2026-09-20)
- Updated the application, Firestore rules, and Storage rules to recognise `derox@gmail.com` as the only administrator; the previous administrator email was removed.
- The admin sign-in email is now fixed, and public account-creation controls have been removed. Any authenticated account other than the configured administrator is signed out before it can access the dashboard.
- Verified: production build completes successfully; `/adevglobpik` renders the new fixed-email private login with no account-creation control.
- Firebase Console action still required: enable Email/Password (if not already enabled), create the `derox@gmail.com` user, and set its password privately. Then publish Hosting and the updated Firestore/Storage rules.

## Firebase Hosting (Termux) — deployment status
- User builds via `npx craco build` then `firebase deploy --only hosting` from `~/Crown-driving-school--main/frontend`.
- Firebase project `crown-pass-driving` confirmed current after `firebase login --reauth`.
- NOTE: New pages are client-side routes — Firebase SPA rewrite in firebase.json must send all routes to /index.html (already configured). User must rebuild + redeploy to see /instructors and /areas live.

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
