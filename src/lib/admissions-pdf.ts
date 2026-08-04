import { jsPDF } from "jspdf";

import { STATUS_LABELS, type InquiryRecord } from "./admissions-shared";

const NAVY: [number, number, number] = [16, 33, 62];
const GOLD: [number, number, number] = [190, 154, 78];
const GRAY: [number, number, number] = [90, 95, 105];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function downloadInquiryPdf(inquiry: InquiryRecord) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 56;

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 110, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 110, pageWidth, 5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text("King Solomon Comprehensive School", margin, 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Admissions Inquiry Confirmation", margin, 78);

  let y = 160;
  doc.setTextColor(...NAVY);
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text(`Reference ${inquiry.referenceCode}`, margin, y);

  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text(
    `Submitted ${formatDate(inquiry.createdAt)}  •  Last updated ${formatDate(inquiry.updatedAt)}`,
    margin,
    y,
  );

  const rows: [string, string][] = [
    ["Current Status", STATUS_LABELS[inquiry.status]],
    ["Student Name", inquiry.studentName],
    ["Entry Grade", inquiry.grade],
    ["Academic Year", inquiry.startYear],
    ["Parent / Guardian", inquiry.parentName],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone ?? "—"],
  ];

  y += 34;
  for (const [label, value] of rows) {
    doc.setDrawColor(225, 228, 234);
    doc.line(margin, y + 8, pageWidth - margin, y + 8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text(label.toUpperCase(), margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(value, margin + 190, y);
    y += 30;
  }

  if (inquiry.statusNote) {
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text("NOTE FROM ADMISSIONS", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    for (const line of doc.splitTextToSize(inquiry.statusNote, pageWidth - margin * 2)) {
      doc.text(line, margin, y);
      y += 16;
    }
  }

  if (inquiry.message) {
    y += 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text("YOUR MESSAGE", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    for (const line of doc.splitTextToSize(inquiry.message, pageWidth - margin * 2)) {
      doc.text(line, margin, y);
      y += 16;
    }
  }

  const footerY = doc.internal.pageSize.getHeight() - 60;
  doc.setDrawColor(...GOLD);
  doc.line(margin, footerY - 18, pageWidth - margin, footerY - 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(
    "Keep this reference code to track your inquiry at kingsolomoncs.ac.ke/application-status",
    margin,
    footerY,
  );
  doc.text(
    "P.O.BOX 91-40300, Homa-Bay, Kenya  •  admissions@kingsolomoncs.ac.ke",
    margin,
    footerY + 14,
  );

  doc.save(`KSCS-inquiry-${inquiry.referenceCode}.pdf`);
}
