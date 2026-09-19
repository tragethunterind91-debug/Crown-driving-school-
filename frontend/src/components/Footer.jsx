import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Brand } from "./Navbar";
import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer data-testid="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand tone="dark" />
          <p className="footer-blurb">
            Patient, confident tuition for Northampton learners. Automatic and manual lessons,
            intensive courses and post-test coaching — all under one calm workspace.
          </p>
          <div className="footer-social">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              data-testid="footer-instagram-link"
            >
              <Instagram size={17} />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              data-testid="footer-whatsapp-link"
            >
              <MessageCircle size={17} />
            </a>
            <a href={`mailto:${SITE.email}`} aria-label="Email" data-testid="footer-email-icon-link">
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div>
          <span className="eyebrow">QUICK LINKS</span>
          <Link to="/" data-testid="footer-home-link">Home</Link>
          <Link to="/lessons" data-testid="footer-lessons-link">Lessons</Link>
          <Link to="/pricing" data-testid="footer-pricing-link">Pricing</Link>
          <Link to="/instructors" data-testid="footer-instructors-link">Instructors</Link>
          <Link to="/areas" data-testid="footer-areas-link">Areas we cover</Link>
          <Link to="/contact" data-testid="footer-contact-link">Contact support</Link>
        </div>

        <div>
          <span className="eyebrow">CONTACT</span>
          <a href={`tel:${SITE.phoneTel}`} data-testid="footer-phone-link">
            <Phone size={13} /> {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`} data-testid="footer-email-link">
            <Mail size={13} /> {SITE.email}
          </a>
          <span>
            <MapPin size={13} /> {SITE.address}
          </span>
        </div>

        <div>
          <span className="eyebrow">OPENING HOURS</span>
          {Object.entries(SITE.hours).map(([day, time]) => (
            <span key={day}>
              <b>{day}</b> · {time}
            </span>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <span>Northampton, United Kingdom · DVSA-focused tuition</span>
      </div>
    </footer>
  );
}
