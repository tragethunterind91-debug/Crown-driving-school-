import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Shell from "@/components/Shell";
import RatingModal from "@/components/RatingModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { subscribe } from "@/lib/firestoreHelpers";
import {
  ASSETS,
  ELIGIBILITY,
  EXTRA_FEATURES,
  FALLBACK_REVIEWS,
  FAQS,
  FEATURES,
  INSTRUCTORS,
  LESSONS,
  PLANS,
  SITE,
  STATS,
} from "@/lib/data";

const money = (n) => `£${Number(n).toLocaleString("en-GB")}`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
};

function SectionTitle({ eyebrow, title, text, align = "left" }) {
  return (
    <motion.div
      className={`section-title align-${align}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.94),rgba(10,10,10,.35) 60%,rgba(10,10,10,.15)),url(${ASSETS.hero})`,
      }}
      data-testid="home-hero"
    >
      <div className="hero-particles" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.2, 0.7], y: [0, -14, 6, 0] }}
            transition={{ delay: (i % 8) * 0.2, duration: 5, repeat: Infinity, repeatType: "mirror" }}
            style={{ left: `${(i * 43) % 100}%`, top: `${(i * 71) % 100}%` }}
          />
        ))}
      </div>
      <div className="road-lines" aria-hidden />
      <div className="hero-copy">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          NORTHAMPTON · DVSA-FOCUSED TUITION
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          Learn to drive
          <br />
          <em>with confidence.</em>
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Northampton's trusted driving school. Patient tuition, modern automatic and manual cars,
          and a clear route to an 85% first-time pass.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link className="button" to="/contact" data-testid="hero-book-lesson-button">
            Book a lesson ↗
          </Link>
          <Link className="button button-outline" to="/pricing" data-testid="hero-view-pricing-button">
            View pricing
          </Link>
        </motion.div>
        <motion.div
          className="hero-trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span data-testid="hero-rating-badge">
            <Star size={16} fill="currentColor" /> 9.2/10 rated by students
          </span>
          <span>
            <ShieldCheck size={16} /> 85% first-time pass rate
          </span>
          <span>
            <Sparkles size={16} /> DVSA-approved instructors
          </span>
        </motion.div>
      </div>
      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 2 } }}
      >
        SCROLL TO EXPLORE <span>↓</span>
      </motion.div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="stats-band" data-testid="home-stats-band">
      {STATS.map((s) => (
        <div key={s.label}>
          <strong>
            <AnimatedCounter value={s.value} />
          </strong>
          <small>{s.label}</small>
        </div>
      ))}
    </section>
  );
}

function AboutSection() {
  return (
    <section className="container section split intro" data-testid="home-about-section">
      <SectionTitle
        eyebrow="01 / WHO WE ARE"
        title="A calmer way<br/>to learn to drive."
        text="Your first lesson should feel like progress, not pressure."
      />
      <div>
        <p>
          Crown Pass Driving School was founded in Northampton with a single idea in mind: that
          learning to drive should feel structured, patient and genuinely personal. From your
          first cockpit drill to your final mock test, every lesson is shaped around how you learn.
        </p>
        <p>
          Our fleet of dual-controlled, fully insured automatic and manual cars covers the whole of
          Northampton and the surrounding villages, and our team of six DVSA-approved instructors
          are chosen for one thing above all — the ability to keep learners calm.
        </p>
        <p>
          Whether you're 17 and taking your first lesson, 65 and rebuilding confidence, or
          somewhere in between, you'll get the same clear plan, honest feedback and steady support
          until the licence is in your hand.
        </p>
        <Link to="/lessons" className="text-link" data-testid="home-explore-lessons-link">
          Explore lessons ↗
        </Link>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="dark-band" data-testid="home-features-section">
      <div className="container">
        <SectionTitle
          eyebrow="02 / WHY CROWN PASS"
          title="Built around<br/>your progress."
          text="Practical support at every stage of your journey — never rushed, never hidden."
        />
        <motion.div
          className="feature-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.06 }}
        >
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              className="feature"
              variants={fadeUp}
              whileHover={{ y: -6 }}
              data-testid={`feature-card-${i + 1}`}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExtraFeaturesSection() {
  return (
    <section className="container section" data-testid="home-extras-section">
      <SectionTitle
        eyebrow="03 / GOING FURTHER"
        title="Extra support<br/>where it matters."
        text="Some learners need a little more. These are the additional services we're proud to offer."
      />
      <div className="extras-grid">
        {EXTRA_FEATURES.map((x, i) => (
          <motion.div
            key={x.title}
            className="extra"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            data-testid={`extra-feature-${i + 1}`}
          >
            <span className="gold">✦</span>
            <h4>{x.title}</h4>
            <p>{x.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LessonsPreviewSection({ lessons }) {
  return (
    <section className="container section" data-testid="home-lessons-preview">
      <SectionTitle
        eyebrow="04 / START HERE"
        title="Choose the lesson<br/>that meets you today."
        text="Six lesson types built for real Northampton learners — from first-timers to post-test refresh."
      />
      <div className="lesson-grid">
        {lessons.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <Link
              to={`/contact?lesson=${encodeURIComponent(l.name)}`}
              className="lesson-card"
              data-testid={`home-lesson-card-${l.id || i + 1}`}
            >
              <div className="lesson-icon">{l.icon || "◈"}</div>
              <div>
                <span className="eyebrow">{l.tag || "DRIVING LESSON"}</span>
                <h3>{l.name}</h3>
                <p>
                  From <b>{money(l.packagePrice ?? l.pricePerHour ?? 0)}</b> {l.id === "pass-plus" ? "total" : "/ hour in packages"}
                </p>
              </div>
              <span className="arrow">↗</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ImageStripSection() {
  return (
    <section className="image-strip" data-testid="home-image-strip">
      <img src={ASSETS.lesson} alt="Learner practising at the wheel during a driving lesson" loading="lazy" />
      <div>
        <span className="eyebrow">THE CROWN PASS STANDARD</span>
        <h2>Learn. Practise.<br/><em>Pass.</em></h2>
        <p>
          Modern dual-control cars, realistic Northampton test routes and a lesson plan that
          adapts as your confidence grows. Every learner leaves each session with a clear next step.
        </p>
        <Link to="/contact" className="button" data-testid="home-standard-cta">
          Start your journey ↗
        </Link>
      </div>
    </section>
  );
}

function TeamPreviewSection() {
  return (
    <section className="container section" data-testid="home-team-preview">
      <SectionTitle
        eyebrow="MEET THE TEAM"
        title="DVSA-approved instructors<br/>who keep you calm."
        text="Patient, fully qualified and continuously assessed — the people who'll guide you to your licence."
      />
      <div className="team-preview-grid">
        {INSTRUCTORS.slice(0, 4).map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <Link to="/instructors" className="team-preview-card" data-testid={`home-team-card-${p.id}`}>
              <span className="team-preview-mark" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <div className="team-preview-body">
                <strong>{p.name}</strong>
                <small>{p.passHighlight}</small>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="pricing-cta">
        <Link to="/instructors" className="button button-outline" data-testid="home-meet-team-link">
          Meet the full team ↗
        </Link>
      </div>
    </section>
  );
}

function RatingSection({ reviews, onOpen }) {  const data = reviews.length ? reviews : FALLBACK_REVIEWS;
  const average = useMemo(() => {
    if (!reviews.length) return "9.2";
    return (reviews.reduce((a, b) => a + Number(b.rating || 0), 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const distribution = useMemo(() => {
    const buckets = { "9-10": 0, "7-8": 0, "5-6": 0, "3-4": 0, "1-2": 0 };
    data.forEach((r) => {
      const n = Number(r.rating || 0);
      if (n >= 9) buckets["9-10"]++;
      else if (n >= 7) buckets["7-8"]++;
      else if (n >= 5) buckets["5-6"]++;
      else if (n >= 3) buckets["3-4"]++;
      else buckets["1-2"]++;
    });
    const total = Object.values(buckets).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(buckets).map(([k, v]) => ({ label: k, pct: Math.round((v / total) * 100), count: v }));
  }, [data]);

  const ringPct = (Number(average) / 10) * 100;

  return (
    <section className="container section rating-section" data-testid="home-rating-section">
      <div className="rating-score">
        <span className="eyebrow">05 / STUDENT VOICE</span>
        <div className="rating-ring" role="img" aria-label={`Average rating ${average} out of 10`}>
          <svg viewBox="0 0 120 120" width="180" height="180">
            <circle cx="60" cy="60" r="52" strokeWidth="8" stroke="rgba(212,168,83,.18)" fill="none" />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              strokeWidth="8"
              stroke="#d4a853"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="326.7"
              initial={{ strokeDashoffset: 326.7 }}
              whileInView={{ strokeDashoffset: 326.7 * (1 - ringPct / 100) }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="rating-ring-value">
            <strong data-testid="home-rating-average">
              {average}
              <small>/10</small>
            </strong>
            <span>Average</span>
          </div>
        </div>
        <p data-testid="home-rating-count">Based on {reviews.length || FALLBACK_REVIEWS.length} student ratings</p>
        <button
          className="button button-outline"
          type="button"
          onClick={onOpen}
          data-testid="open-rating-modal-button"
        >
          Rate your experience ↗
        </button>
      </div>

      <div className="rating-details">
        <SectionTitle eyebrow="RATING DISTRIBUTION" title="How students rate us." />
        <div className="rating-bars">
          {distribution.map((d) => (
            <div key={d.label} className="rating-bar-row">
              <span>{d.label}</span>
              <div className="rating-bar">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <b>{d.count}</b>
            </div>
          ))}
        </div>

        <div className="reviews">
          <span className="eyebrow">RECENT REVIEWS</span>
          {data.slice(0, 5).map((r, i) => (
            <motion.div
              key={r.id || i}
              className="review"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              data-testid={`home-review-card-${i}`}
            >
              <div className="review-head">
                <strong>{r.name}</strong>
                <span className="gold">{"★".repeat(Math.min(5, Math.ceil((r.rating || 8) / 2)))}</span>
              </div>
              <p>“{r.reviewText}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreviewSection({ plans }) {
  return (
    <section className="dark-band" data-testid="home-pricing-preview">
      <div className="container">
        <SectionTitle
          eyebrow="06 / PRICING"
          title="Simple, transparent<br/>pricing."
          text="Flexible packages that reward committed practice. Full pricing breakdown on the pricing page."
        />
        <div className="pricing-grid">
        {plans.map((p, i) => (
            <motion.div
              key={p.id}
              className={`plan-card ${p.highlight ? "highlight" : ""}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              data-testid={`home-plan-card-${p.id || i + 1}`}
            >
              {p.highlight && <span className="plan-badge">{p.highlight}</span>}
              <span className="eyebrow">PAY AS YOU GO</span>
              <h3>{p.name}</h3>
              <strong>{money(p.price)}</strong>
              <p>{p.description || p.eligibility || `${p.hours || "Flexible"} hours · £${p.perHour || p.price}/hour · ${p.validity || "flexible"} validity`}</p>
              <Link to={`/contact?plan=${encodeURIComponent(p.name)}`} className="text-link" data-testid={`home-plan-choose-${p.id}`}>
                Choose this plan ↗
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="pricing-cta">
          <Link to="/pricing" className="button button-outline" data-testid="home-view-all-pricing-link">
            View all pricing ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactPreviewSection() {
  return (
    <section className="container section contact-preview" data-testid="home-contact-preview">
      <SectionTitle
        eyebrow="07 / GET IN TOUCH"
        title="One direct line<br/>to your next step."
        text="WhatsApp, Instagram, phone or email — you choose. We reply between 8am and 8pm."
      />
      <div className="contact-preview-grid">
        <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" data-testid="home-whatsapp-quick-link">
          <MessageCircle /><span>WhatsApp<br/><small>{SITE.phoneDisplay}</small></span>
        </a>
        <a href={SITE.instagram} target="_blank" rel="noreferrer" data-testid="home-instagram-quick-link">
          <Instagram /><span>Instagram<br/><small>{SITE.instagramHandle}</small></span>
        </a>
        <a href={`mailto:${SITE.email}`} data-testid="home-email-quick-link">
          <Mail /><span>Email<br/><small>{SITE.email}</small></span>
        </a>
        <a href={`tel:${SITE.phoneTel}`} data-testid="home-phone-quick-link">
          <Phone /><span>Call us<br/><small>{SITE.phoneDisplay}</small></span>
        </a>
        <div>
          <MapPin /><span>Northampton<br/><small>{SITE.address}</small></span>
        </div>
        <div>
          <Clock3 /><span>Opening hours<br/><small>Mon–Sat 8am–8pm · Sun 9am–5pm</small></span>
        </div>
      </div>
      <div className="pricing-cta">
        <Link to="/contact" className="button" data-testid="home-get-in-touch-link">
          Get in touch ↗
        </Link>
      </div>
    </section>
  );
}

function EligibilitySection() {
  return (
    <section className="dark-band" data-testid="home-eligibility-section">
      <div className="container split eligibility">
        <SectionTitle
          eyebrow="08 / ELIGIBILITY"
          title="Ready to start<br/>your Crown Pass journey?"
          text="A quick checklist so your first lesson counts."
        />
        <ul className="eligibility-list">
          {ELIGIBILITY.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              data-testid={`eligibility-item-${i + 1}`}
            >
              <Check size={17} /> {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" data-testid="home-faq-section">
      <div className="container">
        <SectionTitle
          eyebrow="09 / GOOD TO KNOW"
          title="Twenty answers<br/>before your first lesson."
          text="Everything Crown Pass learners commonly ask before they book."
        />
        <div className="faq-grid">
          {FAQS.map((f, i) => {
            const active = open === i;
            return (
              <div className={`faq ${active ? "active" : ""}`} key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : i)}
                  data-testid={`faq-question-${i + 1}`}
                  aria-expanded={active}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-title">{f.q}</span>
                  <ChevronDown size={18} />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.p
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      data-testid={`faq-answer-${i + 1}`}
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta" data-testid="home-final-cta">
      <div className="container">
        <span className="eyebrow">10 / YOUR TURN</span>
        <h2>Ready to start<br/><em>your journey?</em></h2>
        <p>Message the team and we'll match you with the right instructor and lesson type today.</p>
        <div className="final-actions">
          <Link to="/contact" className="button" data-testid="final-cta-book-button">
            Book a lesson ↗
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Crown Pass, I'd like to book my first lesson.")}`}
            target="_blank"
            rel="noreferrer"
            className="button button-outline"
            data-testid="final-cta-whatsapp-button"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [liveLessons, setLiveLessons] = useState([]);
  const [livePlans, setLivePlans] = useState([]);
  const [modal, setModal] = useState(false);

  const lessons = liveLessons.length ? liveLessons : LESSONS;
  const plans = livePlans.length ? livePlans : PLANS;

  useEffect(() => {
    const unsubscribeRatings = subscribe(
      "ratings",
      (docs) => setReviews(docs.filter((d) => d.visible !== false)),
      { max: 40, where: { field: "visible", value: true } },
    );
    const unsubscribeLessons = subscribe("lessons", setLiveLessons, { orderField: "order", max: 40 });
    const unsubscribePlans = subscribe("plans", setLivePlans, { orderField: "order", max: 40 });
    return () => {
      unsubscribeRatings();
      unsubscribeLessons();
      unsubscribePlans();
    };
  }, []);

  return (
    <Shell>
      <HeroSection />
      <StatsBand />
      <AboutSection />
      <FeaturesSection />
      <ExtraFeaturesSection />
      <LessonsPreviewSection lessons={lessons} />
      <ImageStripSection />
      <TeamPreviewSection />
      <RatingSection reviews={reviews} onOpen={() => setModal(true)} />
      <PricingPreviewSection plans={plans} />
      <ContactPreviewSection />
      <EligibilitySection />
      <FaqSection />
      <FinalCta />
      <AnimatePresence>
        {modal && <RatingModal onClose={() => setModal(false)} />}
      </AnimatePresence>
    </Shell>
  );
}
