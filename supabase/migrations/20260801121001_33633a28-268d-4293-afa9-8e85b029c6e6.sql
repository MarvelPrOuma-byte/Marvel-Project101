CREATE TYPE public.inquiry_status AS ENUM ('submitted', 'under_review', 'visit_scheduled', 'application_sent', 'accepted', 'waitlisted', 'closed');

CREATE TABLE public.admission_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_code TEXT NOT NULL UNIQUE,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  student_name TEXT NOT NULL,
  grade TEXT NOT NULL,
  start_year TEXT NOT NULL,
  message TEXT,
  status public.inquiry_status NOT NULL DEFAULT 'submitted',
  status_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX admission_inquiries_email_idx ON public.admission_inquiries (lower(email));

GRANT ALL ON public.admission_inquiries TO service_role;

ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_admission_inquiries_updated_at
BEFORE UPDATE ON public.admission_inquiries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();