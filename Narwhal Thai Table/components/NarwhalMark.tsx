/** Decorative narwhal/whale ornament SVG used in the hero card. */
export default function NarwhalMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4B36A" />
          <stop offset="100%" stopColor="#8A6B26" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="#B08D3C" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#B08D3C" strokeWidth="0.5" opacity="0.3" />
      <path d="M 40 110 Q 50 95, 75 95 Q 110 95, 135 105 Q 155 110, 165 115 Q 158 118, 150 120 Q 130 124, 110 122 Q 80 122, 60 120 Q 45 117, 40 110 Z" fill="url(#brassGrad)" opacity="0.95" />
      <path d="M 158 110 Q 175 95, 178 88 Q 172 100, 168 112 Q 172 122, 178 132 Q 175 125, 158 120 Z" fill="url(#brassGrad)" opacity="0.9" />
      <line x1="42" y1="103" x2="8" y2="78" stroke="#D4B36A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="103" x2="8" y2="78" stroke="#8A6B26" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <path d="M 15 82 Q 20 80, 22 84 M 22 84 Q 27 82, 29 86 M 29 86 Q 34 84, 36 88" stroke="#8A6B26" strokeWidth="0.6" fill="none" opacity="0.7" />
      <circle cx="55" cy="104" r="1.8" fill="#0B1F33" />
      <path d="M 95 122 Q 100 132, 108 134 Q 105 128, 102 122 Z" fill="#8A6B26" opacity="0.85" />
      <path d="M 30 145 Q 60 140, 90 145 T 170 145" stroke="#B08D3C" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 40 155 Q 70 150, 100 155 T 165 155" stroke="#B08D3C" strokeWidth="0.4" fill="none" opacity="0.3" />
      <g transform="translate(100, 40)" opacity="0.8">
        <path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="#D4B36A" />
      </g>
    </svg>
  );
}
