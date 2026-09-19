import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Menu, X } from "lucide-react";

const LINKS = [
  ["/", "Home"],
  ["/lessons", "Lessons"],
  ["/pricing", "Pricing"],
  ["/instructors", "Instructors"],
  ["/areas", "Areas"],
  ["/contact", "Contact"],
];

export function Brand({ tone = "dark" }) {
  return (
    <Link to="/" className={`brand brand-${tone}`} data-testid="brand-home-link">
      <span className="brand-crown"><Crown size={22} strokeWidth={1.4} /></span>
      <span className="brand-text">
        <span className="brand-title">CROWN<span className="gold">PASS</span></span>
        <small>DRIVING SCHOOL · NORTHAMPTON</small>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`nav-wrap ${scrolled ? "scrolled" : ""}`} data-testid="site-navbar">
        <nav className="nav">
          <Brand />
          <div className="nav-links-desktop">
            {LINKS.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                data-testid={`nav-${label.replaceAll(" ", "-").toLowerCase()}-link`}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="nav-actions">
            <Link to="/contact" className="button button-small" data-testid="nav-book-now-button">
              Book now <span aria-hidden>↗</span>
            </Link>
            <button
              type="button"
              className="icon-button mobile-menu"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              data-testid="mobile-menu-button"
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35 }}
            data-testid="mobile-nav-overlay"
          >
            <div className="mobile-nav-head">
              <Brand />
              <button
                type="button"
                className="icon-button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                data-testid="mobile-menu-close-button"
              >
                <X />
              </button>
            </div>
            <div className="mobile-nav-links">
              {LINKS.map(([to, label], i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-${label.replaceAll(" ", "-").toLowerCase()}-link`}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="button"
                data-testid="mobile-book-now-button"
              >
                Book now ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
