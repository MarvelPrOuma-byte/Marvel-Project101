import { createServerFn } from "@tanstack/react-start";

import {
  inquirySchema,
  trackSchema,
  type InquiryRecord,
  type InquiryStatus,
} from "./admissions-shared";

type Row = {
  reference_code: string;
  parent_name: string;
  email: string;
  phone: string | null;
  student_name: string;
  grade: string;
  start_year: string;
  message: string | null;
  status: InquiryStatus;
  status_note: string | null;
  created_at: string;
  updated_at: string;
};

const SELECT_COLUMNS =
  "reference_code, parent_name, email, phone, student_name, grade, start_year, message, status, status_note, created_at, updated_at";

function toRecord(row: Row): InquiryRecord {
  return {
    referenceCode: row.reference_code,
    parentName: row.parent_name,
    email: row.email,
    phone: row.phone,
    studentName: row.student_name,
    grade: row.grade,
    startYear: row.start_year,
    message: row.message,
    status: row.status,
    statusNote: row.status_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function makeReferenceCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const byte of bytes) code += alphabet[byte % alphabet.length];
  return `KSCS-${code}`;
}

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }): Promise<InquiryRecord> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let lastError: unknown;
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data: row, error } = await supabaseAdmin
        .from("admission_inquiries")
        .insert({
          reference_code: makeReferenceCode(),
          parent_name: data.parentName,
          email: data.email.toLowerCase(),
          phone: data.phone ? data.phone : null,
          student_name: data.studentName,
          grade: data.grade,
          start_year: data.startYear,
          message: data.message ? data.message : null,
        })
        .select(SELECT_COLUMNS)
        .single();

      if (!error && row) return toRecord(row as Row);
      lastError = error;
      if (error?.code !== "23505") break;
    }

    console.error("[admissions] inquiry insert failed", lastError);
    throw new Error("We couldn't save your inquiry. Please try again.");
  });

export const trackInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => trackSchema.parse(data))
  .handler(async ({ data }): Promise<InquiryRecord | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("admission_inquiries")
      .select(SELECT_COLUMNS)
      .eq("reference_code", data.referenceCode)
      .eq("email", data.email.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("[admissions] inquiry lookup failed", error);
      throw new Error("We couldn't look up that inquiry. Please try again.");
    }

    return row ? toRecord(row as Row) : null;
  });
