'use client';

import { useState } from 'react';
import { submitNetlifyForm } from '@/lib/netlifyForm';

/** General contact form (questions, suppliers, press, etc.) → Netlify "contact" form. */
export default function ContactForm() {
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
        setError('Something went wrong — please email welcome@narwhalthaihb.com.');
      });
  }

  return (
    <form
      className="reserve-form"
      id="contact-form"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      aria-describedby="contact-form-status"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="form-title">Send us a <em>message</em></div>
      <div className="form-sub">Questions, suppliers, press — anything. We&apos;ll get back to you.</div>

      <div className="form-group">
        <label htmlFor="ct-name">Name</label>
        <input id="ct-name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ct-email">Email</label>
          <input id="ct-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="ct-phone">Phone (optional)</label>
          <input id="ct-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ct-topic">What&apos;s this about?</label>
        <select id="ct-topic" name="topic" required defaultValue="">
          <option value="">Select</option>
          <option>General question</option>
          <option>Reservation</option>
          <option>Catering &amp; private events</option>
          <option>Supplier / vendor</option>
          <option>Press / media</option>
          <option>Careers</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="ct-message">Message</label>
        <textarea id="ct-message" name="message" required placeholder="How can we help?"></textarea>
      </div>

      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="ct-hp">Leave blank</label>
        <input id="ct-hp" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn-submit" disabled={sending || submitted}>
        {submitted ? 'Message Sent' : sending ? 'Sending…' : 'Send Message'}
      </button>
      <p
        id="contact-form-status"
        role="status"
        aria-live="polite"
        style={{
          minHeight: '1em', marginTop: 14,
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          color: 'var(--brass-deep)', fontSize: 16,
        }}
      >
        {submitted && 'Thank you — we will reply soon.'}
        {error && error}
      </p>
    </form>
  );
}
