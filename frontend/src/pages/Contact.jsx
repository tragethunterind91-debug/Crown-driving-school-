import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Clock3, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Shell from "@/components/Shell";
import { ASSETS, LESSONS, PLANS, SITE } from "@/lib/data";
import { createMessage, subscribe } from "@/lib/firestoreHelpers";

const COUNTRIES = ["United Kingdom", "Ireland", "France", "Germany", "Spain", "Italy", "Poland", "Romania", "India", "Pakistan", "Nigeria", "Other"];

export default function Contact() {
  const params = new URLSearchParams(useLocation().search);
  const prefill = params.get("lesson") || params.get("plan") || LESSONS[0].name;
  const instructorPref = params.get("instructor") || "";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "United Kingdom",
    whatsapp: "",
    selectedPlan: prefill,
    extraDetails: instructorPref ? `Preferred instructor: ${instructorPref}.` : "",
    email: "",
  });
  const [state, setState] = useState("idle");
  const [liveLessons, setLiveLessons] = useState([]);
  const [livePlans, setLivePlans] = useState([]);
  const lessons = liveLessons.length ? liveLessons : LESSONS;
  const plans = livePlans.length ? livePlans : PLANS;
  const listedPlans = [...lessons, ...plans.map((plan) => ({ ...plan, isPackage: true })), { name: "Intensive Pass Package", isPackage: true }, { name: "Introductory Lesson", isPackage: true }, { name: "Pass Plus", isPackage: true }];
  const selectedIsListed = listedPlans.some((item) => item.name === form.selectedPlan);

  useEffect(() => {
    const unsubscribeLessons = subscribe("lessons", setLiveLessons, { orderField: "order", max: 40 });
    const unsubscribePlans = subscribe("plans", setLivePlans, { orderField: "order", max: 40 });
    return () => {
      unsubscribeLessons();
      unsubscribePlans();
    };
  }, []);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (state === "saving") return;
    setState("saving");
    try {
      await createMessage(form);
      setState("done");
    } catch (err) {
      console.warn("[contact]", err?.message);
      setState("error");
    }
  };

  return (
    <Shell>
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.95),rgba(10,10,10,.42) 60%),url(${ASSETS.hero})` }} data-testid="contact-page-hero">
        <div className="container">
          <span className="eyebrow">CROWN PASS / CONTACT SUPPORT</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>Let's get you moving.</motion.h1>
          <p>Tell us what you need and the Crown Pass team will reply on WhatsApp shortly.</p>
        </div>
      </section>

      <section className="container contact-layout section" data-testid="contact-section">
        <div className="contact-info">
          <div className="section-title">
            <span className="eyebrow">01 / GET IN TOUCH</span>
            <h2>A direct line<br/>to your next step.</h2>
            <p>Based in Northampton and covering the surrounding villages up to a 10-mile radius.</p>
          </div>
          <div className="contact-links">
            <a href={`tel:${SITE.phoneTel}`} data-testid="contact-phone-link"><Phone /><span>{SITE.phoneDisplay}<small>Call between 8am and 8pm</small></span></a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-link"><MessageCircle /><span>WhatsApp us<small>Fastest reply, message any time</small></span></a>
            <a href={`mailto:${SITE.email}`} data-testid="contact-email-link"><Mail /><span>{SITE.email}<small>Reply within one working day</small></span></a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" data-testid="contact-instagram-link"><Instagram /><span>{SITE.instagramHandle}<small>Follow our student journeys</small></span></a>
            <div data-testid="contact-address"><MapPin /><span>Northampton, UK<small>{SITE.address}</small></span></div>
            <div data-testid="contact-hours"><Clock3 /><span>Opening hours<small>Mon–Fri 8am–8pm · Sat 8am–6pm · Sun 9am–5pm</small></span></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} data-testid="contact-form">
          <span className="eyebrow">02 / BOOKING ENQUIRY</span>
          <h2>Start with a message.</h2>
          {state === "done" ? (
            <div className="success" data-testid="contact-success-message">
              <Check size={40} />
              <h3>Message sent!</h3>
              <p>We'll contact you on WhatsApp shortly.</p>
              <button type="button" className="button button-outline" onClick={() => { setState("idle"); setForm({ ...form, extraDetails: "" }); }} data-testid="send-another-message-button">Send another</button>
            </div>
          ) : (
            <>
              <label>Full name <span className="req">*</span>
                <input required name="name" value={form.name} onChange={update} data-testid="contact-name-input" placeholder="Alex Morgan" />
              </label>
              <div className="form-row">
                <label>Phone number <span className="req">*</span>
                  <input required name="phone" value={form.phone} onChange={update} data-testid="contact-phone-input" placeholder="07…" inputMode="tel" />
                </label>
                <label>WhatsApp number <span className="req">*</span>
                  <input required name="whatsapp" value={form.whatsapp} onChange={update} data-testid="contact-whatsapp-input" placeholder="Same as phone if identical" inputMode="tel" />
                </label>
              </div>
              <div className="form-row">
                <label>Country <span className="req">*</span>
                  <select name="country" value={form.country} onChange={update} data-testid="contact-country-select">
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label>Select lesson / plan <span className="req">*</span>
                  <select name="selectedPlan" value={form.selectedPlan} onChange={update} data-testid="contact-plan-select">
                    {!selectedIsListed && <option value={form.selectedPlan}>{form.selectedPlan}</option>}
                    <optgroup label="Lessons">{lessons.map((l) => <option key={l.id || l.name}>{l.name}</option>)}</optgroup>
                    <optgroup label="Packages">{plans.map((p) => <option key={p.id || p.name}>{p.name}</option>)}</optgroup>
                    <option>Intensive Pass Package</option>
                    <option>Introductory Lesson</option>
                    <option>Pass Plus</option>
                  </select>
                </label>
              </div>
              <label>Extra details <span className="counter">{form.extraDetails.length}/300</span>
                <textarea maxLength="300" name="extraDetails" value={form.extraDetails} onChange={update} data-testid="contact-details-textarea" placeholder="Availability, prior experience, preferred instructor gender, etc." />
              </label>
              <label>Email <span className="fine">(optional)</span>
                <input type="email" name="email" value={form.email} onChange={update} data-testid="contact-email-input" placeholder="you@example.com" />
              </label>
              {state === "error" && <div className="form-error" data-testid="contact-error">We couldn't send your message right now. Please WhatsApp us at {SITE.phoneDisplay}.</div>}
              <button className="button" type="submit" disabled={state === "saving"} data-testid="contact-submit-button">
                {state === "saving" ? "Sending…" : "Send enquiry ↗"}
              </button>
            </>
          )}
        </form>
      </section>

      <section className="map-section" data-testid="contact-map-section">
        <iframe
          title="Crown Pass location in Northampton"
          src="https://www.google.com/maps?q=Northampton%20UK&output=embed"
          loading="lazy"
          data-testid="northampton-map"
        />
      </section>

      <section className="container section follow" data-testid="contact-follow-section">
        <div className="section-title align-center">
          <span className="eyebrow">03 / FOLLOW US</span>
          <h2>See our students on Instagram.</h2>
          <p>Real learners, real passes. Follow the journey and share your own.</p>
        </div>
        <div className="final-actions center">
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="button" data-testid="follow-instagram-button"><Instagram size={16} /> Follow us</a>
        </div>
      </section>
    </Shell>
  );
}
