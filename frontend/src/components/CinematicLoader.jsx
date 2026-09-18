import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

// Cinematic 7-second brand loader. Uses staged Framer Motion timings to hit
// each beat requested (particles → crown → CROWN → PASS → subtitle → line →
// tagline → progress → fade). Elements stay lightweight so first paint remains
// snappy on mobile connections.

const CROWN_LETTERS = "CROWN".split("");
const PASS_LETTERS = "PASS".split("");

export default function CinematicLoader({ onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Progress bar animates independently for a natural fill feel.
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 7000);
      setPct(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const done = setTimeout(onDone, 7000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.7 }}
      data-testid="cinematic-loader"
    >
      <ParticleField />
      <Headlights />
      <div className="loader-crown">
        <motion.div
          className="loader-crown-icon"
          initial={{ y: -140, scale: 0.3, opacity: 0, rotate: -20 }}
          animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 1.2, type: "spring", stiffness: 90, damping: 12 }}
        >
          <motion.div
            className="loader-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.4, 0.9] }}
            transition={{ delay: 1.6, duration: 5, times: [0, 0.15, 0.6, 1] }}
          />
          <Crown size={78} strokeWidth={1.2} />
        </motion.div>
        <ParticleRing />
      </div>
      <div className="loader-word" aria-hidden>
        <div>
          {CROWN_LETTERS.map((c, i) => (
            <motion.span
              key={`c-${i}`}
              initial={{ x: -220, opacity: 0, filter: "blur(6px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 2.5 + i * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <div className="gold">
          {PASS_LETTERS.map((c, i) => (
            <motion.span
              key={`p-${i}`}
              initial={{ x: 220, opacity: 0, filter: "blur(6px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 3.5 + i * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
      <motion.p
        className="loader-subtitle"
        initial={{ opacity: 0, letterSpacing: "2px" }}
        animate={{ opacity: 1, letterSpacing: "12px" }}
        transition={{ delay: 4.5, duration: 0.9 }}
      >
        DRIVING SCHOOL
      </motion.p>
      <motion.div
        className="loader-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 5.5, duration: 0.9, ease: "easeInOut" }}
      />
      <motion.small
        className="loader-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6, duration: 0.7 }}
      >
        Your journey to success starts here
      </motion.small>
      <div className="loader-progress-wrap">
        <div className="loader-progress" style={{ width: `${pct * 100}%` }} />
        <span>{Math.round(pct * 100)}%</span>
      </div>
      <div className="loader-road" aria-hidden />
    </motion.div>
  );
}

function ParticleField() {
  const dots = Array.from({ length: 32 });
  return (
    <div className="loader-particles" aria-hidden>
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="loader-particle"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.9, 0.2, 0.7], scale: [0, 1, 1.3, 1] }}
          transition={{
            delay: (i % 10) * 0.15,
            duration: 3.5 + (i % 4),
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}

function Headlights() {
  return (
    <motion.div
      className="loader-headlights"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.35, 0.15, 0.4] }}
      transition={{ delay: 3.2, duration: 3.8 }}
    />
  );
}

// Second helper drawn as a decorative ring around the crown once it lands.
function ParticleRing() {
  return (
    <motion.div
      className="loader-ring"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.9, 0.2, 0.7], scale: [0.5, 1.1, 0.95, 1] }}
      transition={{ delay: 2.1, duration: 4 }}
    />
  );
}
