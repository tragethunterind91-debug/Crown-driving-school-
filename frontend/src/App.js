import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CinematicLoader from "@/components/CinematicLoader";
import Home from "@/pages/Home";
import Lessons from "@/pages/Lessons";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import { safeGet } from "@/lib/firestoreHelpers";
import "@/App.css";

function Maintenance() {
  return (
    <div className="maintenance" data-testid="maintenance-mode">
      <div>
        <span className="eyebrow">CROWN PASS</span>
        <h1>We're polishing the wheels.</h1>
        <p>Crown Pass Driving School is briefly offline for scheduled improvements. WhatsApp us on 07845 281406 in the meantime — we'll be back shortly.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("crown-loader-seen"));
  const [maintenance, setMaintenance] = useState(false);
  const done = () => { sessionStorage.setItem("crown-loader-seen", "1"); setLoading(false); };

  useEffect(() => {
    safeGet("siteSettings", []).then((docs) => {
      const cfg = docs.find((d) => d.id === "config");
      if (cfg?.maintenanceMode) setMaintenance(true);
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <CinematicLoader key="loader" onDone={done} />
      ) : (
        <BrowserRouter key="app">
          <Routes>
            <Route path="/adevglobpik" element={<Admin />} />
            {maintenance ? (
              <Route path="*" element={<Maintenance />} />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      )}
    </AnimatePresence>
  );
}
