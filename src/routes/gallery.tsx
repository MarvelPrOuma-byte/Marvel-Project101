import React from "react";
import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute, Link } from "@tanstack/react-router";
import GalleryCarousel from "@/components/ui/GalleryCarousel";

// Import every image in the assets folder so the gallery displays them all.
const galleryImages = import.meta.glob("../assets/*.{JPG,jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function altFromPath(path: string) {
  const fileName = path.split("/").pop() ?? path;
  const base = fileName.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const slides = Object.entries(galleryImages)
  .sort(([a], [b]) => naturalCompare(a, b))
  .map(([path, src]) => ({ src, alt: altFromPath(path) }));

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — King Solomon Comprehensive School" }] }),
  component: GalleryPage,
});

function GalleryPage() {
  React.useEffect(() => {
    document.body.classList.add("has-hero-image");
    return () => document.body.classList.remove("has-hero-image");
  }, []);

  return (
    <div>
      <section className="container-wide section-padding">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold">
            <AnimatedLetters text="Gallery" />
          </h1>
          <p className="mt-4 text-muted-foreground">
            A look inside King Solomon Comprehensive School — {slides.length} photos from our
            classrooms, events, and campus life.
          </p>
        </div>

        <div className="mt-8">
          <GalleryCarousel slides={slides} />
        </div>

        <div className="mt-8 text-sm">
          <Link to="/" className="link-underline">
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
