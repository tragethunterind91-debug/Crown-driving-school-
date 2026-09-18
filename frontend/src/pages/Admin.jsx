import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { BarChart3, LogOut, Mail, MessageCircle, Settings, Star, Trash2, Users } from "lucide-react";
import { Bar, BarChart, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { auth } from "@/firebase";
import { Brand } from "@/components/Navbar";
import { LESSONS as DEFAULT_LESSONS, PLANS as DEFAULT_PLANS, SITE } from "@/lib/data";
import { removeDoc, safeGet, saveLesson, savePlan, saveSiteSettings, subscribe, updateMessage, updateRating } from "@/lib/firestoreHelpers";

const money = (n) => `£${Number(n).toLocaleString("en-GB")}`;
const ADMIN_EMAIL = "adevbossCDSuk@gmail.in";

function LoginCard({ onDone }) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const submit = async (e, create = false) => {
    e.preventDefault();
    setState("saving"); setErr("");
    try {
      if (create) await createUserWithEmailAndPassword(auth, email.trim(), password);
      else await signInWithEmailAndPassword(auth, email.trim(), password);
      onDone?.();
    } catch (e2) {
      setState("idle");
      const code = e2?.code || "";
      if (code.includes("wrong-password") || code.includes("invalid-credential")) setErr("The password is incorrect. Please try again.");
      else if (code.includes("user-not-found")) setErr("This admin account has not been created yet in Firebase Authentication. Tap 'Create admin' below to provision it.");
      else if (code.includes("too-many-requests")) setErr("Too many attempts. Please wait a minute and try again.");
      else if (code.includes("operation-not-allowed") || code.includes("configuration-not-found")) setErr("Email/Password sign-in is not enabled in Firebase Console. Enable it under Authentication → Sign-in method.");
      else setErr("Sign-in failed. Please double-check the email and password.");
    }
  };

  return (
    <div className="admin-login" data-testid="admin-login-screen">
      <motion.form
        className="admin-login-card"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1, x: err ? [0, -8, 8, -6, 6, 0] : 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={(e) => submit(e, showCreate)}
      >
        <Brand />
        <span className="eyebrow">PRIVATE ADMIN ACCESS</span>
        <h1>{showCreate ? "Create admin access." : "Welcome back."}</h1>
        <p>Manage lessons, plans, messages and site settings from one calm workspace.</p>
        <label>Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="admin-email-input" autoComplete="username" />
        </label>
        <label>Password
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} data-testid="admin-password-input" autoComplete={showCreate ? "new-password" : "current-password"} />
        </label>
        {err && <div className="form-error" data-testid="admin-auth-error">{err}</div>}
        <button type="submit" className="button" disabled={state === "saving"} data-testid="admin-login-button">
          {state === "saving" ? "Please wait…" : showCreate ? "Create account ↗" : "Sign in ↗"}
        </button>
        <button type="button" className="text-link" onClick={() => { setShowCreate((v) => !v); setErr(""); }} data-testid="admin-mode-toggle-button">
          {showCreate ? "← Back to sign in" : "Need to create the account?"}
        </button>
      </motion.form>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, testId }) {
  return (
    <div className="admin-stat" data-testid={testId}>
      <Icon />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Dashboard({ user, onSignOut }) {
  const [messages, setMessages] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [plans, setPlans] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [settings, setSettings] = useState({ phone: SITE.phoneDisplay, whatsapp: SITE.whatsapp, email: SITE.email, instagram: SITE.instagram, address: SITE.address, maintenanceMode: false });
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const unsubs = [
      subscribe("messages", setMessages, { orderField: "createdAt", orderDir: "desc", max: 100 }),
      subscribe("ratings", setRatings, { orderField: "createdAt", orderDir: "desc", max: 100 }),
      subscribe("lessons", setLessons, { orderField: "order", max: 40 }),
      subscribe("plans", setPlans, { orderField: "order", max: 40 }),
    ];
    safeGet("analytics", []).then(setAnalytics);
    safeGet("siteSettings", [{ id: "config" }]).then((docs) => {
      const cfg = docs.find((d) => d.id === "config");
      if (cfg) setSettings((s) => ({ ...s, ...cfg }));
    });
    return () => unsubs.forEach((u) => u && u());
  }, []);

  const stats = useMemo(() => {
    const totalVisitors = analytics.reduce((a, b) => a + (b.visitorCount || 0), 0);
    const today = new Date().toISOString().slice(0, 10);
    const todayVisitors = analytics.find((a) => a.id === today)?.visitorCount || 0;
    const avg = ratings.length ? (ratings.reduce((a, b) => a + Number(b.rating || 0), 0) / ratings.length).toFixed(1) : "—";
    return { totalVisitors, todayVisitors, messages: messages.length, lessons: lessons.length || DEFAULT_LESSONS.length, plans: plans.length || DEFAULT_PLANS.length, ratings: ratings.length, avg };
  }, [analytics, messages, ratings, lessons, plans]);

  const visitorChart = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const rec = analytics.find((a) => a.id === iso);
      days.push({ date: iso.slice(5), visitors: rec?.visitorCount || 0 });
    }
    return days;
  }, [analytics]);

  const messagesChart = useMemo(() => {
    const map = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      map[d.toISOString().slice(0, 10)] = 0;
    }
    messages.forEach((m) => {
      const t = m.createdAt?.toDate ? m.createdAt.toDate() : null;
      if (!t) return;
      const iso = t.toISOString().slice(0, 10);
      if (iso in map) map[iso]++;
    });
    return Object.entries(map).map(([date, count]) => ({ date: date.slice(5), count }));
  }, [messages]);

  const distribution = useMemo(() => {
    const buckets = { "9-10": 0, "7-8": 0, "5-6": 0, "3-4": 0, "1-2": 0 };
    ratings.forEach((r) => {
      const n = Number(r.rating || 0);
      if (n >= 9) buckets["9-10"]++; else if (n >= 7) buckets["7-8"]++; else if (n >= 5) buckets["5-6"]++; else if (n >= 3) buckets["3-4"]++; else buckets["1-2"]++;
    });
    return Object.entries(buckets).map(([label, count]) => ({ label, count }));
  }, [ratings]);

  return (
    <div className="admin-page" data-testid="admin-dashboard">
      <div className="admin-head">
        <Brand />
        <div className="admin-head-actions">
          <span className="admin-user" data-testid="admin-user-email">{user.email}</span>
          <button className="button button-small button-outline" onClick={onSignOut} data-testid="admin-signout-button"><LogOut size={14} /> Sign out</button>
        </div>
      </div>

      <div className="container admin-content">
        <span className="eyebrow">CROWN PASS / ADMIN</span>
        <h1>Control centre.</h1>

        <div className="admin-tabs" role="tablist">
          {[["overview", "Overview"], ["lessons", "Lessons"], ["plans", "Plans"], ["messages", "Messages"], ["ratings", "Ratings"], ["settings", "Settings"]].map(([k, l]) => (
            <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)} data-testid={`admin-tab-${k}`}>{l}</button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div className="admin-stats">
              <StatCard icon={Users} label={`Total visitors · ${stats.todayVisitors} today`} value={stats.totalVisitors.toLocaleString()} testId="stat-visitors" />
              <StatCard icon={MessageCircle} label="Messages received" value={stats.messages} testId="stat-messages" />
              <StatCard icon={BarChart3} label="Lessons listed" value={stats.lessons} testId="stat-lessons" />
              <StatCard icon={BarChart3} label="Plans listed" value={stats.plans} testId="stat-plans" />
              <StatCard icon={Star} label={`${stats.ratings} ratings received`} value={stats.avg + "/10"} testId="stat-rating" />
            </div>
            <div className="admin-charts">
              <div className="admin-chart" data-testid="chart-visitors">
                <span className="eyebrow">VISITORS · LAST 7 DAYS</span>
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={visitorChart}>
                    <XAxis dataKey="date" stroke="#666" fontSize={11} />
                    <YAxis stroke="#666" fontSize={11} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "#151515", border: "1px solid #d4a85340", color: "#fff" }} />
                    <Line type="monotone" dataKey="visitors" stroke="#d4a853" strokeWidth={2} dot={{ fill: "#d4a853", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="admin-chart" data-testid="chart-messages">
                <span className="eyebrow">MESSAGES · LAST 7 DAYS</span>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={messagesChart}>
                    <XAxis dataKey="date" stroke="#666" fontSize={11} />
                    <YAxis stroke="#666" fontSize={11} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "#151515", border: "1px solid #d4a85340", color: "#fff" }} />
                    <Bar dataKey="count" fill="#d4a853" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="admin-chart" data-testid="chart-rating">
                <span className="eyebrow">RATING DISTRIBUTION</span>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={distribution}>
                    <XAxis dataKey="label" stroke="#666" fontSize={11} />
                    <YAxis stroke="#666" fontSize={11} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "#151515", border: "1px solid #d4a85340", color: "#fff" }} />
                    <Bar dataKey="count">
                      {distribution.map((_, i) => <Cell key={i} fill="#d4a853" />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {tab === "lessons" && <LessonsManager lessons={lessons} />}
        {tab === "plans" && <PlansManager plans={plans} />}
        {tab === "messages" && <MessagesManager messages={messages} />}
        {tab === "ratings" && <RatingsManager ratings={ratings} />}
        {tab === "settings" && <SettingsManager settings={settings} onChange={setSettings} />}
      </div>
    </div>
  );
}

function LessonsManager({ lessons }) {
  const [form, setForm] = useState({ name: "", icon: "◈", description: "", perfectFor: "", pricePerHour: 40, packagePrice: 37, recommendedHours: "30–40 hours", passRate: "—", beginnerFriendly: "YES", status: "active", order: (lessons.length || 0) + 1 });
  const [saving, setSaving] = useState(false);
  const update = (k, v) => setForm({ ...form, [k]: v });
  const submit = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await saveLesson(null, form); setForm({ ...form, name: "", description: "" }); }
    catch (err) { console.warn(err); alert("Save failed. Check Firestore rules."); }
    finally { setSaving(false); }
  };
  const remove = async (id) => { if (window.confirm("Delete this lesson?")) await removeDoc("lessons", id); };

  return (
    <section className="admin-panel" data-testid="admin-lessons-panel">
      <span className="eyebrow">MANAGE LESSONS</span>
      <h2>Lesson types</h2>
      <form onSubmit={submit} className="admin-form">
        <input placeholder="Lesson name" value={form.name} required onChange={(e) => update("name", e.target.value)} data-testid="admin-lesson-name-input" />
        <input placeholder="Icon" value={form.icon} onChange={(e) => update("icon", e.target.value)} />
        <textarea placeholder="Short description" value={form.description} onChange={(e) => update("description", e.target.value)} data-testid="admin-lesson-description-input" />
        <input placeholder="Perfect for" value={form.perfectFor} onChange={(e) => update("perfectFor", e.target.value)} />
        <div className="form-row">
          <input placeholder="Price/hr" type="number" value={form.pricePerHour} onChange={(e) => update("pricePerHour", Number(e.target.value))} data-testid="admin-lesson-price-input" />
          <input placeholder="Package/hr" type="number" value={form.packagePrice} onChange={(e) => update("packagePrice", Number(e.target.value))} />
        </div>
        <div className="form-row">
          <input placeholder="Recommended hours" value={form.recommendedHours} onChange={(e) => update("recommendedHours", e.target.value)} />
          <input placeholder="Pass rate" value={form.passRate} onChange={(e) => update("passRate", e.target.value)} />
        </div>
        <select value={form.beginnerFriendly} onChange={(e) => update("beginnerFriendly", e.target.value)}>
          <option>YES</option><option>INTERMEDIATE</option><option>NO</option><option>POST-TEST</option>
        </select>
        <button className="button" disabled={saving} data-testid="admin-add-lesson-button">{saving ? "Saving…" : "Save lesson"}</button>
      </form>

      <div className="admin-list">
        {lessons.length === 0 && <p className="muted">No lesson documents yet. Add your first above.</p>}
        {lessons.map((l) => (
          <div key={l.id} className="admin-row" data-testid={`admin-lesson-row-${l.id}`}>
            <strong>{l.icon} {l.name}</strong>
            <span>{money(l.packagePrice || l.pricePerHour || 0)}/hr</span>
            <span className="pill">{l.beginnerFriendly || "—"}</span>
            <button className="icon-button" onClick={() => remove(l.id)} data-testid={`admin-delete-lesson-${l.id}`}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlansManager({ plans }) {
  const [form, setForm] = useState({ name: "", description: "", eligibility: "", price: 290, hasOffer: false, discountType: "%", discountValue: 0, offerDetails: "", expiryDate: "", includedFeatures: "", status: "active", order: (plans.length || 0) + 1 });
  const update = (k, v) => setForm({ ...form, [k]: v });
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await savePlan(null, { ...form, includedFeatures: form.includedFeatures.split("\n").map((s) => s.trim()).filter(Boolean) });
      setForm({ ...form, name: "", description: "" });
    } catch { alert("Save failed. Check Firestore rules."); }
    finally { setSaving(false); }
  };
  const remove = async (id) => { if (window.confirm("Delete this plan?")) await removeDoc("plans", id); };

  return (
    <section className="admin-panel" data-testid="admin-plans-panel">
      <span className="eyebrow">MANAGE PLANS</span>
      <h2>Plans & packages</h2>
      <form onSubmit={submit} className="admin-form">
        <input placeholder="Plan name" required value={form.name} onChange={(e) => update("name", e.target.value)} data-testid="admin-plan-name-input" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => update("description", e.target.value)} />
        <input placeholder="Eligibility" value={form.eligibility} onChange={(e) => update("eligibility", e.target.value)} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => update("price", Number(e.target.value))} data-testid="admin-plan-price-input" />
        <label className="admin-check"><input type="checkbox" checked={form.hasOffer} onChange={(e) => update("hasOffer", e.target.checked)} /> Enable offer</label>
        {form.hasOffer && (
          <div className="form-row">
            <select value={form.discountType} onChange={(e) => update("discountType", e.target.value)}><option>%</option><option>£</option></select>
            <input placeholder="Discount value" type="number" value={form.discountValue} onChange={(e) => update("discountValue", Number(e.target.value))} />
            <input placeholder="Expires" type="date" value={form.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} />
          </div>
        )}
        {form.hasOffer && <input placeholder="Offer details" value={form.offerDetails} onChange={(e) => update("offerDetails", e.target.value)} />}
        <textarea placeholder="Included features (one per line)" value={form.includedFeatures} onChange={(e) => update("includedFeatures", e.target.value)} rows={4} />
        <button className="button" disabled={saving} data-testid="admin-add-plan-button">{saving ? "Saving…" : "Save plan"}</button>
      </form>

      <div className="admin-list">
        {plans.length === 0 && <p className="muted">No plan documents yet.</p>}
        {plans.map((p) => (
          <div key={p.id} className="admin-row" data-testid={`admin-plan-row-${p.id}`}>
            <strong>{p.name}</strong>
            <span>{money(p.price || 0)}</span>
            {p.hasOffer && <span className="pill">OFFER</span>}
            <button className="icon-button" onClick={() => remove(p.id)} data-testid={`admin-delete-plan-${p.id}`}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

function MessagesManager({ messages }) {
  return (
    <section className="admin-panel" data-testid="admin-messages-panel">
      <span className="eyebrow">INBOX</span>
      <h2>Enquiries</h2>
      <div className="admin-list wide">
        {messages.length === 0 && <p className="muted">New booking messages will appear here.</p>}
        {messages.map((m) => (
          <div key={m.id} className="admin-message" data-testid={`admin-message-${m.id}`}>
            <div>
              <strong>{m.name}</strong>
              <span className="pill">{m.status || "new"}</span>
            </div>
            <div className="muted small">{m.phone} · {m.country} · {m.selectedPlan}</div>
            {m.email && <div className="muted small">{m.email}</div>}
            {m.extraDetails && <p>{m.extraDetails}</p>}
            <div className="admin-message-actions">
              <select value={m.status || "new"} onChange={(e) => updateMessage(m.id, { status: e.target.value })} data-testid={`admin-message-status-${m.id}`}>
                <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
              </select>
              <a className="button button-small button-outline" href={`https://wa.me/${(m.whatsapp || m.phone || "").replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a>
              <button className="icon-button" onClick={() => window.confirm("Delete this message?") && removeDoc("messages", m.id)} data-testid={`admin-delete-message-${m.id}`}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RatingsManager({ ratings }) {
  return (
    <section className="admin-panel" data-testid="admin-ratings-panel">
      <span className="eyebrow">MODERATION</span>
      <h2>Ratings & reviews</h2>
      <div className="admin-list wide">
        {ratings.length === 0 && <p className="muted">Ratings will appear here.</p>}
        {ratings.map((r) => (
          <div key={r.id} className="admin-review" data-testid={`admin-rating-${r.id}`}>
            <div><strong>{r.name}</strong> · <span className="gold">{r.rating}/10</span></div>
            <p>“{r.reviewText}”</p>
            <div className="admin-message-actions">
              <button className="button button-small button-outline" onClick={() => updateRating(r.id, { visible: !(r.visible !== false) })} data-testid={`admin-toggle-rating-${r.id}`}>
                {r.visible === false ? "Show on site" : "Hide from site"}
              </button>
              <button className="icon-button" onClick={() => window.confirm("Delete this rating?") && removeDoc("ratings", r.id)} data-testid={`admin-delete-rating-${r.id}`}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SettingsManager({ settings, onChange }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const update = (k, v) => onChange({ ...settings, [k]: v });
  const save = async () => {
    setSaving(true); setSaved(false);
    try { await saveSiteSettings(settings); setSaved(true); setTimeout(() => setSaved(false), 2000); }
    catch { alert("Save failed. Check Firestore rules."); }
    finally { setSaving(false); }
  };
  return (
    <section className="admin-panel" data-testid="admin-settings-panel">
      <span className="eyebrow"><Settings size={12} /> SITE SETTINGS</span>
      <h2>Contact & maintenance</h2>
      <div className="admin-form">
        <div className="form-row">
          <label>Phone<input value={settings.phone || ""} onChange={(e) => update("phone", e.target.value)} data-testid="settings-phone-input" /></label>
          <label>WhatsApp (numbers only)<input value={settings.whatsapp || ""} onChange={(e) => update("whatsapp", e.target.value)} data-testid="settings-whatsapp-input" /></label>
        </div>
        <div className="form-row">
          <label>Email<input value={settings.email || ""} onChange={(e) => update("email", e.target.value)} data-testid="settings-email-input" /></label>
          <label>Instagram URL<input value={settings.instagram || ""} onChange={(e) => update("instagram", e.target.value)} data-testid="settings-instagram-input" /></label>
        </div>
        <label>Address<input value={settings.address || ""} onChange={(e) => update("address", e.target.value)} data-testid="settings-address-input" /></label>
        <label className="admin-check"><input type="checkbox" checked={!!settings.maintenanceMode} onChange={(e) => update("maintenanceMode", e.target.checked)} data-testid="settings-maintenance-toggle" /> Maintenance mode</label>
        <button className="button" onClick={save} disabled={saving} data-testid="settings-save-button">{saving ? "Saving…" : saved ? "Saved ✓" : "Save settings"}</button>
      </div>
    </section>
  );
}

export default function Admin() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setReady(true); }), []);
  if (!ready) return <div className="admin-loading" data-testid="admin-loading">Loading…</div>;
  if (!user) return <LoginCard onDone={() => {}} />;
  return <Dashboard user={user} onSignOut={() => signOut(auth)} />;
}
