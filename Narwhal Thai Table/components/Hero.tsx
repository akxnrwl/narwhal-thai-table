'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import NarwhalMark from './NarwhalMark';

/**
 * Hero structure (z-stack inside the .hero section):
 *   z-0: .hero-video         — background video (when present)
 *   z-0: .hero-fallback      — flicker gradient under the video
 *   z-1: ::before / ::after  — vignette + grid pattern
 *   z-1: .hero-watermark     — giant outline "Coming Soon" atmospheric text
 *   z-2: .hero-inner         — actual content (text column + ornament card)
 *   z-2: .hero-scroll        — scroll cue at the bottom
 *
 * The ornament card now wraps the narwhal in a <button> so hover, focus,
 * and tap all trigger the whale-jump + wave-ripple animation defined in
 * globals.css. The animation runs once per interaction (no constant loop).
 */
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

  // Restart the narwhal animation on tap (covers touch devices where
  // :hover doesn't really exist). Briefly removing+re-adding the class
  // forces a CSS animation restart even if the element is still focused.
  const playNarwhal = (el: HTMLElement) => {
    el.classList.remove('is-playing');
    // Force reflow so the next class addition re-triggers the animation.
    void el.offsetWidth;
    el.classList.add('is-playing');
    window.setTimeout(() => el.classList.remove('is-playing'), 1500);
  };

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

      {/*
        Giant outline-only "Coming Soon" watermark — atmospheric.
        Sits behind the hero content (z-index 1, content is z-2) and is
        pointer-events:none so it never blocks clicks. All styling lives
        in globals.css under .hero-watermark.
      */}
      <div className="hero-watermark" aria-hidden="true">Coming Soon</div>

      <div className="hero-inner">
        <div className="hero-text">
          <span className="label hero-coming-soon">Coming Soon · Huntington Beach</span>
          <h1 id="hero-title">
            Come sit<br/>with us, <em>neighbor</em>.
          </h1>
          <p>
            A Thai family kitchen on Beach Boulevard — where the recipes we grew up wit