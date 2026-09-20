import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Check, Languages, MessageCircle, Star } from "lucide-react";
import Shell from "@/components/Shell";
import { ASSETS, INSTRUCTORS, SITE, TEAM_STATS } from "@/lib/data";

function InstructorsHero() {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.95),rgba(10,10,10,.42) 60%),url(${ASSETS.lesson})` }}
      data-testid="instructors-page-hero"
    >
      <div className="container">
        <span className="eyebrow">CROWN PASS / MEET THE TEAM</span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          The people beside you.
        </motion.h1>
        <p>
          Every Crown Pass instructor is chosen for one thing above all — the ability to keep you calm while
          you learn. Meet the DVSA-approved team who'll guide you to your licence.
        </p>
      </div>
    </section>
  );
}

function TeamStats() {
  return (
    <section className="stats-band" data-testid="instructors-stats-band">
      {TEAM_STATS.map((s) => (
        <div key={s.label}>
          <strong>{s.value}</strong>
          <small>{s.label}</small>
        </div>
      ))}
    </section>
  );
}

function InstructorCard({ person, index }) {
  return (
    <motion.article
      className="instructor-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.55 }}
      data-testid={`instructor-card-${person.id}`}
    >
      <div className="instructor-card-head">
        <span className="instructor-grade"><Award size={13} /> {person.grade}</span>
      </div>
      <div className="instructor-body">
        <span className="eyebrow">{person.passHighlight}</span>
        <h3>{person.name}</h3>
        <p className="instructor-role">{person.role} · {person.experience}</p>
        <p className="instructor-bio">{person.bio}</p>
        <div className="instructor-specialties">
          {person.specialties.map((s) => (
            <span key={s} className="pill"><Check size={12} /> {s}</span>
          ))}
        </div>
        <p className="instructor-languages"><Languages size={14} /> {person.languages.join(" · ")}</p>
        <Link
          to={`/contact?instructor=${encodeURIComponent(person.name)}`}
          className="button button-outline button-small"
          data-testid={`instructor-request-${person.id}`}
        >
          Request {person.name.split(" ")[0]} ↗
        </Link>
      </div>
    </motion.article>
  );
}

export default function Instructors() {
  return (
    <Shell>
      <InstructorsHero />
      <TeamStats />

      <section className="container section" data-testid="instructors-intro-section">
        <div className="section-title align-center">
          <span className="eyebrow">01 / OUR INSTRUCTORS</span>
          <h2>Qualified. Patient.<br />Genuinely on your side.</h2>
          <p>
            All our instructors are fully DVSA-approved (or trainee instructors under strict supervision),
            CRB-checked and continuously assessed for teaching standard. Found a great match? We'll keep
            you with the same instructor throughout your journey.
          </p>
        </div>
        <div className="instructor-grid">
          {INSTRUCTORS.map((p, i) => (
            <InstructorCard key={p.id} person={p} index={i} />
          ))}
        </div>
      </section>

      <section className="dark-band" data-testid="instructors-values-section">
        <div className="container split">
          <div className="section-title">
            <span className="eyebrow">02 / THE CROWN PASS PROMISE</span>
            <h2>No shouting.<br />No rushing. Ever.</h2>
            <p>What every instructor on our team commits to, on every single lesson.</p>
          </div>
          <ul className="eligibility-list">
            {[
              "Lessons paced to how you learn — never a script.",
              "Honest, constructive feedback after every session.",
              "A clear plan so you always know your next step.",
              "Real Northampton test routes from day one.",
              "A calm, judgement-free workspace.",
              "The same friendly face throughout your journey.",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                data-testid={`instructor-value-${i + 1}`}
              >
                <Star size={16} className="gold" fill="currentColor" /> {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="final-cta" data-testid="instructors-final-cta">
        <div className="container">
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h2>Let's match you with<br /><em>the right instructor.</em></h2>
          <p>Tell us a little about yourself and we'll pair you with the instructor who fits you best.</p>
          <div className="final-actions">
            <Link to="/contact" className="button" data-testid="instructors-cta-contact">Book a lesson ↗</Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Crown Pass, please help me choose an instructor.")}`}
              target="_blank"
              rel="noreferrer"
              className="button button-outline"
              data-testid="instructors-cta-whatsapp"
            >
              <MessageCircle size={16} /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
