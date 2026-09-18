import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { createRating } from "@/lib/firestoreHelpers";

export default function RatingModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ name: "", rating: 10, reviewText: "" });
  const [state, setState] = useState("idle"); // idle | saving | done | error
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    if (state === "saving") return;
    setState("saving");
    try {
      await createRating(form);
      setState("done");
      onSaved?.();
      setTimeout(() => onClose?.(), 1400);
    } catch (err) {
      console.warn("[rating]", err?.message);
      setState("error");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} data-testid="rating-modal-backdrop">
      <motion.form
        initial={{ y: 30, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        data-testid="rating-modal"
      >
        <button
          type="button"
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Close"
          data-testid="close-rating-modal-button"
        >
          <X />
        </button>
        {state === "done" ? (
          <div className="modal-success" data-testid="rating-success">
            <Check size={40} />
            <h3>Thank you.</h3>
            <p>Your review is live for future learners to see.</p>
          </div>
        ) : (
          <>
            <span className="eyebrow">YOUR EXPERIENCE</span>
            <h2>How did we do?</h2>
            <p>Ratings are public and help future learners. We read every one.</p>

            <label>Your name
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Alex M."
                data-testid="rating-name-input"
              />
            </label>

            <label>
              Rating <b className="gold">{form.rating}/10</b>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={form.rating}
                onChange={(e) => update("rating", Number(e.target.value))}
                data-testid="rating-score-slider"
              />
              <div className="rating-scale" aria-hidden>
                <span>1</span><span>5</span><span>10</span>
              </div>
            </label>

            <label>Your review
              <textarea
                required
                minLength={12}
                maxLength={400}
                value={form.reviewText}
                onChange={(e) => update("reviewText", e.target.value)}
                placeholder="What was your Crown Pass experience like?"
                data-testid="rating-review-input"
              />
            </label>

            {state === "error" && (
              <div className="form-error" data-testid="rating-error">
                We couldn't save your rating right now. Please try again in a moment.
              </div>
            )}

            <button
              className="button"
              type="submit"
              disabled={state === "saving"}
              data-testid="rating-submit-button"
            >
              {state === "saving" ? "Saving…" : "Submit rating ↗"}
            </button>
          </>
        )}
      </motion.form>
    </div>
  );
}
