"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ParentGuard from "@/components/parent/ParentGuard";
import {
  getDemoApplications,
  paymentStatusClass,
  statusClass,
  typeLabel,
} from "@/lib/demo-store/applications";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

export default function ParentApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setApplications(getDemoApplications());
    const message = window.sessionStorage?.getItem("tric_demo_application_success");
    if (message) {
      setSuccessMessage(message);
      window.sessionStorage?.removeItem("tric_demo_application_success");
    }
  }, []);

  return (
    <ParentGuard>
      <section className="bg-[#F5F7FA] py-10">
        <div className="container-shell">
          <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Parent records
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#061A2E]">
                My Applications
              </h1>
            </div>
            <Link
              href="/parent/apply"
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#061A2E] px-4 text-center text-sm font-black text-white sm:w-auto"
            >
              New Application
            </Link>
          </div>

          {successMessage ? (
            <p className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <div className="overflow-hidden rounded-lg border border-[#DDEAF3] bg-white shadow-sm">
            <div className="grid gap-3 p-4 md:hidden">
              {applications.length ? (
                applications.map((application) => (
                  <article
                    key={application.id}
                    className="rounded-lg border border-[#DDEAF3] bg-[#F8FCFF] p-4"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0077B6]">
                      {application.applicationNo}
                    </p>
                    <h2 className="mt-2 text-lg font-black text-[#061A2E]">
                      {application.student.fullName}
                    </h2>
                    <p className="mt-1 text-sm font-bold text-[#5F6B7A]">
                      {typeLabel(application.type)}
                    </p>
                    <p className="mt-1 text-sm text-[#5F6B7A]">
                      Submitted {formatDate(application.submittedAt)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
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
                        {application.paymentStatus}
                      </span>
                    </div>
                    <Link
                      href={`/parent/applications/${application.id}`}
                      className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#061A2E] px-4 text-sm font-black text-white"
                    >
                      View Details
                    </Link>
                  </article>
                ))
              ) : (
                <p className="rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-4 text-sm font-bold text-[#5F6B7A]">
                  No applications submitted yet.
                </p>
              )}
            </div>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#EAF8FF] text-xs font-black uppercase tracking-[0.12em] text-[#061A2E]">
                  <tr>
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.length ? (
                    applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-4 py-3 font-black text-[#061A2E]">
                          {application.applicationNo}
                        </td>
                        <td className="px-4 py-3 text-[#334155]">
                          {application.student.fullName}
                        </td>
                        <td className="px-4 py-3 text-[#334155]">
                          {typeLabel(application.type)}
                        </td>
                        <td className="px-4 py-3 text-[#334155]">
                          {formatDate(application.submittedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-md border px-2 py-1 text-xs font-black ${statusClass(
                              application.status,
                            )}`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-md border px-2 py-1 text-xs font-black ${paymentStatusClass(
                              application.paymentStatus,
                            )}`}
                          >
                            {application.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/parent/applications/${application.id}`}
                            className="focus-ring rounded-md border border-[#DDEAF3] px-3 py-2 text-xs font-black text-[#061A2E] hover:bg-[#EAF8FF]"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-6 text-[#5F6B7A]" colSpan={7}>
                        No applications submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </ParentGuard>
  );
}
