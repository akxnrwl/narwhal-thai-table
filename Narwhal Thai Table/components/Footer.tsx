export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">Narwhal <em>Thai Table</em></div>
        {/*
          Social URLs are placeholders — swap to real account URLs once live.
          rel="noopener" set per security best practice; aria-label clarifies
          the destination because the link text is just the platform name.
        */}
        <nav className="footer-social" aria-label="Social">
          <a href="#" aria-label="Narwhal Thai Table on Instagram" rel="noopener">Instagram</a>
          <a href="#" aria-label="Narwhal Thai Table on Facebook" rel="noopener">Facebook</a>
          <a href="#" aria-label="Narwhal Thai Table on Yelp" rel="noopener">Yelp</a>
          <a href="#" aria-label="Narwhal Thai Table on Google" rel="noopener">Google</a>
        </nav>
        <div className="footer-copy">© 2026 Narwhal Hospitality LLC · Huntington Beach, CA</div>
      </div>
    </footer>
  );
}
