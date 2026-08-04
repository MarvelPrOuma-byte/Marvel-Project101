import { z } from "zod";

export const GRADE_OPTIONS = [
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
] as const;

export const START_YEAR_OPTIONS = ["2027-28", "2028-29"] as const;

export const inquirySchema = z.object({
  parentName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  studentName: z.string().trim().min(2, "Please enter the student's name").max(100),
  grade: z.enum(GRADE_OPTIONS),
  startYear: z.enum(START_YEAR_OPTIONS),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const trackSchema = z.object({
  referenceCode: z
    .string()
    .trim()
    .min(6, "Enter your reference code")
    .max(20)
    .transform((value) => value.toUpperCase()),
  email: z.string().trim().email("Enter the email used on the inquiry").max(255),
});

export type InquiryStatus =
  | "submitted"
  | "under_review"
  | "visit_scheduled"
  | "application_sent"
  | "accepted"
  | "waitlisted"
  | "closed";

export const STATUS_STEPS: { value: InquiryStatus; label: string; description: string }[] = [
  {
    value: "submitted",
    label: "Inquiry Received",
    description: "We have your inquiry and it is in the queue.",
  },
  {
    value: "under_review",
    label: "Under Review",
    description: "Our admissions team is reviewing your family's information.",
  },
  {
    value: "visit_scheduled",
    label: "Visit Scheduled",
    description: "A campus tour or interview has been arranged.",
  },
  {
    value: "application_sent",
    label: "Application Sent",
    description: "Your formal application packet has been issued.",
  },
  {
    value: "accepted",
    label: "Decision Released",
    description: "A final admissions decision has been shared with you.",
  },
];

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  submitted: "Inquiry Received",
  under_review: "Under Review",
  visit_scheduled: "Visit Scheduled",
  application_sent: "Application Sent",
  accepted: "Accepted",
  waitlisted: "Waitlisted",
  closed: "Closed",
};

export type InquiryRecord = {
  referenceCode: string;
  parentName: string;
  email: string;
  phone: string | null;
  studentName: string;
  grade: string;
  startYear: string;
  message: string | null;
  status: InquiryStatus;
  statusNote: string | null;
  createdAt: string;
  updatedAt: string;
};
