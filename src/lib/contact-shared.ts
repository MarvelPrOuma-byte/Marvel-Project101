import { z } from "zod";

export const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Admissions",
  "Schedule a Tour",
  "Employment",
  "Other",
] as const;

export const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name").max(100),
  lastName: z.string().trim().min(2, "Please enter your last name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.enum(SUBJECT_OPTIONS),
  message: z.string().trim().min(10, "Please enter a message of at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};