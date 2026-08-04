import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contact — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Get in touch with King Solomon Comprehensive School for admissions, general inquiries, or to schedule a campus visit.",
      },
      { property: "og:title", content: "Contact — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Get in touch with King Solomon Comprehensive School for admissions, general inquiries, or to schedule a campus visit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text={"We'd love to hear from you"} />
          </h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Admissions Office
                </h2>
                <p className="mt-2 text-muted-foreground">
                  For application questions, tours, and enrollment information.
                </p>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p>admissions@kingsolomoncs.ac.ke</p>
                  <p>0707 467 834</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">General Office</h2>
                <p className="mt-2 text-muted-foreground">
                  For all other school-related questions and communications.
                </p>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p>info@kingsolomoncs.ac.ke</p>
                  <p>0743 333 034</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Visit Us</h2>
                <address className="mt-4 not-italic text-sm text-muted-foreground">
                  <p>P.O.BOX 91-40300</p>
                  <p>Homa-Bay, Kenya</p>
                  <p className="mt-2">Monday – Friday: 7:30 AM – 4:00 PM</p>
                </address>
              </div>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-card-foreground">
                Send a message
              </h2>
              <form className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first"
                      className="block text-sm font-medium text-card-foreground"
                    >
                      First Name
                    </label>
                    <input
                      id="first"
                      type="text"
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="First"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last"
                      className="block text-sm font-medium text-card-foreground"
                    >
                      Last Name
                    </label>
                    <input
                      id="last"
                      type="text"
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="Last"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-card-foreground"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option>General Inquiry</option>
                    <option>Admissions</option>
                    <option>Schedule a Tour</option>
                    <option>Employment</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-card-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-light"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
