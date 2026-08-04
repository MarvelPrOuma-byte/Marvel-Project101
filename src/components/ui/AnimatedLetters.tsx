import React from "react";

function seeded(i: number, charCode: number) {
  // deterministic pseudo-random based on index and char code
  return ((i * 37 + charCode * 17) % 100) / 100;
}

export function AnimatedLetters({ text, className }: { text: string; className?: string }) {
  const letters = Array.from(text);

  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => {
        const code = ch.charCodeAt(0) || i;
        const s = seeded(i, code);
        const delay = (s * 700).toFixed(0) + "ms";
        // duration between 2400ms and 4200ms
        const duration = Math.round(2400 + s * 1800) + "ms";
        const transformOrigin = i % 2 === 0 ? "center bottom" : "center top";
        // preserve spaces
        if (ch === " ") return <span key={i} className="inline-block w-2" aria-hidden />;
        return (
          <span
            key={i}
            className="float-letter inline-block"
            style={{
              animationDelay: delay,
              animationDuration: duration,
              transformOrigin,
              display: "inline-block",
            }}
            aria-hidden
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

export default AnimatedLetters;
