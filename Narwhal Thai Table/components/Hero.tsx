'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import NarwhalMark from './NarwhalMark';

export default function Hero() {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    const f = fallbackRef.current;
    if (!v || !f) return;
    const reveal = () => { f.style.opacity = '0'; };
    v.addEventListener('playing', reveal, { once: true });
    v.addEventListener('canplay', () => { if (!v.paused) reveal(); });
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/*
        HERO BACKGROUND VIDEO
        Drop an .mp4 in /public/media (e.g. /public/media/wok.mp4) and uncomment
        the <source> below. Recommended: 1080p, 8–15s, seamless loop, muted,
        under 4MB. Free sources:
          - pexels.com/search/videos/thai cooking
          - pexels.com/search/videos/wok flame
      */}
      <div className="hero-fallback" aria-hidden="true" ref={fallbackRef} />
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        poster=""
      >
        {/* <source src="/media/wok.mp4" type="video/mp4" /> */}
      </video>

      <div className="hero-inner">
        <div className="hero-text">
          <span className="label">A Thai Family Table · Huntington Beach</span>
          <h1 id="hero-title">
            Come sit<br/>with us, <em>neighbor</em>.
          </h1>
          <p>
            A Thai family kitchen on Beach Boulevard — where the recipes we grew up with meet the California coast we now call home. Every plate, by Chef Rainny&apos;s own hands.
          </p>
          <div className="hero-cta">
            <Link href="/#reserve" className="btn-primary">
              Save Me a Seat
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/menu" className="btn-secondary">
              Peek at the Menu
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          {/* Future: replace this stand-in with a real hero photo via <MediaFrame ratio="4/5" ornament="corners" src="/images/hero.jpg" alt="..." priority /> */}
          <div className="visual-frame" role="img" aria-label="Narwhal Thai Table mark">
            <div className="ornament">
              <div className="ornament-narwhal"><NarwhalMark /></div>
              <div className="ornament-text">Narwhal</div>
              <div className="ornament-divider"></div>
              <div className="ornament-tagline">Thai Table · Est. 2026</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">Scroll</div>
    </section>
  );
}
