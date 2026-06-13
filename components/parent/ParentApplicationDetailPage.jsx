"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ParentGuard from "@/components/parent/ParentGuard";
import {
  getDemoApplication,
  paymentStatusClass,
  statusClass,
  typeLabel,
} from "@/lib/demo-store/applications";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function Detail({ label, value }) {
  return (
    <div className="rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-3">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#5F6B7A]">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-[#061A2E]">{value || "-"}</p>
    </div>
  );
}

export default function ParentApplicationDetailPage({ id }) {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    setApplication(getDemoApplication(id));
  }, [id]);

  return (
    <ParentGuard>
      <section className="bg-[#F5F7FA] py-10">
        <div className="container-shell">
          {!application ? (
            <div className="rounded-lg border border-[#DDEAF3] bg-white p-5 text-[#5F6B7A]">
              Application not found.
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                  {typeLabel(application.type)}
                </p>
                <h1 className="mt-2 text-3xl font-black text-[#061A2E]">
                  {application.student.fullName}
                </h1>
                <p className="mt-2 text-sm text-[#5F6B7A]">
                  {application.applicationNo} | Submitted{" "}
                  {formatDate(application.submittedAt)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-md border px-2 py-1 text-xs font-black ${statusClass(
                      application.status,
                    )}`}
                  >
                    {application.status}
                  </span>
                  <span
                    className={`rounded-md border px-2 py-1 text-xs font-black ${paymentStatusClass(
                      application.paymentStatus,
                    )}`}
                  >
                    Payment: {application.paymentStatus}
                  </span>
                </div>
              </div>

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-[#061A2E]">
                  Student Details
                </h2>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  <Detail label="Name" value={application.student.fullName} />
                  <Detail label="Date of birth" value={application.student.dateOfBirth} />
                  <Detail label="Age" value={application.student.age} />
                  <Detail label="Gender" value={application.student.gender} />
                </div>
              </section>

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-[#061A2E]">
                  Parent Details
                </h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Detail label="Parent / guardian" value={application.parent.name} />
                  <Detail label="Phone" value={application.parent.phone} />
                  <Detail label="WhatsApp" value={application.parent.whatsapp} />
                  <Detail label="Email" value={application.parent.email} />
                  <Detail label="Address" value={application.parent.address} />
                </div>
              </section>

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-[#061A2E]">
                  Emergency, Health & Program
                </h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <Detail label="Emergency contact" value={application.emergency.name} />
                  <Detail label="Emergency phone" value={application.emergency.phone} />
                  <Detail label="Skill level" value={application.health.skillLevel} />
                  <Detail
                    label="Previous experience"
                    value={application.health.previousExperience}
                  />
                  <Detail
                    label="Medical concerns"
                    value={application.health.medicalConcerns}
                  />
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

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-[#061A2E]">
                  Declaration
                </h2>
                <p className="mt-3 rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-3 text-sm font-bold leading-6 text-[#334155]">
                  {application.termsAccepted
                    ? "The declaration was accepted during submission."
                    : "The declaration has not been accepted."}
                </p>
                <p className="mt-3 rounded-md bg-[#EAF8FF] px-4 py-3 text-sm font-bold leading-6 text-[#061A2E]">
                  For changes after submission, please contact TRIC Sports Academy.
                </p>
              </section>

              <div>
                <Link
                  href="/parent/applications"
                  className="focus-ring inline-flex min-h-11 items-center rounded-md border border-[#DDEAF3] bg-white px-4 text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
                >
                  Back to My Applications
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </ParentGuard>
  );
}
