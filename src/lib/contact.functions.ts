import { createServerFn } from "@tanstack/react-start";

import { contactSchema, type ContactRecord } from "./contact-shared";

type Row = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

const SELECT_COLUMNS = "id, first_name, last_name, email, subject, message, created_at";

const NOTIFICATION_EMAIL = "marvelprouma@icloud.com";

function toRecord(row: Row): ContactRecord {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    createdAt: row.created_at,
  };
}

async function sendEmailNotification(record: ContactRecord) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notification");
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "KSCS Website <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: `New Contact Form Submission: ${record.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #1e3a5f; margin-bottom: 16px;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${record.firstName} ${record.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${record.email}">${record.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0;">${record.subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Received:</strong></td>
                <td style="padding: 8px 0;">${new Date(record.createdAt).toLocaleString()}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;"><strong>Message:</strong></p>
              <p style="margin: 0; color: #111827; white-space: pre-wrap;">${record.message}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[contact] email notification failed", response.status, body);
    }
  } catch (error) {
    console.error("[contact] email notification error", error);
  }
}

async function syncToGoogleSheets(record: ContactRecord) {
  const webhookUrl = process.env["GOOGLE_SHEETS_WEBHOOK_URL"];
  if (!webhookUrl) {
    console.warn("[contact] GOOGLE_SHEETS_WEBHOOK_URL not set — skipping sheets sync");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
        subject: record.subject,
        message: record.message,
        receivedAt: record.createdAt,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[contact] sheets sync failed", response.status, body);
    }
  } catch (error) {
    console.error("[contact] sheets sync error", error);
  }
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<ContactRecord> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("contact_messages")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email.toLowerCase(),
        subject: data.subject,
        message: data.message,
      })
      .select(SELECT_COLUMNS)
      .single();

    if (error || !row) {
      console.error("[contact] message insert failed", error);
      throw new Error("We couldn't save your message. Please try again.");
    }

    const record = toRecord(row as Row);

    // Fire-and-forget notifications — don't block the form response
    await Promise.all([sendEmailNotification(record), syncToGoogleSheets(record)]);

    return record;
  });