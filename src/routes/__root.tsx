import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import FloatingBackground from "@/components/ui/FloatingBackground";
import AnimatedDigits from "@/components/ui/AnimatedDigits";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/student-life", label: "Student Life" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "News" },
  { to: "/blog", label: "Blog" },
  { to: "/clubs", label: "Clubs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contacts", label: "Contact" },
  { to: "/application-status", label: "Status" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-1 w-full bg-gradient-to-r from-crimson via-gold to-crimson" />
      <div className="container-wide flex h-16 items-center justify-between gap-3">
        <Link
          to="/"
          className="flex min-w-0 flex-1 items-center gap-2.5 font-display text-sm font-bold tracking-tight text-foreground sm:flex-none sm:text-lg"
        >
          <img
            src="/favicon.png"
            alt="King Solomon Comprehensive School crest"
            width={816}
            height={816}
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
          />
          <span className="truncate whitespace-nowrap">King Solomon Comprehensive School</span>
        </Link>
        <MenuNav />
      </div>
    </header>
  );
}

function MenuNav() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 140);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleLinks = navLinks.slice(0, 5);
  const overflowLinks = navLinks.slice(5);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-2"
      onMouseEnter={() => {
        clearCloseTimer();
        setIsOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <div className="hidden items-center gap-2 rounded-full border border-border bg-background/90 px-2 py-1 shadow-sm md:flex">
        {visibleLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{ className: "bg-gold/15 text-navy" }}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-gold/10 hover:text-navy"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {overflowLinks.length > 0 && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => {
                clearCloseTimer();
                setIsOpen(true);
              }}
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:bg-cream"
            >
              More
            </button>

            {isOpen && (
              <div
                className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-border/70 bg-card p-2 shadow-[0_20px_50px_rgba(15,23,42,0.16)]"
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleClose}
              >
                <div className="rounded-xl border border-gold/15 bg-gradient-to-br from-cream/80 to-background p-2">
                  {overflowLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      activeProps={{ className: "bg-gold/15 text-navy" }}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-gold/10 hover:text-navy"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs text-gold">↗</span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/admissions"
                  className="mt-2 block rounded-xl bg-gradient-to-r from-crimson to-crimson-light px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={() => setIsOpen(false)}
                >
                  Apply Now
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        onMouseEnter={() => {
          clearCloseTimer();
          setIsOpen(true);
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-cream md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        <span>More</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-border/70 bg-card p-2 shadow-[0_20px_50px_rgba(15,23,42,0.16)] md:hidden"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <div className="rounded-xl border border-gold/15 bg-gradient-to-br from-cream/80 to-background p-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{ className: "bg-gold/15 text-navy" }}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-gold/10 hover:text-navy"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
                <span className="text-xs text-gold">↗</span>
              </Link>
            ))}
          </div>
          <Link
            to="/admissions"
            className="mt-2 block rounded-xl bg-gradient-to-r from-crimson to-crimson-light px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            onClick={() => setIsOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      )}
    </div>
  );
}

function Footer() {
  const socialLinks = [
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5"
        >
          <path d="M21 8.5a3 3 0 0 0-2.1-2.1C17.5 6 12 6 12 6s-5.5 0-6.9.4A3 3 0 0 0 3 8.5 31 31 0 0 0 2.5 12 31 31 0 0 0 3 15.5a3 3 0 0 0 2.1 2.1C6.5 18 12 18 12 18s5.5 0 6.9-.4A3 3 0 0 0 21 15.5 31 31 0 0 0 21.5 12 31 31 0 0 0 21 8.5Z" />
          <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5"
        >
          <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H8v3h3v7h3v-7h2.5l.5-3H14V8Z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "https://tiktok.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5"
        >
          <path d="M14 5a5 5 0 0 0 5 5V7a3 3 0 0 1-3-3h-2Z" />
          <path d="M16 10a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1a4 4 0 0 1 4-4Z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 10v6" />
          <path d="M8 8v.01" />
          <path d="M12 16v-4a2 2 0 0 1 4 0v4" />
          <path d="M12 10v.01" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5"
        >
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5"
        >
          <path d="M5 5l14 14" />
          <path d="M19 5 5 19" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-border bg-navy text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <img
                src="/favicon.png"
                alt="King Solomon Comprehensive School crest"
                loading="lazy"
                width={816}
                height={816}
                className="h-10 w-10 shrink-0 object-contain"
              />
              King Solomon Comprehensive School
            </div>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/80">
              A place of learning, character, and excellence. Preparing students to lead with
              wisdom, integrity, and purpose.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.slice(1, 6).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Contact</h3>
            <address className="mt-4 not-italic text-sm text-primary-foreground/70">
              <p>P.O.BOX 91-40300</p>
              <p>Homa-Bay, Kenya</p>
              <p className="mt-2">admissions@kingsolomoncs.ac.ke</p>
              <p>0707 467 834 · 0743 333 034</p>
            </address>
          </div>
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
              Follow Us
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-2.5 py-1.5 text-xs font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/20"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold">
                    {social.icon}
                  </span>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-sm text-primary-foreground/60 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} King Solomon Comprehensive School. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contacts" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link to="/contacts" className="hover:text-primary-foreground">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-light"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-light"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Best Private School in Kenya | King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "King Solomon Comprehensive School is a leading best private school in Kenya in Homa Bay, offering quality education, character development, and a nurturing environment for kindergarten through grade 9 learners.",
      },
      { name: "author", content: "King Solomon Comprehensive School" },
      {
        name: "keywords",
        content:
          "best private school in Kenya, best school in Kenya, best school in Homa Bay, top private school in Kenya, private school in Homa Bay, kindergarten school in Kenya, primary school in Homa Bay, CBC school in Kenya, school in Homa Bay Kenya, King Solomon Comprehensive School",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Best Private School in Kenya | King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Discover King Solomon Comprehensive School, a leading private school in Homa Bay, Kenya offering exceptional academics, values, and student growth from kindergarten through grade 9.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kingsolomoncomprehensive.co.ke" },
      { property: "og:image", content: "https://kingsolomoncomprehensive.co.ke/favicon.png" },
      { property: "og:locale", content: "en_KE" },
      { property: "og:site_name", content: "King Solomon Comprehensive School" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@KingSolomonCS" },
      { name: "twitter:title", content: "King Solomon Comprehensive School — Homa Bay, Kenya" },
      {
        name: "twitter:description",
        content:
          "King Solomon Comprehensive School in Homa Bay, Kenya offers quality education from kindergarten through grade 9.",
      },
      { name: "twitter:image", content: "https://kingsolomoncomprehensive.co.ke/favicon.png" },
      { name: "geo.region", content: "KE" },
      { name: "geo.placename", content: "Homa Bay" },
      { name: "geo.position", content: "-0.5286;34.4536" },
      { name: "ICBM", content: "-0.5286, 34.4536" },
      { name: "theme-color", content: "#1e2a4a" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "canonical", href: "https://kingsolomoncomprehensive.co.ke" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "School",
          name: "King Solomon Comprehensive School",
          alternateName: "King Solomon Comprehensive",
          url: "https://kingsolomoncomprehensive.co.ke",
          foundingDate: "2007",
          description:
            "King Solomon Comprehensive School in Homa Bay, Kenya offers quality education from kindergarten through grade 9.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "P.O. BOX 91-40300",
            addressLocality: "Homa Bay",
            addressCountry: "KE"
          },
          email: "admissions@kingsolomoncs.ac.ke",
          telephone: "+254707467834"
        })
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kingsolomoncomprehensive.co.ke" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://kingsolomoncomprehensive.co.ke/about" },
            { "@type": "ListItem", position: 3, name: "Academics", item: "https://kingsolomoncomprehensive.co.ke/academics" },
            { "@type": "ListItem", position: 4, name: "Admissions", item: "https://kingsolomoncomprehensive.co.ke/admissions" },
            { "@type": "ListItem", position: 5, name: "Contact", item: "https://kingsolomoncomprehensive.co.ke/contacts" }
          ]
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <FloatingBackground />
        <main className="flex-1">
          <div className="fade-in">
            <AnimatedDigits />
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
