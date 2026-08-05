import { useServerFn } from "@tanstack/react-start";
import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SUBJECT_OPTIONS, contactSchema, type ContactRecord } from "@/lib/contact-shared";
import { submitContactMessage } from "@/lib/contact.functions";

const fieldClass =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold";
const labelClass = "block text-sm font-medium text-card-foreground";

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
  const submit = useServerFn(submitContactMessage);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ContactRecord | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setPending(true);
    try {
      const record = await submit({ data: parsed.data });
      setResult(record);
    } catch (error) {
      console.error(error);
      setFormError("Something went wrong sending your message. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
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
            <div className="mx-auto max-w-2xl rounded-xl bg-card p-8 shadow-sm md:p-12 pop">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">
                Message sent
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-card-foreground">
                Thank you, {result.firstName}!
              </h2>
              <p className="mt-4 text-muted-foreground">
                We've received your message about "{result.subject}" and our team will get back to
                you at <span className="font-semibold text-card-foreground">{result.email}</span>{" "}
                shortly.
              </p>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="mt-8 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-light"
              >
                Send another message
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form and our team will get back to you as soon as possible.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      maxLength={100}
                      className={fieldClass}
                      placeholder="First"
                    />
                    <FieldError message={errors["firstName"]} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      maxLength={100}
                      className={fieldClass}
                      placeholder="Last"
                    />
                    <FieldError message={errors["lastName"]} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={255}
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                  <FieldError message={errors["email"]} />
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    defaultValue={SUBJECT_OPTIONS[0]}
                    className={fieldClass}
                  >
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option} className="text-foreground">
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors["subject"]} />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    className={fieldClass}
                    placeholder="How can we help you?"
                  />
                  <FieldError message={errors["message"]} />
                </div>
                {formError && <p className="text-sm font-medium text-destructive">{formError}</p>}
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-light disabled:opacity-60 interactive-btn"
                >
                  {pending ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FieldError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-destructive">{message}</p>;
}