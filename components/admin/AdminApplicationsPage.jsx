"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import {
  APPLICATION_STATUSES,
  PAYMENT_STATUSES,
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

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    setApplications(getDemoApplications());
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return applications.filter((application) => {
      const haystack = [
        application.student.fullName,
        application.parent.name,
        application.parent.phone,
        application.parent.whatsapp,
        application.parent.email,
        application.applicationNo,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!query || haystack.includes(query)) &&
        (!type || application.type === type) &&
        (!status || application.status === status) &&
        (!paymentStatus || application.paymentStatus === paymentStatus)
      );
    });
  }, [applications, search, type, status, paymentStatus]);

  return (
    <AdminGuard>
      <AdminShell title="Applications">
        <div className="mb-5 grid gap-3 rounded-lg border border-[#DDEAF3] bg-white p-4 shadow-sm lg:grid-cols-[1fr_190px_190px_190px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by student, parent, phone, or reference"
            aria-label="Search applications"
            className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-sm"
          />
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            aria-label="Filter by application type"
            className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-sm"
          >
            <option value="">All application types</option>
            <option value="summer-class">Summer Class</option>
            <option value="membership">Membership</option>
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by application status"
            className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-sm"
          >
            <option value="">All statuses</option>
            {APPLICATION_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={paymentStatus}
            onChange={(event) => setPaymentStatus(event.target.value)}
            aria-label="Filter by payment status"
            className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 text-sm"
          >
            <option value="">All payment statuses</option>
            {PAYMENT_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#DDEAF3] bg-white shadow-sm">
          <div className="grid gap-3 p-4 md:hidden">
            {filtered.length ? (
              filtered.map((application) => (
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
                  <div className="mt-2 grid gap-1 text-sm text-[#5F6B7A]">
                    <p>
                      <span className="font-black text-[#061A2E]">Parent:</span>{" "}
                      {application.parent.name || "-"}
                    </p>
                    <p>
                      <span className="font-black text-[#061A2E]">Phone:</span>{" "}
                      {application.parent.phone || "-"}
                    </p>
                    <p>
                      <span className="font-black text-[#061A2E]">Type:</span>{" "}
                      {typeLabel(application.type)}
                    </p>
                    <p>
                      <span className="font-black text-[#061A2E]">Submitted:</span>{" "}
                      {formatDate(application.submittedAt)}
                    </p>
                  </div>
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
                  <div className="mt-4 grid gap-2">
                    <Link
                      href={`/admin/applications/${application.id}`}
                      className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-[#DDEAF3] bg-white px-4 text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/applications/${application.id}/print`}
                      className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-[#061A2E] px-4 text-sm font-black text-white"
                    >
                      Print
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-4 text-sm font-bold text-[#5F6B7A]">
                No applications found.
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
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length ? (
                  filtered.map((application) => (
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
                        {application.parent.phone}
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
                    <td className="px-4 py-6 text-[#5F6B7A]" colSpan={9}>
                      No applications found.
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
