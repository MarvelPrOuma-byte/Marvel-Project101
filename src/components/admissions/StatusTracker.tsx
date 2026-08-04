import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { downloadInquiryPdf } from "@/lib/admissions-pdf";
import {
  STATUS_LABELS,
  STATUS_STEPS,
  trackSchema,
  type InquiryRecord,
} from "@/lib/admissions-shared";
import { trackInquiry } from "@/lib/admissions.functions";

const fieldClass =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function StatusTracker({ initialReference = "" }: { initialReference?: string }) {
  const lookup = useServerFn(trackInquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryRecord | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);
    const form = new FormData(event.currentTarget);
    const parsed = trackSchema.safeParse({
      referenceCode: form.get("referenceCode"),
      email: form.get("email"),
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
      const record = await lookup({ data: parsed.data });
      if (!record) {
        setInquiry(null);
        setNotice(
          "We couldn't find an inquiry with that reference code and email. Please check both and try again.",
        );
      } else {
        setInquiry(record);
      }
    } catch (error) {
      console.error(error);
      setNotice("Something went wrong looking that up. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
      <div className="rounded-xl bg-card p-8 shadow-sm card-hover">
        <h2 className="font-display text-2xl font-bold text-card-foreground">
          Look up your inquiry
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the reference code from your confirmation along with the email you used.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="referenceCode"
              className="block text-sm font-medium text-card-foreground"
            >
              Reference Code
            </label>
            <input
              id="referenceCode"
              name="referenceCode"
              type="text"
              maxLength={20}
              defaultValue={initialReference}
              className={`${fieldClass} uppercase tracking-widest`}
              placeholder="KSCS-XXXXXXXX"
            />
            {errors["referenceCode"] && (
              <p className="mt-1 text-xs font-medium text-destructive">{errors["referenceCode"]}</p>
            )}
          </div>
          <div>
            <label htmlFor="track-email" className="block text-sm font-medium text-card-foreground">
              Email
            </label>
            <input
              id="track-email"
              name="email"
              type="email"
              maxLength={255}
              className={fieldClass}
              placeholder="you@example.com"
            />
            {errors["email"] && (
              <p className="mt-1 text-xs font-medium text-destructive">{errors["email"]}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-light disabled:opacity-60 interactive-btn"
          >
            {pending ? "Checking…" : "Check Status"}
          </button>
          {notice && <p className="text-sm font-medium text-destructive">{notice}</p>}
        </form>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        {!inquiry ? (
          <div className="flex h-full flex-col justify-center py-8 text-center">
            <h3 className="font-display text-xl font-semibold text-card-foreground">
              No inquiry loaded yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Once you look up your reference code, you'll see your current stage, notes from our
              admissions office, and a downloadable PDF summary.
            </p>
          </div>
        ) : (
          <div className="pop">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Reference {inquiry.referenceCode}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-card-foreground">
                  {inquiry.studentName}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {inquiry.grade} · {inquiry.startYear} · submitted {formatDate(inquiry.createdAt)}
                </p>
              </div>
              <span className="rounded-full bg-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground pop pulse-soft">
                {STATUS_LABELS[inquiry.status]}
              </span>
            </div>

            <ol className="mt-8 space-y-5">
              {STATUS_STEPS.map((step, index) => {
                const currentIndex = STATUS_STEPS.findIndex((s) => s.value === inquiry.status);
                const activeIndex = currentIndex === -1 ? 1 : currentIndex;
                const done = index < activeIndex;
                const current = index === activeIndex;
                return (
                  <li key={step.value} className="flex gap-4">
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        done
                          ? "bg-gold text-navy-dark"
                          : current
                            ? "bg-navy text-primary-foreground"
                            : "border border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {done ? "✓" : index + 1}
                    </span>
                    <div>
                      <p
                        className={`text-sm font-semibold ${current || done ? "text-card-foreground" : "text-muted-foreground"}`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {inquiry.statusNote && (
              <div className="mt-8 rounded-lg border border-gold/40 bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Note from admissions
                </p>
                <p className="mt-2 text-sm text-foreground">{inquiry.statusNote}</p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => downloadInquiryPdf(inquiry)}
                className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-light"
              >
                Download PDF summary
              </button>
              <p className="self-center text-xs text-muted-foreground">
                Last updated {formatDate(inquiry.updatedAt)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
