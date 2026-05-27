import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bubble Glide 3D · Preview',
  description: 'A WebGL preview of Narwhal Thai Table\'s little arcade — same narwhal, new dimension. Hold to swim up, release to sink.',
  openGraph: {
    title: 'Bubble Glide 3D · Narwhal Thai Table',
    description: 'An early WebGL preview — same narwhal, now in 3D.',
  },
};

/**
 * Bubble Glide 3D preview page.
 *
 * Lives at /play/3d as a parallel build to /play (the 2D version).
 * Same iframe approach so the WebGL game stays fully self-contained.
 *
 * Why a separate page (not a replacement):
 *   The 2D game is a working, shipped feature with a leaderboard and
 *   five tuned levels. The 3D version is a scaffold-stage preview —
 *   one camera, one playable character, decorative obstacles. Until
 *   the 3D version reaches parity it sits behind its own URL so the
 *   public /play link keeps working and we can A/B compare side by
 *   side.
 */
export default function Play3DPage() {
  return (
    <section className="play-section">
      <div className="container">
        <div className="section-head">
          <span className="label">Bubble Glide · 3D Preview</span>
          <h2>Same narwhal, <em>new dimension</em>.</h2>
          <p>
            An early WebGL preview built on top of Three.js, using real fish and watercraft 3D models. Hold anywhere on the screen to swim up; release to sink. Hand-mode toggle in the top-right corner mirrors the scene for left-handed players. This is a scaffold &mdash; gameplay and scoring will follow.
          </p>
        </div>

        <div className="play-frame play-frame-3d">
          <iframe
            src="/games/narwhal-game-3d.html"
            title="Bubble Glide 3D Preview — Narwhal Thai Table"
            loading="lazy"
            allow="autoplay; fullscreen; gyroscope"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="play-footnote">
          <p>
            Hold anywhere to swim up &middot; release to sink &middot; Space / W / &uarr; on desktop &middot; tap the &ldquo;Hand: Right&rdquo; badge to flip for lefties.
          </p>
          <div className="play-cta-row">
            <Link href="/play" className="btn-secondary" style={{ color: 'var(--navy)', borderColor: 'var(--line-dark)' }}>
              Play the 2D version
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/#reserve" className="btn-primary">
              Save a Seat
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
