'use client';

import { useState } from 'react';
import { submitNetlifyForm } from '@/lib/netlifyForm';

/** Catering / private events enquiry → Netlify "catering" form. */
export default function CateringForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const hp = (form.elements.namedItem('bot-field') as HTMLInputElement | null)?.value;
    if (hp) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSending(true);
    setError(null);

    submitNetlifyForm(form)
      .then(() => { setSending(false); setSubmitted(true); })
      .catch(() => {
        setSending(false);
        setError('Something went wrong — please email catering@narwhalthaihb.com.');
      });
  }

  return (
    <form
      className="reserve-form"
      id="catering-form"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      aria-describedby="catering-form-status"
    >
      <input type="hidden" name="form-name" value="catering" />
      <div className="form-title">Catering &amp; <em>private events</em></div>
      <div className="form-sub">Buyouts, family-style tastings, off-site catering — tell us about your event.</div>

      <div className="form-group">
        <label htmlFor="cat-name">Name</label>
        <input id="cat-name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cat-email">Email</label>
          <input id="cat-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="cat-phone">Phone</label>
          <input id="cat-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cat-date">Event date</label>
          <input id="cat-date" name="event_date" type="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="cat-guests">Guests</label>
          <select id="cat-guests" name="guests" required defaultValue="">
            <option value="">Select</option>
            <option>Up to 10</option>
            <option>10–25</option>
            <option>25–50</option>
            <option>50–100</option>
            <option>100+</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cat-type">Event type</label>
          <select id="cat-type" name="event_type" required defaultValue="">
            <option value="">Select</option>
            <option>Private dinner</option>
            <option>Corporate event</option>
            <option>Full restaurant buyout</option>
            <option>Off-site catering</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cat-location">Where?</label>
          <select id="cat-location" name="location" required defaultValue="">
            <option value="">Select</option>
            <option>At the restaurant</option>
            <option>Off-site (we come to you)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cat-budget">Budget (per head or total)</label>
        <input id="cat-budget" name="budget" type="text" placeholder="e.g. $60 per head, or $3,000 total" />
      </div>

      <div className="form-group">
        <label htmlFor="cat-message">Tell us more</label>
        <textarea id="cat-message" name="message" placeholder="Occasion, dietary needs, must-have dishes, timing..."></textarea>
      </div>

      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="cat-hp">Leave blank</label>
        <input id="cat-hp" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn-submit" disabled={sending || submitted}>
        {submitted ? 'Request Sent' : sending ? 'Sending…' : 'Request Catering'}
      </button>
      <p
        id="catering-form-status"
        role="status"
        aria-live="polite"
        style={{
          minHeight: '1em', marginTop: 14,
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          color: 'var(--brass-deep)', fontSize: 16,
        }}
      >
        {submitted && 'Thank you — we will be in touch about your event shortly.'}
        {error && error}
      </p>
    </form>
  );
}
