import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where as whereClause,
} from "firebase/firestore";
import { db } from "@/firebase";

// Resilient read: never throws to the UI. If Firestore is offline / rules block
// reads, we return the caller-provided fallback so pages still render.
export async function safeGet(name, fallback = [], options = {}) {
  try {
    const clauses = [collection(db, name)];
    if (options.orderField) clauses.push(orderBy(options.orderField, options.orderDir || "asc"));
    if (options.max) clauses.push(limit(options.max));
    if (options.where) clauses.push(whereClause(options.where.field, options.where.op || "==", options.where.value));
    const q = query(...clauses);
    const s = await getDocs(q);
    return s.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("[firestore] read failed", name, err?.message);
    return fallback;
  }
}

export function subscribe(name, cb, options = {}) {
  try {
    const clauses = [collection(db, name)];
    if (options.orderField) clauses.push(orderBy(options.orderField, options.orderDir || "asc"));
    if (options.max) clauses.push(limit(options.max));
    const q = query(...clauses);
    return onSnapshot(
      q,
      (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => {
        console.warn("[firestore] subscribe failed", name, err?.message);
        cb([]);
      },
    );
  } catch (err) {
    console.warn("[firestore] subscribe error", name, err?.message);
    cb([]);
    return () => {};
  }
}

export async function createMessage(payload) {
  return addDoc(collection(db, "messages"), {
    ...payload,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function createRating(payload) {
  return addDoc(collection(db, "ratings"), {
    ...payload,
    rating: Number(payload.rating),
    visible: true,
    createdAt: serverTimestamp(),
  });
}

export async function saveLesson(id, payload) {
  const ref = id ? doc(db, "lessons", id) : doc(collection(db, "lessons"));
  await setDoc(
    ref,
    { ...payload, updatedAt: serverTimestamp(), createdAt: payload.createdAt || serverTimestamp() },
    { merge: true },
  );
  return ref.id;
}

export async function savePlan(id, payload) {
  const ref = id ? doc(db, "plans", id) : doc(collection(db, "plans"));
  await setDoc(
    ref,
    { ...payload, updatedAt: serverTimestamp(), createdAt: payload.createdAt || serverTimestamp() },
    { merge: true },
  );
  return ref.id;
}

export async function saveSiteSettings(payload) {
  const ref = doc(db, "siteSettings", "config");
  await setDoc(ref, { ...payload, updatedAt: serverTimestamp() }, { merge: true });
}

export async function updateMessage(id, payload) {
  await updateDoc(doc(db, "messages", id), payload);
}

export async function removeDoc(name, id) {
  await deleteDoc(doc(db, name, id));
}

export async function updateRating(id, payload) {
  await updateDoc(doc(db, "ratings", id), payload);
}

// Fire-and-forget visitor tracking. Public-safe: only writes to analytics/{yyyy-mm-dd}
// and only once per browser session per day to keep the free-tier bill at zero.
export function trackVisit() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const key = `crown-visit-${today}`;
    if (typeof sessionStorage === "undefined" || sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    const ref = doc(db, "analytics", today);
    // Merge-update with atomic increment. Creates the document on first hit.
    setDoc(
      ref,
      {
        date: today,
        visitorCount: increment(1),
        pageViews: increment(1),
        lastSeenAt: serverTimestamp(),
      },
      { merge: true },
    ).catch((err) => {
      console.warn("[analytics] track failed", err?.message);
    });
  } catch {
    /* no-op */
  }
}
