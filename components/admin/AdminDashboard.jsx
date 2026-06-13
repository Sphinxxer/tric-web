"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import {
  getDemoApplications,
  paymentStatusClass,
  statusClass,
  typeLabel,
} from "@/lib/demo-store/applications";
import { getDemoParentAccounts } from "@/lib/demo-store/parents";
import { getDemoStudents } from "@/lib/demo-store/students";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [parentCount, setParentCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    setApplications(getDemoApplications());
    setParentCount(getDemoParentAccounts().length);
    setStudentCount(getDemoStudents().length);
  }, []);

  const stats = useMemo(() => {
    return {
      total: applications.length,
      New: applications.filter((item) => item.status === "New").length,
      Reviewed: applications.filter((item) => item.status === "Reviewed").length,
      Approved: applications.filter((item) => item.status === "Approved").length,
      paymentPending: applications.filter((item) => item.paymentStatus === "Pending").length,
    };
  }, [applications]);

  return (
    <AdminGuard>
      <AdminShell title="Dashboard">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {[
            ["Total Applications", stats.total],
            ["New", stats.New],
            ["Approved", stats.Approved],
            ["Payment Pending", stats.paymentPending],
            ["Parent Accounts", parentCount],
            ["Student Profiles", studentCount],
          ].map(([label, value]) => (
            <article
              key={label}
              className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm"
            >
              <p className="text-3xl font-black text-[#061A2E]">{value}</p>
              <h2 className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[#5F6B7A]">
                {label}
              </h2>
            </article>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-[#DDEAF3] bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-[#DDEAF3] p-5 sm:flex-row sm:items-center">
            <h2 className="text-xl font-black text-[#061A2E]">
              Recent Applications
            </h2>
            <Link
              href="/admin/applications"
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#061A2E] px-4 text-sm font-black text-white sm:w-auto"
            >
              View All
            </Link>
          </div>
          <div className="grid gap-3 p-4 md:hidden">
            {applications.length ? (
              applications.slice(0, 8).map((application) => (
                <article
                  key={application.id}
                  className="rounded-lg border border-[#DDEAF3] bg-[#F8FCFF] p-4"
                >
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0077B6]">
                    {application.applicationNo}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-[#061A2E]">
                    {application.student.fullName}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-[#5F6B7A]">
                    Parent: {application.parent.name || "-"}
                  </p>
                  <p className="mt-1 text-sm text-[#5F6B7A]">
                    {typeLabel(application.type)} | {formatDate(application.submittedAt)}
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
                    href={`/admin/applications/${application.id}`}
                    className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#061A2E] px-4 text-sm font-black text-white"
                  >
                    View Application
                  </Link>
                  <Link
                    href={`/admin/applications/${application.id}/print`}
                    className="focus-ring mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#DDEAF3] bg-white px-4 text-sm font-black text-[#061A2E]"
                  >
                    Print A4
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
                  <th className="px-4 py-3">Parent</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.length ? (
                  applications.slice(0, 8).map((application) => (
                    <tr key={application.id}>
                      <td className="px-4 py-3 font-black text-[#061A2E]">
                        {application.applicationNo}
                      </td>
                      <td className="px-4 py-3 text-[#334155]">
                        {application.student.fullName}
                      </td>
                      <td className="px-4 py-3 text-[#334155]">
                        {application.parent.name}
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
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/applications/${application.id}`}
                            className="focus-ring rounded-md border border-[#DDEAF3] px-3 py-2 text-xs font-black text-[#061A2E] hover:bg-[#EAF8FF]"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/applications/${application.id}/print`}
                            className="focus-ring rounded-md bg-[#061A2E] px-3 py-2 text-xs font-black text-white"
                          >
                            Print
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-6 text-[#5F6B7A]" colSpan={8}>
                      No applications submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
