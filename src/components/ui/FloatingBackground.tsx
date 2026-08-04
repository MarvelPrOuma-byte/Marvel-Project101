import React from "react";

const ICONS: Array<{ svg: React.ReactNode; size: number }> = [
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"
        />
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 7V5a5 5 0 0110 0v2"
        />
      </svg>
    ),
    size: 36,
  }, // book
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20" />
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6h12M6 12h12M6 18h12"
        />
      </svg>
    ),
    size: 28,
  }, // lines / notebook
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="8" r="3" strokeWidth="1.5" />
        <path
          d="M5.5 21c1-4 4-6 6.5-6s5.5 2 6.5 6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    size: 30,
  }, // person/graduate
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M2 12h20" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    size: 22,
  }, // arrow / pointer
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M4 7h16M4 12h10M4 17h16"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    size: 24,
  }, // list
];

function rand(seed: number, i: number) {
  return ((seed * 9301 + i * 49297) % 233280) / 233280;
}

export function FloatingBackground() {
  const items = React.useMemo(() => {
    const out: Array<{
      left: string;
      top: string;
      delay: string;
      duration: string;
      icon: React.ReactNode;
      size: number;
      opacity: number;
    }> = [];
    for (let i = 0; i < 12; i++) {
      const s = rand(1234, i);
      // i % ICONS.length is always a valid index, so the lookup is never undefined.
      const icon = ICONS[i % ICONS.length]!;
      out.push({
        left: `${Math.round(s * 100)}%`,
        top: `${Math.round(rand(4321, i) * 100)}%`,
        delay: `${Math.round(s * 4000)}ms`,
        duration: `${2200 + Math.round(s * 3600)}ms`,
        icon: icon.svg,
        size: icon.size + Math.round(s * 18),
        opacity: 0.08 + s * 0.4,
      });
    }
    return out;
  }, []);

  return (
    <div aria-hidden className="floating-bg pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it, idx) => (
        <div
          key={idx}
          className="floating-item absolute text-slate"
          style={{
            left: it.left,
            top: it.top,
            opacity: Math.max(0.12, it.opacity),
            width: it.size,
            height: it.size,
            transform: `translate(-50%, -50%)`,
            animationDelay: it.delay,
            animationDuration: it.duration,
          }}
        >
          <div
            style={{ width: "100%", height: "100%", color: "var(--slate)" }}
            className="text-slate/80"
          >
            {it.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FloatingBackground;
