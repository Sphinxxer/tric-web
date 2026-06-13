"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import { getDemoApplication, typeLabel } from "@/lib/demo-store/applications";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

function Detail({ label, value }) {
  return (
    <div className="avoid-print-break border-b border-slate-200 pb-2">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value || "-"}</p>
    </div>
  );
}

export default function AdminApplicationPrintPage({ id }) {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    setApplication(getDemoApplication(id));
  }, [id]);

  const student = application
    ? {
        ...application.student,
        ...(application.studentSnapshot || {}),
      }
    : null;
  const parent = application
    ? {
        ...application.parent,
        ...(application.parentSnapshot || {}),
      }
    : null;

  return (
    <AdminGuard>
      <section className="bg-[#F5F7FA] py-8 print:bg-white print:py-0">
        <div className="container-shell">
          <div className="no-print mb-5 grid gap-3 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => window.print()}
              className="focus-ring min-h-11 rounded-md bg-[#061A2E] px-4 text-sm font-black text-white"
            >
              Print / Save as PDF
            </button>
            <Link
              href={`/admin/applications/${id}`}
              className="focus-ring inline-flex min-h-11 items-center rounded-md border border-[#DDEAF3] bg-white px-4 text-sm font-black text-[#061A2E]"
            >
              Back
            </Link>
          </div>

          {!application ? (
            <div className="rounded-lg bg-white p-6">Application not found.</div>
          ) : (
            <article className="print-page mx-auto max-w-[210mm] rounded-lg border border-slate-200 bg-white p-4 text-slate-950 shadow-sm sm:p-8 print:max-w-none print:border-0 print:p-0 print:shadow-none">
              <header className="border-b-2 border-slate-950 pb-4">
                <div className="grid gap-4 sm:flex sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-black">TRIC Sports Academy</h1>
                    <p className="mt-1 text-sm font-bold">
                      Application Form
                    </p>
                    <p className="text-sm">Tuesday - Sunday | 5:30 AM - 7:00 PM</p>
                  </div>
                  <div className="text-left text-sm sm:text-right">
                    <p className="font-black">{application.applicationNo}</p>
                    <p>{typeLabel(application.type)}</p>
                    <p>Status: {application.status}</p>
                    <p>Payment: {application.paymentStatus}</p>
                    <p>Submitted: {formatDate(application.submittedAt)}</p>
                  </div>
                </div>
              </header>

              <section className="avoid-print-break mt-5 rounded-md border border-slate-300 p-3 print:rounded-none">
                <h2 className="text-base font-black">Application Overview</h2>
                <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  <Detail label="Application type" value={typeLabel(application.type)} />
                  <Detail label="Submitted date" value={formatDate(application.submittedAt)} />
                  <Detail label="Application status" value={application.status} />
                  <Detail label="Payment status" value={application.paymentStatus} />
                </div>
              </section>

              <section className="avoid-print-break mt-5">
                <h2 className="border-b border-slate-400 pb-1 text-lg font-black">
                  Parent Details
                </h2>
                <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  <Detail label="Parent / guardian name" value={parent.name} />
                  <Detail label="Phone" value={parent.phone} />
                  <Detail label="WhatsApp" value={parent.whatsapp} />
                  <Detail label="Email" value={parent.email} />
                  <Detail label="Address" value={parent.address} />
                </div>
              </section>

              <section className="avoid-print-break mt-5">
                <h2 className="border-b border-slate-400 pb-1 text-lg font-black">
                  Student Details
                </h2>
                <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  <Detail label="Student name" value={student.fullName} />
                  <Detail label="Date of birth" value={student.dateOfBirth} />
                  <Detail label="Age" value={student.age} />
                  <Detail label="Gender" value={student.gender} />
                  <Detail label="Skill level" value={student.skillLevel || application.health.skillLevel} />
                  <Detail
                    label="Swimming experience"
                    value={
                      student.swimmingExperience ||
                      application.health.previousExperience
                    }
                  />
                  <Detail
                    label="Medical concerns"
                    value={
                      student.medicalConcerns ||
                      application.health.medicalConcerns
                    }
                  />
                </div>
              </section>

              <section className="avoid-print-break mt-5">
                <h2 className="border-b border-slate-400 pb-1 text-lg font-black">
                  Emergency Contact
                </h2>
                <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  <Detail label="Name" value={application.emergency.name} />
                  <Detail label="Emergency phone" value={application.emergency.phone} />
                </div>
              </section>

              <section className="avoid-print-break mt-5">
                <h2 className="border-b border-slate-400 pb-1 text-lg font-black">
                  Program Details
                </h2>
                <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {application.type === "summer-class" ? (
                    <>
                      <Detail
                        label="Preferred batch"
                        value={application.program.preferredBatch}
                      />
                      <Detail
                        label="Preferred session"
                        value={application.program.preferredSession}
                      />
                      <Detail
                        label="Preferred timing"
                        value={application.program.preferredTiming}
                      />
                    </>
                  ) : (
                    <>
                      <Detail
                        label="Membership type"
                        value={application.program.membershipType}
                      />
                      <Detail
                        label="Preferred start date"
                        value={application.program.preferredStartDate}
                      />
                      <Detail
                        label="Preferred timing"
                        value={application.program.preferredTiming}
                      />
                    </>
                  )}
                </div>
              </section>

              <section className="avoid-print-break mt-8 border-t border-slate-400 pt-4">
                <h2 className="text-lg font-black">Declaration</h2>
                <p className="mt-2 text-sm leading-6">
                  Terms accepted: {application.termsAccepted ? "Yes" : "No"}. I
                  confirm that the information provided is accurate and agree to be
                  contacted by TRIC Sports Academy regarding this application.
                </p>
                <div className="mt-10 grid gap-8 sm:grid-cols-3">
                  <div className="border-t border-slate-950 pt-2 text-sm font-bold">
                    Parent Signature
                  </div>
                  <div className="border-t border-slate-950 pt-2 text-sm font-bold">
                    Admin Signature
                  </div>
                  <div className="border-t border-slate-950 pt-2 text-sm font-bold">
                    Date
                  </div>
                </div>
              </section>

              <footer className="avoid-print-break mt-8 border-t border-slate-300 pt-3 text-xs text-slate-600">
                <p className="font-black uppercase tracking-wide text-slate-800">
                  For office use only
                </p>
                <p className="mt-1">Generated from TRIC Admin Dashboard.</p>
              </footer>
            </article>
          )}
        </div>
      </section>
    </AdminGuard>
  );
}
