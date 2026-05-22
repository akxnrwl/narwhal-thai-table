'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/#story',       label: 'Our Story' },
  { href: '/#chef',        label: 'The Chef' },
  { href: '/menu',         label: 'Menu' },
  { href: '/#experience',  label: 'Experience' },
  { href: '/#contact',     label: 'Visit' },
];

/**
 * Top navigation.
 *
 * Mobile rule (≤980px): the desktop "Save a Seat" button is hidden so the
 * header isn't cluttered with two CTAs sitting next to the hamburger. The
 * drawer that opens has Save a Seat as its bottom CTA — one place, no
 * duplicates.
 */
export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Sticky-nav shrink on scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body lock + Esc handler when drawer open
  useEffect(() => {
    document.body.dataset.navOpen = String(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Close drawer when navigating
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close drawer if user resizes back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 980) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isCurrent = (href: string) => {
    if (href === '/menu') return pathname === '/menu' || pathname?.startsWith('/menu/');
    return false;
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
        <Link href="/" className="logo" aria-label="Narwhal Thai Table — home">
          <span className="logo-mark" aria-hidden="true">N</span>
          Narwhal Thai Table
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Save a Seat — desktop only; mobile uses the drawer CTA instead */}
        <Link href="/#reserve" className="btn-reserve desktop-only">Save a Seat</Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-drawer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(v => !v)}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>
      </nav>

      <div
        id="nav-drawer"
        className="nav-drawer"
        data-open={open}
        aria-hidden={!open}
      >
        {NAV_LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            aria-current={isCurrent(l.href) ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/#reserve" className="drawer-cta" onClick={() => setOpen(false)}>
          Save a Seat
        </Link>
      </div>
    </>
  );
}
