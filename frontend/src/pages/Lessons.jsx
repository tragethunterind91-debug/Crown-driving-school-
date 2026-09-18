import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Shell from "@/components/Shell";
import { ASSETS, LESSONS, SITE } from "@/lib/data";

const money = (n) => `£${Number(n).toLocaleString("en-GB")}`;

const IMAGE_FOR = {
  automatic: ASSETS.hero,
  manual: ASSETS.wheel,
  motorway: ASSETS.motorway,
  night: ASSETS.night,
  city: ASSETS.city,
  "pass-plus": ASSETS.keys,
};

function LessonHero() {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.95),rgba(10,10,10,.42) 60%),url(${ASSETS.route})` }}
      data-testid="lessons-page-hero"
    >
      <div className="container">
        <span className="eyebrow">CROWN PASS / LESSONS</span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Explore our lessons.
        </motion.h1>
        <p>
          Practical tuition for first-time learners, nervous drivers and post-test confidence.
          Six lesson types, one calm workspace, always Northampton test routes.
        </p>
      </div>
    </section>
  );
}

function LessonDetail({ lesson, index }) {
  const reverse = index % 2 === 1;
  return (
    <section className={`lesson-detail container ${reverse ? "reverse" : ""}`} id={lesson.id} data-testid={`lesson-detail-${lesson.id}`}>
      <motion.div
        className="lesson-detail-image"
        style={{ backgroundImage: `url(${IMAGE_FOR[lesson.id] || ASSETS.hero})` }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div className="lesson-detail-badge">
          <span className="eyebrow">{lesson.tag}</span>
        </div>
      </motion.div>
      <motion.div
        className="lesson-detail-copy"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">
          {lesson.beginnerFriendly === "YES" ? "BEGINNER FRIENDLY" : lesson.beginnerFriendly} · {lesson.recommendedHours}
        </span>
        <h2>{lesson.name} lessons</h2>
        <p className="lead">{lesson.description}</p>

        <h4>Perfect for</h4>
        <p className="perfect">{lesson.perfectFor}</p>

        <h4>What you'll learn</h4>
        <ul>
          {lesson.whatYoullLearn.map((x) => (
            <li key={x}><Check size={17} /> {x}</li>
          ))}
        </ul>

        <div className="detail-meta">
          <span>
            <b>{money(lesson.pricePerHour)}</b>
            <small>normal / hour</small>
          </span>
          <span>
            <b>{money(lesson.packagePrice)}</b>
            <small>package / hour</small>
          </span>
          <span>
            <b>{lesson.passRate}</b>
            <small>first-time pass</small>
          </span>
        </div>

        <div className="testimonial-inline">
          <Star size={16} fill="currentColor" className="gold" />
          <p>
            <em>“{lesson.testimonial.text}”</em>
            <small>— {lesson.testimonial.name}</small>
          </p>
        </div>

        <Link
          className="button"
          to={`/contact?lesson=${encodeURIComponent(lesson.name)}`}
          data-testid={`book-${lesson.id}-button`}
        >
          Book this lesson ↗
        </Link>
      </motion.div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="container comparison" data-testid="lessons-comparison-section">
      <div className="section-title">
        <span className="eyebrow">AT A GLANCE</span>
        <h2>Compare your options.</h2>
        <p>All lessons include a dual-controlled car, pick-up, drop-off and fuel.</p>
      </div>
      <div className="table-scroll">
        <table data-testid="lesson-comparison-table">
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Normal £/hr</th>
              <th>Package £/hr</th>
              <th>Typical hours</th>
              <th>Pass rate</th>
              <th>Beginner friendly</th>
            </tr>
          </thead>
          <tbody>
            {LESSONS.map((l) => (
              <tr key={l.id} data-testid={`comparison-row-${l.id}`}>
                <td>
                  <strong>{l.name}</strong>
                </td>
                <td>{money(l.pricePerHour)}</td>
                <td>{money(l.packagePrice)}</td>
                <td>{l.recommendedHours}</td>
                <td>{l.passRate}</td>
                <td><span className="pill">{l.beginnerFriendly}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Lessons() {
  return (
    <Shell>
      <LessonHero />
      <div className="lesson-details">
        {LESSONS.map((l, i) => (
          <LessonDetail lesson={l} index={i} key={l.id} />
        ))}
      </div>
      <ComparisonTable />
      <section className="final-cta subtle" data-testid="lessons-final-cta">
        <div className="container">
          <span className="eyebrow">STILL DECIDING</span>
          <h2>Not sure which lesson<br/>you need?</h2>
          <p>Message us with a bit about your experience and we'll suggest a starting point.</p>
          <div className="final-actions">
            <Link to="/contact" className="button" data-testid="lessons-cta-contact-link">
              Message us ↗
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Crown Pass, please help me choose a lesson type.")}`}
              target="_blank"
              rel="noreferrer"
              className="button button-outline"
              data-testid="lessons-cta-whatsapp-link"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
