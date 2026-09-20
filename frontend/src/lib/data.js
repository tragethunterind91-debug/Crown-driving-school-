// Central Crown Pass content. Public-page fallbacks live here so the site
// stays informative even when Firestore is empty or slow. Admin edits in
// Firestore always take precedence when documents exist.

export const ASSETS = {
  hero: "https://customer-assets-0z36b82j.emergentagent.net/job_a8595af7-d07f-4726-933d-5500819d4463/artifacts/z244wxtt_IMG_20260917_194743_693.jpg",
  lesson: "https://images.unsplash.com/photo-1679395608187-ac2bcedba9ab?auto=format&fit=crop&w=1600&q=85",
  northampton: "https://images.pexels.com/photos/19848066/pexels-photo-19848066.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
};

export const SITE = {
  name: "Crown Pass Driving School",
  city: "Northampton",
  phoneDisplay: "07845 281406",
  phoneTel: "+447845281406",
  whatsapp: "447845281406",
  email: "info@crownpassdrivingschool.co.uk",
  instagram: "https://instagram.com/crownpassdrivingschooll",
  instagramHandle: "@crownpassdrivingschooll",
  address: "Northampton, Northamptonshire, UK",
  hours: {
    "Mon–Fri": "8:00 AM – 8:00 PM",
    "Saturday": "8:00 AM – 6:00 PM",
    "Sunday": "9:00 AM – 5:00 PM",
  },
};

export const LESSONS = [
  {
    id: "automatic",
    order: 1,
    name: "Automatic",
    icon: "◈",
    tag: "BEGINNER FRIENDLY",
    beginnerFriendly: "YES",
    perfectFor: "Nervous drivers, older learners, anyone who wants a simpler route to the licence.",
    pricePerHour: 40,
    packagePrice: 37,
    recommendedHours: "30–40 hours",
    passRate: "91%",
    description: "Focus on the road, not on gear changes. Automatic tuition gets you confident faster with fewer moving parts to learn.",
    whatYoullLearn: [
      "Smooth acceleration and braking control",
      "Roundabouts and busy junctions",
      "Parallel and bay parking",
      "Hazard perception and mirror discipline",
      "Independent driving and sat-nav routes",
    ],
    testimonial: {
      name: "Amelia S.",
      text: "I passed second time in an automatic. My instructor made every lesson feel calm and productive.",
    },
  },
  {
    id: "manual",
    order: 2,
    name: "Manual",
    icon: "✦",
    tag: "UK STANDARD",
    beginnerFriendly: "YES",
    perfectFor: "Most learners, drivers who want the full UK licence, future company-car candidates.",
    pricePerHour: 40,
    packagePrice: 37,
    recommendedHours: "45–55 hours",
    passRate: "87%",
    description: "The full driving experience. Master clutch, gears and hill starts on real Northampton test routes.",
    whatYoullLearn: [
      "Clutch control and biting-point mastery",
      "Smooth gear changes up and down",
      "Hill starts and moving off on inclines",
      "Emergency stops and controlled braking",
      "Reversing, bay park and parallel park",
    ],
    testimonial: {
      name: "Daniel R.",
      text: "I went from stalling on my first day to passing first time. Clear, calm instruction throughout.",
    },
  },
  {
    id: "motorway",
    order: 3,
    name: "Motorway",
    icon: "↗",
    tag: "POST-TEST",
    beginnerFriendly: "NO",
    perfectFor: "Newly passed drivers who want confidence on the M1, A45 and A14.",
    pricePerHour: 45,
    packagePrice: 42,
    recommendedHours: "2–4 hours",
    passRate: "—",
    description: "High-speed roads deserve high-quality tuition. Learn lane discipline, safe overtaking and confident joining.",
    whatYoullLearn: [
      "Joining and exiting motorways safely",
      "Lane discipline and smart-motorway signage",
      "Safe overtaking at higher speeds",
      "Reading traffic flow and gap selection",
      "Motorway breakdown and recovery guidance",
    ],
    testimonial: {
      name: "Priya K.",
      text: "After passing my test I felt scared of the M1. Two motorway lessons completely changed that.",
    },
  },
  {
    id: "night",
    order: 4,
    name: "Night",
    icon: "☾",
    tag: "INTERMEDIATE",
    beginnerFriendly: "INTERMEDIATE",
    perfectFor: "Learners with 20+ hours of practice building confidence for evening driving and winter conditions.",
    pricePerHour: 42,
    packagePrice: 39,
    recommendedHours: "1–3 hours",
    passRate: "—",
    description: "Practise night visibility, glare management and low-light hazard perception before your independence grows.",
    whatYoullLearn: [
      "Correct use of dipped and main-beam headlights",
      "Glare, oncoming traffic and dazzle recovery",
      "Reading unlit roads and country lanes",
      "Pedestrians, cyclists and dark clothing awareness",
      "Fatigue management and journey planning",
    ],
    testimonial: {
      name: "Sam H.",
      text: "Winter drives home from work don't scare me any more. Great value lesson for anyone new.",
    },
  },
  {
    id: "city",
    order: 5,
    name: "City Drive",
    icon: "⌁",
    tag: "URBAN CONFIDENCE",
    beginnerFriendly: "INTERMEDIATE",
    perfectFor: "Urban learners preparing for Northampton town-centre test routes and busy commutes.",
    pricePerHour: 40,
    packagePrice: 37,
    recommendedHours: "15–20 hours",
    passRate: "—",
    description: "Real Northampton traffic, real routes. Perfect town-centre practice before your practical test.",
    whatYoullLearn: [
      "Traffic-light and box-junction discipline",
      "Cyclists, buses and pedestrian crossings",
      "Multi-lane roundabouts (M1 J15, Sixfields)",
      "Tight parking on residential streets",
      "Independent driving with sat-nav guidance",
    ],
    testimonial: {
      name: "Grace M.",
      text: "The town centre used to scare me. Now I drive through Abington Street without thinking.",
    },
  },
  {
    id: "pass-plus",
    order: 6,
    name: "Pass Plus",
    icon: "♛",
    tag: "CERTIFICATE COURSE",
    beginnerFriendly: "POST-TEST",
    perfectFor: "Recently passed drivers who want up to 35% off insurance for three years.",
    pricePerHour: 150,
    packagePrice: 150,
    recommendedHours: "6 hours total",
    passRate: "—",
    description: "The full DVSA Pass Plus programme. Six modules, one certificate, real insurance savings.",
    whatYoullLearn: [
      "Module 1 · Town driving in busy Northampton",
      "Module 2 · All-weather driving techniques",
      "Module 3 · Country roads and rural hazards",
      "Module 4 · Night driving and visibility",
      "Module 5 · Dual carriageways and joining",
      "Module 6 · Motorway confidence (M1 & A14)",
    ],
    testimonial: {
      name: "Jordan T.",
      text: "Saved £430 on my first insurance year. The course also made me a genuinely safer driver.",
    },
  },
];

export const PLANS = [
  {
    id: "5-lessons",
    order: 1,
    name: "5 Lessons Starter",
    price: 290,
    hours: 5,
    perHour: 58,
    validity: "3 months",
    eligibility: "Ideal for a taster or refresher block.",
    includedFeatures: [
      "5 hours of tuition",
      "Pick-up and drop-off",
      "Personalised learning plan",
      "Progress tracking after every lesson",
    ],
  },
  {
    id: "10-lessons",
    order: 2,
    name: "10 Lessons Confidence",
    price: 570,
    hours: 10,
    perHour: 57,
    validity: "6 months",
    eligibility: "Best value for early learners with some experience.",
    includedFeatures: [
      "10 hours of tuition",
      "Pick-up and drop-off",
      "Mock test practice in month two",
      "Progress-tracked lesson notes",
    ],
    highlight: "POPULAR CHOICE",
  },
  {
    id: "20-lessons",
    order: 3,
    name: "20 Lessons Journey",
    price: 1100,
    hours: 20,
    perHour: 55,
    validity: "12 months",
    eligibility: "Complete first-time-pass preparation.",
    includedFeatures: [
      "20 hours of tuition",
      "Pick-up and drop-off across Northampton",
      "Two mock tests included",
      "Theory support library access",
    ],
  },
];

export const INTENSIVE = {
  name: "Intensive Pass Package",
  price: 2300,
  hours: 60,
  eligibility: "Provisional-licence holders ready to commit to test in 4–6 weeks.",
  includedFeatures: [
    "60 hours of intensive tuition",
    "Two practical test attempts included",
    "Automatic or manual — your choice",
    "Weekly mock tests with test-standard feedback",
    "Theory-test tutoring and mock exams",
    "Pick-up, drop-off and test-day support",
  ],
};

export const INTRO_OFFER = {
  name: "Introductory Lesson",
  price: 50,
  duration: "1.5 hours",
  eligibility: "First-time learners only. Provisional licence required.",
  offer: "Save £10 on your very first Crown Pass lesson.",
};

export const PASS_PLUS_BENEFITS = [
  "Official DVSA Pass Plus certificate valid 3 years",
  "Up to 35% off insurance with participating providers",
  "Six modules covering motorway, night, country and city",
  "No pass/fail exam — completion-based tuition",
];

export const FEATURES = [
  {
    title: "DVSA-approved instructors",
    body: "Every instructor is fully qualified, CRB-checked and continuously assessed for teaching standard.",
  },
  {
    title: "Modern automatic & manual cars",
    body: "Dual-controlled, fully insured and recently serviced. Comfortable, safe and easy to learn in.",
  },
  {
    title: "Flexible booking times",
    body: "Early mornings, evenings, weekends. Your schedule leads the calendar, not the other way round.",
  },
  {
    title: "Pick-up & drop-off",
    body: "We meet you at home, work or college anywhere in Northampton and surrounding villages.",
  },
  {
    title: "Test route training",
    body: "Live Northampton test routes so nothing on the day is a surprise.",
  },
  {
    title: "Patient, confidence-first teaching",
    body: "No shouting, no rushing. Every lesson is paced to how you learn best.",
  },
  {
    title: "Pay-as-you-go or packages",
    body: "Book a single lesson or lock in a discounted package — whatever suits your journey.",
  },
  {
    title: "No hidden costs",
    body: "One clear price per hour. Fuel, insurance and dual-control car are always included.",
  },
];

export const EXTRA_FEATURES = [
  {
    title: "Mock test preparation",
    body: "Two full mocks on real test routes, marked to DVSA standard with actionable feedback.",
  },
  {
    title: "Theory test support",
    body: "Access to a curated library of hazard perception clips and multiple-choice practice.",
  },
  {
    title: "Post-Pass insurance guidance",
    body: "We help you understand black-box, telematics and Pass Plus discounts before you buy.",
  },
  {
    title: "Nervous-driver specialists",
    body: "Slower-paced lessons for high-anxiety learners, mature drivers and post-collision returners.",
  },
  {
    title: "Refresher courses",
    body: "Already passed but out of practice? Rebuild confidence in as little as three lessons.",
  },
  {
    title: "Female instructors on request",
    body: "Let us know at booking and we'll pair you with a female instructor where available.",
  },
];

export const ELIGIBILITY = [
  "Minimum age 17 (or 16 if you receive the enhanced-rate mobility PIP).",
  "Valid UK provisional driving licence required before your first lesson.",
  "No upper age limit — we welcome learners between 17 and 75.",
  "You must be able to read a number plate from 20 metres in good daylight.",
  "No DVLA-restricted medical conditions that prevent safe driving.",
  "First-time learners and refresher learners are both welcome.",
];

export const FAQS = [
  {
    q: "Who can take lessons with Crown Pass?",
    a: "Any learner aged 17+ with a valid UK provisional licence. We support first-time learners, refresher drivers, mature learners and post-test drivers looking to build confidence.",
  },
  {
    q: "Who are your instructors?",
    a: "Every instructor is a fully qualified DVSA-approved driving instructor (ADI) or trainee instructor (PDI) working under strict supervision. All are CRB-checked and undergo regular teaching-standard reviews.",
  },
  {
    q: "What documents do I need to start?",
    a: "You'll need your UK provisional driving licence. Please bring the photocard to your first lesson so your instructor can verify it before you take the wheel.",
  },
  {
    q: "What's the difference between automatic and manual?",
    a: "Automatic lessons remove clutch and gear changes, letting you focus on the road — great for nervous learners. Manual is the UK standard and gives you a licence to drive both. Manual takes slightly longer to learn but keeps every vehicle option open.",
  },
  {
    q: "What happens in my first lesson?",
    a: "We meet at your chosen pick-up point, cover cockpit drills, controls and gently move off in a quiet residential area. You'll finish with basic gear and steering control — and a plan for lesson two.",
  },
  {
    q: "How many lessons will I need?",
    a: "The DVSA average is 45 professional hours plus 22 private hours. Most Crown Pass learners pass in 30–45 hours depending on prior experience and lesson frequency.",
  },
  {
    q: "How much does a lesson cost?",
    a: "Standard lessons are £40/hour and reduce to £37/hour in packages. Motorway, night and Pass Plus have their own dedicated pricing — always clearly listed on the pricing page.",
  },
  {
    q: "How do I book a lesson?",
    a: "Use the Contact Support form, tap the WhatsApp button or call 07845 281406. We usually reply within a couple of hours between 8am and 8pm.",
  },
  {
    q: "Can I choose my own instructor?",
    a: "Yes — once you've had a couple of lessons and found a great match, we do our best to keep you with the same instructor throughout your journey.",
  },
  {
    q: "Can I request a male or female instructor?",
    a: "Absolutely. Let us know at booking and we'll pair you with an instructor that fits your preference, subject to availability in your area.",
  },
  {
    q: "What areas do you cover?",
    a: "Northampton town, Kingsthorpe, Duston, Wootton, Weston Favell, Hardingstone and surrounding villages up to a 10-mile radius. Ask us about further pick-ups if you're just outside.",
  },
  {
    q: "What if I need to cancel a lesson?",
    a: "Give us 24 hours notice and there's no charge — we'll simply reschedule. Cancellations inside 24 hours may be charged the full lesson rate to protect your instructor's time.",
  },
  {
    q: "Do you offer intensive courses?",
    a: "Yes. Our Intensive Pass Package is 60 hours of tuition, two test attempts and mock-test preparation, usually delivered over 4–6 weeks for £2,300 all-inclusive.",
  },
  {
    q: "Do you provide the car for my test?",
    a: "Yes — every practical test is taken in our dual-controlled, fully insured lesson car with your regular instructor beside you until the examiner takes over.",
  },
  {
    q: "What is Pass Plus and do I need it?",
    a: "Pass Plus is an optional post-test course covering motorway, night, country and all-weather driving. It's six modules and typically saves up to 35% on your first-year insurance premium.",
  },
  {
    q: "How does the insurance discount work?",
    a: "On completion you receive a Pass Plus certificate. Present it to a participating insurer (we'll suggest the current best-value providers) and they apply a discount — usually equivalent to a year of no-claims.",
  },
  {
    q: "What if I fail my test?",
    a: "You keep learning with us. We review your DL25 test-report sheet, focus on the marked faults for a couple of lessons and rebook once you're ready. Most re-tests pass within four extra hours.",
  },
  {
    q: "Do you offer night or weekend lessons?",
    a: "Yes — evening and Saturday lessons are our most popular slots. Sunday lessons run 9am–5pm and can be booked at least 48 hours in advance.",
  },
  {
    q: "Is there an age limit to learn?",
    a: "You must be at least 17 (16 if you receive enhanced-rate mobility PIP). There is no upper limit — our oldest recent learner was 71.",
  },
  {
    q: "How do I pay for my lessons?",
    a: "Card, bank transfer or cash. Package bookings are paid in advance; pay-as-you-go lessons are settled at the end of each lesson. A receipt is always provided.",
  },
];

export const STATS = [
  { value: "1,000+", label: "Students taught" },
  { value: "85%", label: "First-time pass rate" },
  { value: "6", label: "Expert instructors" },
  { value: "17–75", label: "Age range welcomed" },
];

export const INCLUDED_IN_LESSON = [
  "Fully insured dual-control car",
  "Fuel included every lesson",
  "Pick-up and drop-off",
  "Personalised learning plan",
  "Progress tracked after every session",
  "Mock test practice as you progress",
  "Friendly, patient instructor",
  "Support between lessons via WhatsApp",
];

export const CANCELLATION_POLICY = [
  "24-hour notice for a full free reschedule.",
  "Cancellations inside 24 hours may be charged the full lesson fee.",
  "Rescheduling is free of charge subject to instructor availability.",
  "Package hours never expire earlier than their listed validity.",
];

export const PAYMENT_METHODS = ["Card", "Bank Transfer", "Cash"];

export const INSTRUCTORS = [
  {
    id: "marcus",
    name: "Marcus Bennett",
    role: "Senior DVSA-Approved Instructor",
    experience: "18 years",
    grade: "ADI Grade A",
    specialties: ["Manual tuition", "Intensive courses", "Test-route mastery"],
    languages: ["English"],
    bio: "Marcus founded the Crown Pass teaching method after nearly two decades on Northampton's roads. Calm, methodical and endlessly patient, he specialises in getting committed learners test-ready fast.",
    passHighlight: "First-time pass specialist",
  },
  {
    id: "sofia",
    name: "Sofia Reyes",
    role: "DVSA-Approved Instructor",
    experience: "9 years",
    grade: "ADI Grade A",
    specialties: ["Automatic tuition", "Nervous drivers", "Female instructor"],
    languages: ["English", "Spanish"],
    bio: "Sofia is the instructor learners request when nerves are getting the better of them. Her gentle, confidence-first approach has helped hundreds of anxious drivers pass with a smile.",
    passHighlight: "Nervous-driver specialist",
  },
  {
    id: "daniel",
    name: "Daniel Ward",
    role: "DVSA-Approved Instructor",
    experience: "22 years",
    grade: "ADI Grade A",
    specialties: ["Refresher lessons", "Mature learners", "Pass Plus"],
    languages: ["English"],
    bio: "With over two decades of teaching, Daniel is a reassuring presence for mature learners and drivers returning to the wheel after a long break. Nothing fazes him.",
    passHighlight: "Refresher & mature-learner expert",
  },
  {
    id: "aisha",
    name: "Aisha Khan",
    role: "DVSA-Approved Instructor",
    experience: "8 years",
    grade: "ADI Grade A",
    specialties: ["Female instructor", "Automatic & manual", "Pass Plus"],
    languages: ["English", "Urdu", "Punjabi"],
    bio: "Aisha combines a warm, encouraging manner with sharp attention to detail. She's a favourite among learners who want a female instructor and a structured, supportive plan.",
    passHighlight: "Female instructor on request",
  },
  {
    id: "james",
    name: "James Cole",
    role: "Trainee Instructor (PDI)",
    experience: "5 years driving coaching",
    grade: "PDI · fully supervised",
    specialties: ["Motorway confidence", "Night driving", "Young learners"],
    languages: ["English"],
    bio: "The newest member of the team, James brings fresh energy and a real knack for connecting with younger learners. He specialises in post-test motorway and night confidence.",
    passHighlight: "Motorway & night specialist",
  },
];

export const AREAS = [
  { name: "Northampton Town Centre", note: "Abington Street, The Drapery and live test-centre routes." },
  { name: "Kingsthorpe", note: "Popular pick-up point with quiet practice roads nearby." },
  { name: "Duston", note: "Residential streets ideal for early lessons and manoeuvres." },
  { name: "Weston Favell", note: "Busy junctions and roundabouts for real-world practice." },
  { name: "Wootton", note: "Modern estates perfect for bay parking and reversing." },
  { name: "Hardingstone", note: "Village roads for country-lane and rural awareness." },
  { name: "Far Cotton", note: "Close to the test centre for final pre-test prep." },
  { name: "Sixfields", note: "Multi-lane roundabouts and retail-park traffic." },
  { name: "Moulton", note: "A mix of village and dual-carriageway driving." },
  { name: "Roade & surrounding villages", note: "Country roads within our 10-mile pick-up radius." },
];

export const TEAM_STATS = [
  { value: "6", label: "DVSA-approved instructors" },
  { value: "60+", label: "Years combined experience" },
  { value: "5", label: "Languages spoken" },
  { value: "1,000+", label: "Learners taught" },
];

export const FALLBACK_REVIEWS = [
  { name: "Ayesha K.", rating: 10, reviewText: "Patient from the first minute. I passed with confidence.", visible: true },
  { name: "Daniel R.", rating: 9, reviewText: "Clear, calm instruction and brilliant test route practice.", visible: true },
  { name: "Priya K.", rating: 10, reviewText: "After passing my test I felt scared of the M1. Two motorway lessons completely changed that.", visible: true },
  { name: "Sam H.", rating: 9, reviewText: "Great value lesson for anyone new to evening driving.", visible: true },
  { name: "Grace M.", rating: 10, reviewText: "The town centre used to scare me. Now I drive through without thinking.", visible: true },
  { name: "Jordan T.", rating: 10, reviewText: "Saved £430 on my first insurance year and became a safer driver.", visible: true },
];
