"use client";

function GiftSvg({ idPrefix }: { idPrefix: string }) {
  const p = idPrefix;
  return (
    <svg
      className="gift-svg"
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${p}-paper`} x1="60" y1="80" x2="300" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFCF7" />
          <stop offset="0.45" stopColor="#F1E8DC" />
          <stop offset="1" stopColor="#DCCFBE" />
        </linearGradient>
        <linearGradient id={`${p}-lid`} x1="70" y1="90" x2="290" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E8DFD2" />
        </linearGradient>
        <linearGradient id={`${p}-ribbon`} x1="160" y1="70" x2="200" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D0927C" />
          <stop offset="0.5" stopColor="#A66B5A" />
          <stop offset="1" stopColor="#8C5647" />
        </linearGradient>
        <linearGradient id={`${p}-bow`} x1="120" y1="40" x2="240" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4A08C" />
          <stop offset="1" stopColor="#9E5B4A" />
        </linearGradient>
        <filter id={`${p}-shadow`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000" floodOpacity="0.32" />
        </filter>
      </defs>

      <g filter={`url(#${p}-shadow)`}>
        <rect x="78" y="128" width="204" height="168" rx="14" fill={`url(#${p}-paper)`} />
        <rect x="68" y="108" width="224" height="42" rx="12" fill={`url(#${p}-lid)`} />
        <rect x="68" y="142" width="224" height="8" rx="2" fill="#D9CFC0" opacity="0.85" />
        <rect x="164" y="108" width="32" height="188" rx="3" fill={`url(#${p}-ribbon)`} />
        <rect x="78" y="192" width="204" height="32" rx="3" fill={`url(#${p}-ribbon)`} />
        <ellipse cx="148" cy="78" rx="42" ry="28" fill={`url(#${p}-bow)`} transform="rotate(-18 148 78)" />
        <ellipse cx="212" cy="78" rx="42" ry="28" fill={`url(#${p}-bow)`} transform="rotate(18 212 78)" />
        <ellipse cx="148" cy="78" rx="22" ry="14" fill="#8C5647" opacity="0.25" transform="rotate(-18 148 78)" />
        <ellipse cx="212" cy="78" rx="22" ry="14" fill="#8C5647" opacity="0.25" transform="rotate(18 212 78)" />
        <circle cx="180" cy="86" r="16" fill={`url(#${p}-bow)`} />
        <circle cx="180" cy="84" r="8" fill="#E2B09A" opacity="0.55" />
        <path d="M168 98 L152 148 L172 142 Z" fill="#A66B5A" />
        <path d="M192 98 L208 148 L188 142 Z" fill="#8C5647" />
        <path d="M96 140 L150 296" stroke="white" strokeOpacity="0.28" strokeWidth="18" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden>
      <div className="hero-ring hero-ring-a" />
      <div className="hero-ring hero-ring-b" />
      <div className="hero-ring hero-ring-c" />

      <div className="hero-sparkle s1" />
      <div className="hero-sparkle s2" />
      <div className="hero-sparkle s3" />
      <div className="hero-sparkle s4" />
      <div className="hero-sparkle s5" />
      <div className="hero-sparkle s6" />
      <div className="hero-sparkle s7" />
      <div className="hero-sparkle s8" />
      <div className="hero-sparkle s9" />
      <div className="hero-sparkle s10" />

      <div className="gift-stage gift-stage-back">
        <div className="gift-float gift-float-back">
          <GiftSvg idPrefix="giftb" />
        </div>
      </div>

      <div className="gift-stage gift-stage-side">
        <div className="gift-float gift-float-side">
          <GiftSvg idPrefix="gifts" />
        </div>
      </div>

      <div className="gift-stage gift-stage-main">
        <div className="gift-shadow" />
        <div className="gift-spin">
          <div className="gift-float">
            <GiftSvg idPrefix="giftm" />
          </div>
        </div>
      </div>
    </div>
  );
}
