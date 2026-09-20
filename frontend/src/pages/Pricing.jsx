import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Shell from "@/components/Shell";
import { ASSETS, CANCELLATION_POLICY, INCLUDED_IN_LESSON, INTENSIVE, INTRO_OFFER, LESSONS, PASS_PLUS_BENEFITS, PAYMENT_METHODS, PLANS } from "@/lib/data";

const money = (n) => `£${Number(n).toLocaleString("en-GB")}`;

function PricingHero() {
  return (
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.95),rgba(10,10,10,.42) 60%),url(${ASSETS.hero})` }} data-testid="pricing-page-hero">
      <div className="container">
        <span className="eyebrow">CROWN PASS / PRICING</span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>Simple, transparent pricing.</motion.h1>
        <p>Clear prices, flexible packages and a plan that keeps your progress moving. No hidden fees, no surprises.</p>
      </div>
    </section>
  );
}

function PayAsYouGo() {
  return (
    <section className="container section" data-testid="pricing-payg-section">
      <div className="section-title">
        <span className="eyebrow">01 / PAY AS YOU GO</span>
        <h2>More hours. Better value.</h2>
        <p>Book a package upfront and enjoy a lower per-hour rate, no expiry stress and priority booking slots.</p>
      </div>
      <div className="pricing-grid">
        {PLANS.map((p, i) => (
          <motion.div key={p.id} className={`plan-card ${p.highlight ? "highlight" : ""}`} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} data-testid={`pricing-plan-card-${p.id}`}>
            {p.highlight && <span className="plan-badge">{p.highlight}</span>}
            <span className="eyebrow">PAY AS YOU GO</span>
            <h3>{p.name}</h3>
            <strong>{money(p.price)}</strong>
            <p>{p.hours} hours · £{p.perHour}/hour · {p.validity} validity</p>
            <ul className="plan-features">{p.includedFeatures.map((f) => <li key={f}><Check size={14} /> {f}</li>)}</ul>
            <Link to={`/contact?plan=${encodeURIComponent(p.name)}`} className="button button-outline" data-testid={`pricing-choose-${p.id}`}>Choose this plan ↗</Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function IntensiveSection() {
  return (
    <section className="container section" data-testid="pricing-intensive-section">
      <div className="intensive">
        <div>
          <span className="eyebrow">MOST POPULAR · INTENSIVE</span>
          <h2>{INTENSIVE.name}</h2>
          <p>{INTENSIVE.eligibility}</p>
          <ul>{INTENSIVE.includedFeatures.map((f) => <li key={f}><Check size={14} className="gold" /> {f}</li>)}</ul>
        </div>
        <strong>{money(INTENSIVE.price)}<small>all-inclusive · {INTENSIVE.hours} hours</small></strong>
        <Link to={`/contact?plan=${encodeURIComponent(INTENSIVE.name)}`} className="button" data-testid="pricing-intensive-cta">Choose package ↗</Link>
      </div>
    </section>
  );
}

function IntroOfferSection() {
  return (
    <section className="dark-band" data-testid="pricing-intro-section">
      <div className="container split intro-offer">
        <div>
          <span className="eyebrow">03 / INTRODUCTORY OFFER</span>
          <h2>Your first lesson,<br/><em>reduced.</em></h2>
          <p>{INTRO_OFFER.eligibility} {INTRO_OFFER.offer}</p>
        </div>
        <div className="intro-offer-card">
          <span className="plan-badge">LIMITED TIME</span>
          <strong>{money(INTRO_OFFER.price)}</strong>
          <p>{INTRO_OFFER.duration} introductory lesson</p>
          <Link to="/contact?plan=Introductory%20Lesson" className="button" data-testid="pricing-intro-cta">Book intro ↗</Link>
        </div>
      </div>
    </section>
  );
}

function PassPlusSection() {
  const [insurance, setInsurance] = useState(1200);
  const saving = Math.round(insurance * 0.35);
  return (
    <section className="container section" data-testid="pricing-pass-plus-section">
      <div className="section-title">
        <span className="eyebrow">04 / PASS PLUS</span>
        <h2>Six modules. One certificate.<br/>Real insurance savings.</h2>
      </div>
      <div className="pass-plus-grid">
        <div>
          <strong>£150</strong>
          <p>All six DVSA Pass Plus modules delivered over three to five sessions.</p>
          <ul>{PASS_PLUS_BENEFITS.map((b) => <li key={b}><Check size={14} className="gold" /> {b}</li>)}</ul>
          <Link to="/contact?plan=Pass%20Plus" className="button" data-testid="pricing-pass-plus-cta">Book Pass Plus ↗</Link>
        </div>
        <div className="calculator-card" data-testid="insurance-calculator">
          <span className="eyebrow">INSURANCE SAVING CALCULATOR</span>
          <label>Your first-year premium <b className="gold">{money(insurance)}</b>
            <input type="range" min="500" max="3500" step="50" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} data-testid="insurance-slider" />
          </label>
          <div className="calc-total">
            <span>Estimated saving (up to 35%)</span>
            <strong data-testid="insurance-saving">{money(saving)}</strong>
          </div>
          <p className="fine">Actual saving depends on your insurer and personal circumstances.</p>
        </div>
      </div>
    </section>
  );
}

function AddOnTable() {
  return (
    <section className="container section" data-testid="pricing-addons-section">
      <div className="section-title">
        <span className="eyebrow">05 / ADD-ON PRICING</span>
        <h2>All lesson types.<br/>All prices.</h2>
      </div>
      <div className="table-scroll">
        <table data-testid="pricing-addons-table">
          <thead><tr><th>Lesson type</th><th>Normal price</th><th>Package price</th><th>Typical hours</th></tr></thead>
          <tbody>
            {LESSONS.map((l) => (
              <tr key={l.id}>
                <td><strong>{l.name}</strong></td>
                <td>{l.id === "pass-plus" ? "—" : money(l.pricePerHour) + "/hr"}</td>
                <td>{l.id === "pass-plus" ? money(150) + " total" : money(l.packagePrice) + "/hr"}</td>
                <td>{l.recommendedHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CalculatorSection() {
  const [type, setType] = useState("Automatic");
  const [hours, setHours] = useState(10);
  const rate = useMemo(() => LESSONS.find((l) => l.name === type)?.packagePrice || 37, [type]);
  const total = rate * hours;
  return (
    <section className="calculator" data-testid="pricing-calculator-section">
      <div className="container calculator-inner">
        <div>
          <span className="eyebrow">06 / PRICE CALCULATOR</span>
          <h2>Build your<br/>lesson plan.</h2>
          <p>Slide, select, see your total in real time. Then send the plan straight to Contact Support.</p>
        </div>
        <div className="calc-controls">
          <label>Lesson type
            <select value={type} onChange={(e) => setType(e.target.value)} data-testid="calculator-lesson-select">
              {LESSONS.slice(0, 5).map((l) => <option key={l.name}>{l.name}</option>)}
            </select>
          </label>
          <label>Hours <b>{hours}</b>
            <input type="range" min="1" max="60" value={hours} onChange={(e) => setHours(Number(e.target.value))} data-testid="calculator-hours-slider" />
          </label>
          <div className="calc-total">
            <span>Estimated total</span>
            <strong data-testid="calculator-total">{money(total)}</strong>
            <Link to={`/contact?plan=${encodeURIComponent(type + " lessons")}&hours=${hours}`} className="button button-small" data-testid="calculator-book-button">Book this</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function IncludedSection() {
  return (
    <section className="container section" data-testid="pricing-included-section">
      <div className="section-title">
        <span className="eyebrow">07 / EVERY LESSON INCLUDES</span>
        <h2>What comes as standard.</h2>
      </div>
      <div className="included-grid">
        {INCLUDED_IN_LESSON.map((x) => <div key={x} data-testid={`included-item-${x.split(' ')[0].toLowerCase()}`}><Check className="gold" /> {x}</div>)}
      </div>
    </section>
  );
}

function PaymentSection() {
  return (
    <section className="dark-band" data-testid="pricing-payment-section">
      <div className="container split payment">
        <div className="section-title">
          <span className="eyebrow">08 / PAYMENT METHODS</span>
          <h2>Pay however<br/>works for you.</h2>
          <p>Package bookings are paid upfront; pay-as-you-go lessons are settled at the end of each lesson.</p>
        </div>
        <div className="payment-grid">
          {PAYMENT_METHODS.map((p) => <div key={p} className="payment-tile" data-testid={`payment-${p.toLowerCase()}`}><strong>{p}</strong></div>)}
        </div>
      </div>
    </section>
  );
}

function PolicySection() {
  return (
    <section className="container section" data-testid="pricing-policy-section">
      <div className="section-title">
        <span className="eyebrow">09 / CANCELLATION POLICY</span>
        <h2>Clear, fair, flexible.</h2>
      </div>
      <ul className="policy-list">
        {CANCELLATION_POLICY.map((c, i) => <li key={c} data-testid={`policy-item-${i + 1}`}><Check size={16} className="gold" /> {c}</li>)}
      </ul>
    </section>
  );
}

export default function Pricing() {
  return (
    <Shell>
      <PricingHero />
      <PayAsYouGo />
      <IntensiveSection />
      <IntroOfferSection />
      <PassPlusSection />
      <AddOnTable />
      <CalculatorSection />
      <IncludedSection />
      <PaymentSection />
      <PolicySection />
      <section className="final-cta" data-testid="pricing-final-cta">
        <div className="container">
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h2>Choose your plan<br/><em>today.</em></h2>
          <div className="final-actions">
            <Link to="/contact" className="button" data-testid="pricing-final-book">Book a lesson ↗</Link>
            <Link to="/lessons" className="button button-outline" data-testid="pricing-final-lessons">Back to lessons</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
