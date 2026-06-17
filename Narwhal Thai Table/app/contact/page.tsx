import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reservations, catering and private events, and general enquiries for Narwhal Thai Table in Huntington Beach.',
};

export default function ContactHubPage() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-head">
          <span className="label" style={{ color: 'var(--brass-light)' }}>Come See Us</span>
          <h2 style={{ color: 'var(--off-white)' }}>How can we <em style={{ color: 'var(--brass-light)' }}>help?</em></h2>
        </div>
        <div className="contact-cards">
          <Link className="contact-card" href="/contact/reservation">
            <span className="contact-card-num">01</span>
            <h3>Reservations</h3>
            <p>Request a table &mdash; we&apos;ll confirm within a few hours.</p>
            <span className="contact-card-email">reservations@narwhalthaihb.com</span>
            <span className="contact-card-go">Book a table <span aria-hidden="true">&rarr;</span></span>
          </Link>
          <Link className="contact-card" href="/contact/catering">
            <span className="contact-card-num">02</span>
            <h3>Catering &amp; Events</h3>
            <p>Buyouts, family-style tastings, off-site catering.</p>
            <span className="contact-card-email">catering@narwhalthaihb.com</span>
            <span className="contact-card-go">Plan an event <span aria-hidden="true">&rarr;</span></span>
          </Link>
          <Link className="contact-card" href="/contact/message">
            <span className="contact-card-num">03</span>
            <h3>Say Hello</h3>
            <p>Questions, suppliers, press &mdash; we&apos;ll get back to you.</p>
            <span className="contact-card-email">welcome@narwhalthaihb.com</span>
            <span className="contact-card-go">Send a message <span aria-hidden="true">&rarr;</span></span>
          </Link>
        </div>
        <div className="contact-visit">
          <div className="contact-visit-info">
            <span className="label">Find us</span>
            <h3>Visit the table</h3>
            <p>19072 Beach Boulevard<br/>Huntington Beach, CA 92648<br/>Open daily &middot; 11:00&nbsp;AM &ndash; 11:00&nbsp;PM</p>
          </div>
          <a className="map-placeholder" href="https://www.google.com/maps/search/?api=1&query=19072+Beach+Blvd+Huntington+Beach+CA+92648" target="_blank" rel="noopener">
            <div className="map-content">
              <svg className="map-pin" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
                <path d="M28 6c-9 0-16 7-16 16 0 12 16 28 16 28s16-16 16-28c0-9-7-16-16-16z" />
                <circle cx="28" cy="22" r="6" />
              </svg>
              <div className="addr">19072 Beach Boulevard</div>
              <div className="city">Huntington Beach, California &middot; open in Google Maps</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
