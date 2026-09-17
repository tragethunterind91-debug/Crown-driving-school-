# Crown Pass Driving School — Product Record

## Original problem statement
Build a premium, responsive Crown Pass Driving School website for Northampton using React, Tailwind, Framer Motion, React Router and Firebase (Firestore, Firebase Auth, Storage and Analytics) directly from the frontend. Include Home, Lessons, Pricing, Contact Support and a protected `/adevglobpik` admin workspace with Firebase email/password access. Use the supplied exact Firebase project configuration, gold-and-black brand direction, promotional images and Firebase free plan.

## Architecture decisions
- React frontend is the product surface; no custom API or MongoDB data flow is used.
- `src/firebase.js` is the central Firebase initialization module for App, Auth, Firestore, Storage and Analytics.
- Firestore collections are used directly for `ratings`, `messages`, `lessons`, `plans`, `siteSettings` and `analytics`.
- Public pages use resilient starter content when a collection is empty or temporarily unavailable; submitted data only shows success after Firebase resolves.
- Firestore and Storage security rules are included at the project root, with email-based admin access rules for `adevbossCDSuk@gmail.in`.

## Personas
- Northampton learner: wants calm, transparent lesson choices and an easy WhatsApp-first booking path.
- Nervous or refresher driver: needs patient language, clear progression and flexible contact.
- School operator: needs to review enquiries, add lesson types and see basic live content signals.

## Core requirements (static)
- Premium black, gold and warm-white visual system with Poppins headings and Inter body copy.
- Seven-second cinematic loader, responsive navigation, Home, Lessons, Pricing and Contact routes.
- Six lesson types, lesson comparison, pricing packages, calculator and included-lesson benefits.
- Dynamic rating modal and Firestore rating read/write path.
- Contact form with URL-based plan/lesson prefill and Firestore message create path.
- Protected admin login/dashboard route, mobile support, floating WhatsApp CTA and unique data-testid attributes.

## What's been implemented

### 2026-09-17
- Replaced the starter demo with the Crown Pass branded public experience and four usable routes.
- Added supplied Crown Pass promotional images, cinematic loading animation, responsive premium styling and navigation.
- Added Firestore-connected ratings and messages, pricing calculator, FAQ accordion, map embed and WhatsApp contact paths.
- Added Firebase Auth admin sign-in/create-account UI and dashboard controls for lesson creation and inbox visibility.
- Added `firestore.rules` and `storage.rules` with public reading/create paths and admin-only management paths.
- Added build validation and browser smoke coverage; public flows pass.
- Added visible Firebase auth recovery guidance when the supplied admin credentials are not enabled in Firebase Authentication.

## Prioritized backlog
- P0: Create/enable `adevbossCDSuk@gmail.in` in Firebase Authentication using the temporary password, then verify `/adevglobpik` sign-in.
- P0: Seed editable `lessons`, `plans` and `siteSettings` documents in Firestore for live admin management.
- P1: Expand admin from the first lesson form into full edit/delete tables for plans, ratings and settings.
- P1: Add daily visitor aggregation writes for the Analytics dashboard cards.
- P2: Add Firebase Storage image upload controls to the admin workspace.

## Remaining P0/P1/P2 tasks
- P0: Firebase Console Auth activation and Firestore/Storage rules deployment.
- P1: Complete admin CRUD panels and real-time charts.
- P2: Add richer instructor profiles, booking availability and downloadable Pass Plus certificate workflow.
