'use client';

import { useState } from 'react';

/**
 * Wraps the long-form portion of the chef bio in a collapsible panel
 * with a "Read More / Show Less" toggle. The intro paragraph above
 * this component stays visible at all times — this is only for the
 * deeper credentials / competitions / golden-quote / tags block.
 *
 * Uses the grid-template-rows: 0fr → 1fr trick so the height animates
 * smoothly to the content's natural size (no max-height guessing).
 * Respects prefers-reduced-motion via CSS in globals.css.
 */
export default function ChefBioReadMore({
  children,
  openLabel = 'Read more about Chef Rainny',
  closeLabel = 'Show less',
}: {
  children: React.ReactNode;
  openLabel?: string;
  closeLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={`chef-bio-collapsible${expanded ? ' is-open' : ''}`}
        aria-hidden={!expanded}
      >
        <div className="chef-bio-inner">{children}</div>
      </div>
      <button
        type="button"
        className="chef-bio-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((e) => !e)}
      >
        <span>{expanded ? closeLabel : openLabel}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          style={{
            transition: 'transform 0.3s ease',
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}
        >
          <path d="M5 9l7 7 7-7" />
        </svg>
      </button>
    </>
  );
}
