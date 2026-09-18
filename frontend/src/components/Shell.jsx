import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SITE } from "@/lib/data";
import { analyticsPromise } from "@/firebase";
import { trackVisit } from "@/lib/firestoreHelpers";

// Public site chrome. Handles scroll progress bar, non-invasive right-click and
// devtools shortcut prevention (marketing-site convention only — real access
// control lives in Firestore rules), analytics init and visitor tracking.
export default function Shell({ children }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  useEffect(() => {
    analyticsPromise.catch(() => {});
    trackVisit();
    const stop = (e) => {
      if (e.key === "F12" || ((e.ctrlKey || e.metaKey) && ["u", "i", "j", "s"].includes(e.key.toLowerCase()))) {
        e.preventDefault();
      }
    };
    const noContext = (e) => e.preventDefault();
    document.addEventListener("keydown", stop);
    document.addEventListener("contextmenu", noContext);
    // Console welcome badge — brand touch, not security.
    // eslint-disable-next-line no-console
    console.log(
      "%cCrown Pass Driving School\n%cInterested in the code? Please contact us instead of poking around.",
      "color:#d4a853;font:600 16px Poppins,sans-serif;padding:6px 0",
      "color:#b8b8b8;font:12px Inter,sans-serif",
    );
    return () => {
      document.removeEventListener("keydown", stop);
      document.removeEventListener("contextmenu", noContext);
    };
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} data-testid="scroll-progress-bar" />
      <Navbar />
      <main>{children}</main>
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp"
        data-testid="floating-whatsapp-link"
      >
        <MessageCircle size={20} /> WhatsApp
      </a>
      <Footer />
    </>
  );
}
