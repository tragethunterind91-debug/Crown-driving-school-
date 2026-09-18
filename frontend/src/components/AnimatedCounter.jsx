import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animates a numeric counter when it enters the viewport. Accepts arbitrary
// strings (e.g. "1,000+", "85%") by extracting the numeric portion and
// preserving the surrounding prefix/suffix.
export default function AnimatedCounter({ value, duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  const match = String(value).match(/([^\d.]*)([\d,.]+)(.*)/);
  const prefix = match ? match[1] : "";
  const numeric = match ? Number(match[2].replaceAll(",", "")) : 0;
  const suffix = match ? match[3] : "";
  const hasComma = match && match[2].includes(",");

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(numeric * eased);
      const formatted = hasComma ? current.toLocaleString("en-GB") : String(current);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, duration, prefix, suffix, hasComma]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {inView ? display : `${prefix}0${suffix}`}
    </motion.span>
  );
}
