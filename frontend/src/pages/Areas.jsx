import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Navigation } from "lucide-react";
import Shell from "@/components/Shell";
import { AREAS, ASSETS, SITE } from "@/lib/data";

function AreasHero() {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.95),rgba(10,10,10,.42) 60%),url(${ASSETS.northampton})` }}
      data-testid="areas-page-hero"
    >
      <div className="container">
        <span className="eyebrow">CROWN PASS / AREAS WE COVER</span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Learning across Northampton.
        </motion.h1>
        <p>
          We pick you up from home, work or college anywhere in Northampton and the surrounding villages —
          up to a 10-mile radius. Not sure if we reach you? Just ask.
        </p>
      </div>
    </section>
  );
}

export default function Areas() {
  return (
    <Shell>
      <AreasHero />

      <section className="container section" data-testid="areas-list-section">
        <div className="section-title">
          <span className="eyebrow">01 / PICK-UP LOCATIONS</span>
          <h2>Wherever you are,<br />we'll come to you.</h2>
          <p>Free pick-up and drop-off is included in every lesson across the areas below.</p>
        </div>
        <div className="areas-grid">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.name}
              className="area-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              data-testid={`area-card-${i + 1}`}
            >
              <MapPin className="gold" size={20} />
              <div>
                <h3>{a.name}</h3>
                <p>{a.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="dark-band" data-testid="areas-radius-section">
        <div className="container split">
          <div className="section-title">
            <span className="eyebrow">02 / OUTSIDE THE RADIUS?</span>
            <h2>Just outside<br />Northampton?</h2>
            <p>
              We regularly teach learners just beyond our usual 10-mile radius. If you're in a nearby
              village, send us your postcode and we'll confirm availability and any small travel note.
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Crown Pass, do you cover my area? My postcode is ...")}`}
              target="_blank"
              rel="noreferrer"
              className="button"
              data-testid="areas-check-whatsapp"
            >
              <MessageCircle size={16} /> Check my postcode ↗
            </a>
          </div>
          <div className="area-map-card" data-testid="areas-map-card">
            <Navigation className="gold" size={22} />
            <strong>10-mile pick-up radius</strong>
            <p>Centred on Northampton town, covering town, suburbs and surrounding villages.</p>
            <iframe
              title="Crown Pass coverage in Northampton"
              src="https://www.google.com/maps?q=Northampton%20UK&output=embed"
              loading="lazy"
              data-testid="areas-map-iframe"
            />
          </div>
        </div>
      </section>

      <section className="final-cta" data-testid="areas-final-cta">
        <div className="container">
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h2>Book your first lesson<br /><em>near you.</em></h2>
          <div className="final-actions">
            <Link to="/contact" className="button" data-testid="areas-cta-contact">Book a lesson ↗</Link>
            <Link to="/instructors" className="button button-outline" data-testid="areas-cta-instructors">Meet the team</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
