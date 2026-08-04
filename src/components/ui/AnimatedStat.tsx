import React from "react";

function easeOutQuad(t: number) {
  return t * (2 - t);
}

export function AnimatedStat({ value, className }: { value: string; className?: string }) {
  const [display, setDisplay] = React.useState<string>(value);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const match = String(value)
      .trim()
      .match(/^([0-9.,]+)\s*([%+])?$/);
    if (!match) {
      // non-numeric/simple case: just pop in
      setDisplay(value);
      return;
    }

    // The regex above guarantees at least one capture group when match is non-null.
    const raw = match[1]!.replace(/,/g, "");
    const suffix = match[2] || "";
    const target = parseFloat(raw);
    if (Number.isNaN(target)) {
      setDisplay(value);
      return;
    }

    let started = false;

    const startAnim = () => {
      if (started) return;
      started = true;
      const duration = 1200;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutQuad(t);
        const current = target * eased;
        // choose formatting: integer vs decimal
        const formatted = Number.isInteger(target)
          ? Math.round(current).toLocaleString()
          : current.toFixed(1);
        setDisplay(formatted + suffix);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      startAnim();
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          startAnim();
          io.disconnect();
        }
      }
    });

    io.observe(el);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [value]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {display}
    </div>
  );
}

export default AnimatedStat;
