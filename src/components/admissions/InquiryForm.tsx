import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { downloadInquiryPdf } from "@/lib/admissions-pdf";
import {
  GRADE_OPTIONS,
  START_YEAR_OPTIONS,
  inquirySchema,
  type InquiryRecord,
} from "@/lib/admissions-shared";
import { submitInquiry } from "@/lib/admissions.functions";

const fieldClass =
  "mt-1 w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold";
const labelClass = "block text-sm font-medium text-primary-foreground/90";

export function InquiryForm() {
  const submit = useServerFn(submitInquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<InquiryRecord | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    const form = new FormData(event.currentTarget);
    const parsed = inquirySchema.safeParse({
      parentName: form.get("parentName"),
      email: form.get("email"),
      phone: form.get("phone"),
      studentName: form.get("studentName"),
      grade: form.get("grade"),
      startYear: form.get("startYear"),
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
      setFormError("Something went wrong sending your inquiry. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-xl bg-navy p-8 text-primary-foreground md:p-12 pop">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">
          Inquiry received
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold">Thank you, {result.parentName}</h2>
        <p className="mt-4 text-primary-foreground/80">
          We've logged your inquiry for {result.studentName} ({result.grade}, {result.startYear}).
          Save your reference code — you'll need it along with your email to check progress.
        </p>
        <div className="mt-6 rounded-lg border border-gold/40 bg-primary-foreground/10 p-5 text-center">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
            Reference code
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-gold">{result.referenceCode}</p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => downloadInquiryPdf(result)}
            className="flex-1 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold-light interactive-btn"
          >
            Download PDF confirmation
          </button>
          <Link
            to="/application-status"
            search={{ ref: result.referenceCode }}
            className="flex-1 rounded-md border border-primary-foreground/30 px-4 py-2 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 interactive-btn"
          >
            Track status
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-navy p-8 text-primary-foreground md:p-12">
      <h2 className="font-display text-2xl font-bold">Start an inquiry</h2>
      <p className="mt-4 text-primary-foreground/80">
        Tell us about your student. You'll get a reference code, a downloadable PDF confirmation,
        and a link to track your status.
      </p>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="parentName" className={labelClass}>
            Parent/Guardian Name
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            maxLength={100}
            className={fieldClass}
            placeholder="Your full name"
          />
          <FieldError message={errors["parentName"]} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
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
            <label htmlFor="phone" className={labelClass}>
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={40}
              className={fieldClass}
              placeholder="(555) 123-4567"
            />
            <FieldError message={errors["phone"]} />
          </div>
        </div>
        <div>
          <label htmlFor="studentName" className={labelClass}>
            Student Name
          </label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            maxLength={100}
            className={fieldClass}
            placeholder="Student's full name"
          />
          <FieldError message={errors["studentName"]} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="grade" className={labelClass}>
              Entry Grade
            </label>
            <select id="grade" name="grade" defaultValue="Kindergarten" className={fieldClass}>
              {GRADE_OPTIONS.map((grade) => (
                <option key={grade} value={grade} className="text-foreground">
                  {grade}
                </option>
              ))}
            </select>
            <FieldError message={errors["grade"]} />
          </div>
          <div>
            <label htmlFor="startYear" className={labelClass}>
              Academic Year
            </label>
            <select
              id="startYear"
              name="startYear"
              defaultValue={START_YEAR_OPTIONS[0]}
              className={fieldClass}
            >
              {START_YEAR_OPTIONS.map((year) => (
                <option key={year} value={year} className="text-foreground">
                  {year}
                </option>
              ))}
            </select>
            <FieldError message={errors["startYear"]} />
          </div>
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            Anything we should know? (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            className={fieldClass}
            placeholder="Questions, interests, or scheduling notes"
          />
          <FieldError message={errors["message"]} />
        </div>
        {formError && <p className="text-sm font-medium text-gold">{formError}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-2 w-full rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold-light disabled:opacity-60 interactive-btn"
        >
          {pending ? "Submitting…" : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}

function FieldError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-gold">{message}</p>;
}
