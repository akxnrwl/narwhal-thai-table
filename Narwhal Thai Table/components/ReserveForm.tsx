'use client';

import { useState } from 'react';

/**
 * Reservation form. Currently shows an inline confirmation message on submit
 * and does NOT POST anywhere. When ready to wire up a backend:
 *   - Replace the `setTimeout` block in handleSubmit with a `fetch()` to your
 *     endpoint (Formspree, Resend, /api route, etc.)
 *   - The honeypot ("company") field should be checked server-side as well.
 */
export default function ReserveForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot — bots fill hidden fields; real users don't
    const hp = (form.elements.namedItem('company') as HTMLInputElement | null)?.value;
    if (hp) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSending(true);
    setError(null);

    // Simulated latency until a real backend is wired up
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 400);
  }

  return (
    <form
      className="reserve-form"
      id="reserve-form"
      method="post"
      action=""
      noValidate
      onSubmit={handleSubmit}
      aria-describedby="reserve-form-status"
    >
      <div className="form-title">Book a <em>seat</em> at the table</div>
      <div className="form-sub">We&apos;ll text or email you to confirm — usually within a few hours.</div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rsv-first">First Name</label>
          <input id="rsv-first" name="first_name" type="text" autoComplete="given-name" required />
        </div>
        <div className="form-group">
          <label htmlFor="rsv-last">Last Name</label>
          <input id="rsv-last" name="last_name" type="text" autoComplete="family-name" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rsv-email">Email</label>
          <input id="rsv-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="rsv-phone">Phone</label>
          <input id="rsv-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rsv-date">Date</label>
          <input id="rsv-date" name="date" type="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="rsv-time">Time</label>
          <select id="rsv-time" name="time" required defaultValue="">
            <option value="">Select</option>
            <option>5:00 PM</option><option>5:30 PM</option>
            <option>6:00 PM</option><option>6:30 PM</option>
            <option>7:00 PM</option><option>7:30 PM</option>
            <option>8:00 PM</option><option>8:30 PM</option>
            <option>9:00 PM</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="rsv-party">Party Size</label>
        <select id="rsv-party" name="party_size" required defaultValue="">
          <option value="">Select</option>
          <option>2 Guests</option><option>3 Guests</option>
          <option>4 Guests</option><option>5 Guests</option>
          <option>6 Guests</option><option>7+ (please specify)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rsv-notes">Anything we should know?</label>
        <textarea id="rsv-notes" name="notes" placeholder="Allergies, spice level, occasion, seating preference..."></textarea>
      </div>

      {/* Honeypot for spam bots — never visible/focusable for real users */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="rsv-hp">Leave blank</label>
        <input id="rsv-hp" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn-submit" disabled={sending || submitted}>
        {submitted ? 'Request Sent' : sending ? 'Sending…' : 'Request Reservation'}
      </button>
      <p
        id="reserve-form-status"
        role="status"
        aria-live="polite"
        style={{
          minHeight: '1em', marginTop: 14,
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          color: 'var(--brass-deep)', fontSize: 16,
        }}
      >
        {submitted && 'Thank you — we will confirm your reservation within a few hours.'}
        {error && error}
      </p>
    </form>
  );
}
