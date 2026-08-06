import React from "react";

type Slide = { src: string; alt?: string };

export function GalleryCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [lightboxZoomed, setLightboxZoomed] = React.useState(false);
  const count = slides.length;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const lightboxRef = React.useRef<HTMLDivElement | null>(null);
  const lightboxSlide = slides[lightboxIndex];
  const dragRef = React.useRef<{
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);

  // autoplay
  React.useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      if (!paused && !lightboxOpen) setIndex((i) => (i + 1) % count);
    }, 4000);
    return () => clearInterval(id);
  }, [count, paused, lightboxOpen]);

  // keyboard navigation for carousel and lightbox
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (lightboxOpen) setLightboxIndex((i) => (i - 1 + count) % count);
        else setIndex((i) => (i - 1 + count) % count);
      }
      if (e.key === "ArrowRight") {
        if (lightboxOpen) setLightboxIndex((i) => (i + 1) % count);
        else setIndex((i) => (i + 1) % count);
      }
      if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, lightboxOpen]);

  // simple swipe support
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let delta = 0;
    let pointerId: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      pointerId = e.pointerId;
      (e.target as Element).setPointerCapture(pointerId);
      startX = e.clientX;
      delta = 0;
      setPaused(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      delta = e.clientX - startX;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      try {
        (e.target as Element).releasePointerCapture(pointerId);
      } catch {
        // releasePointerCapture can throw if the pointer is no longer captured.
      }
      pointerId = null;
      setPaused(false);
      if (Math.abs(delta) > 60) {
        if (delta > 0) setIndex((i) => (i - 1 + count) % count);
        else setIndex((i) => (i + 1) % count);
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [count]);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    setLightboxZoomed(false);
    setPaused(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxZoomed(false);
    setPaused(false);
  };

  const changeLightboxIndex = (next: number) => {
    setLightboxIndex(next);
    setLightboxZoomed(false);
    if (lightboxRef.current) {
      lightboxRef.current.scrollLeft = 0;
      lightboxRef.current.scrollTop = 0;
    }
  };

  const toggleZoom = () => {
    setLightboxZoomed((z) => {
      const next = !z;
      if (!next && lightboxRef.current) {
        lightboxRef.current.scrollLeft = 0;
        lightboxRef.current.scrollTop = 0;
      }
      return next;
    });
  };

  // drag-to-pan for zoomed images
  React.useEffect(() => {
    const el = lightboxRef.current;
    if (!el) return;
    if (!lightboxZoomed) {
      el.style.overflow = "hidden";
      el.scrollLeft = 0;
      el.scrollTop = 0;
      return;
    }
    el.style.overflow = "auto";

    const onPointerDown = (e: PointerEvent) => {
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
      };
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      el.scrollLeft = dragRef.current.scrollLeft - (e.clientX - dragRef.current.startX);
      el.scrollTop = dragRef.current.scrollTop - (e.clientY - dragRef.current.startY);
    };

    const onPointerUp = () => {
      dragRef.current = null;
      el.style.cursor = "grab";
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.style.cursor = "";
    };
  }, [lightboxZoomed]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative w-full overflow-hidden rounded-xl"
      aria-roledescription="carousel"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="min-w-full flex-shrink-0">
            <button
              type="button"
              onClick={() => openLightbox(i)}
              className="w-full"
              aria-label={`Open image ${i + 1} in lightbox`}
            >
              <img
                src={s.src}
                alt={s.alt || `slide-${i + 1}`}
                className="h-72 w-full object-cover"
                loading={i === index ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      {count > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-background/70 text-xl text-foreground shadow-sm hover:bg-background"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={() => setIndex((i) => (i + 1) % count)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-background/70 text-xl text-foreground shadow-sm hover:bg-background"
          >
            ›
          </button>

          {/* Indicators — only for small galleries to avoid overflow */}
          {count <= 20 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-8 rounded-full transition-all ${
                    i === index ? "bg-gold" : "bg-primary-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Thumbnails — horizontally scrollable for large galleries */}
          <div className="mt-4 flex items-center gap-3 overflow-x-auto px-2 pb-2">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`thumb flex-none overflow-hidden rounded-md border ${
                  i === index ? "border-gold" : "border-border"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <img
                  src={s.src}
                  alt={s.alt || `thumb-${i + 1}`}
                  className="h-16 w-28 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      {lightboxOpen && lightboxSlide && (
        <div className="lightbox fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            aria-label="Close lightbox"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-md bg-background/80 text-lg hover:bg-background/95"
          >
            ✕
          </button>
          <button
            aria-label="Previous"
            onClick={() => changeLightboxIndex((lightboxIndex - 1 + count) % count)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-2xl hover:bg-background/95 sm:left-4"
          >
            ‹
          </button>
          <div
            ref={lightboxRef}
            className={`flex items-center justify-center ${
              lightboxZoomed ? "cursor-grab select-none" : "cursor-zoom-in select-none"
            }`}
            style={{
              width: lightboxZoomed ? "100%" : "auto",
              height: lightboxZoomed ? "100%" : "auto",
              maxWidth: lightboxZoomed ? "none" : "90vw",
              maxHeight: lightboxZoomed ? "none" : "85vh",
              overflow: lightboxZoomed ? "auto" : "hidden",
            }}
            onClick={toggleZoom}
          >
            <img
              src={lightboxSlide.src}
              alt={lightboxSlide.alt || `light-${lightboxIndex + 1}`}
              className={
                lightboxZoomed
                  ? "max-w-none max-h-none"
                  : "max-h-[85vh] w-auto h-auto object-contain lightbox-img"
              }
              draggable={false}
            />
          </div>
          <button
            aria-label={lightboxZoomed ? "Fit to screen" : "View full size"}
            onClick={toggleZoom}
            className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-sm hover:bg-background/95"
            title={lightboxZoomed ? "Fit to screen" : "View full size"}
          >
            {lightboxZoomed ? "⊟" : "⊞"}
          </button>
          <button
            aria-label="Next"
            onClick={() => changeLightboxIndex((lightboxIndex + 1) % count)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-2xl hover:bg-background/95 sm:right-4"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-4 z-10 rounded-md bg-background/80 px-3 py-1.5 text-xs text-foreground/80">
            {lightboxIndex + 1} / {count}
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryCarousel;