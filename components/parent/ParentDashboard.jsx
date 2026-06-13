"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import ParentGuard from "@/components/parent/ParentGuard";
import {
  getDemoApplications,
  getDemoStudentProfiles,
  paymentStatusClass,
  statusClass,
  typeLabel,
} from "@/lib/demo-store/applications";
import { getDemoParentProfile } from "@/lib/demo-store/parentProfile";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

export default function ParentDashboard() {
  const router = useRouter();
  const { logout: endSession } = useAuth();
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [parentProfile, setParentProfile] = useState(null);

  useEffect(() => {
    setApplications(getDemoApplications());
    setStudents(getDemoStudentProfiles());
    setParentProfile(getDemoParentProfile());
  }, []);

  function logout() {
    endSession();
    router.push("/login");
  }

  const savedParent =
    parentProfile && Object.values(parentProfile).some((value) => String(value || "").trim())
      ? parentProfile
      : null;
  const latestParent = savedParent || applications[0]?.parent || {
    name: "Parent demo user",
    phone: "Not added yet",
    whatsapp: "Not added yet",
    email: "Not added yet",
    address: "Submit an application to save profile details.",
  };

  return (
    <ParentGuard>
      <section className="bg-[#F5F7FA] py-10">
        <div className="container-shell">
          <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Parent dashboard
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#061A2E]">
                Welcome to TRIC
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                Start a new application or review applications submitted in demo mode.
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="focus-ring min-h-11 w-full rounded-md border border-[#DDEAF3] px-4 text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF] sm:w-auto"
            >
              Logout
            </button>
          </div>

          <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Parent profile
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#061A2E]">
                {latestParent.name}
              </h2>
              <div className="mt-4 grid gap-3 text-sm text-[#334155]">
                <p><span className="font-black text-[#061A2E]">Phone:</span> {latestParent.phone || "Not added yet"}</p>
                <p><span className="font-black text-[#061A2E]">WhatsApp:</span> {latestParent.whatsapp || "Not added yet"}</p>
                <p><span className="font-black text-[#061A2E]">Email:</span> {latestParent.email || "Not added yet"}</p>
                <p><span className="font-black text-[#061A2E]">Address:</span> {latestParent.address || "Not added yet"}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/parent/profile"
                  className="focus-ring rounded-md bg-[#061A2E] px-3 py-2 text-xs font-black text-white"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/parent/students"
                  className="focus-ring rounded-md border border-[#DDEAF3] px-3 py-2 text-xs font-black text-[#061A2E] hover:bg-[#EAF8FF]"
                >
                  View Students
                </Link>
              </div>
            </section>

            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Student profiles
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#061A2E]">
                Saved Students
              </h2>
              <div className="mt-4 grid gap-3">
                {students.length ? (
                  students.map((student) => (
                    <div
                      key={student.id}
                      className="rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-3"
                    >
                      <p className="font-black text-[#061A2E]">{student.fullName}</p>
                      <p className="mt-1 text-sm text-[#5F6B7A]">
                        DOB: {student.dateOfBirth || "-"} | Age: {student.age || "-"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-3 text-sm font-bold text-[#5F6B7A]">
                    No student profiles yet. Submit an application to create one.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/parent/apply/summer-class"
              className="focus-ring rounded-lg border border-[#DDEAF3] bg-white p-6 shadow-sm hover:bg-[#EAF8FF]"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0077B6]">
                3-month program
              </p>
              <h2 className="mt-3 text-2xl font-black text-[#061A2E]">
                Summer Class Application
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5F6B7A]">
                Submit student and parent details for summer swimming classes.
              </p>
            </Link>
            <Link
              href="/parent/apply/membership"
              className="focus-ring rounded-lg border border-[#DDEAF3] bg-white p-6 shadow-sm hover:bg-[#EAF8FF]"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0077B6]">
                Regular swimmers
              </p>
              <h2 className="mt-3 text-2xl font-black text-[#061A2E]">
                Membership Application
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5F6B7A]">
                Apply for regular monthly swimming classes and practice.
              </p>
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-[#DDEAF3] bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-[#DDEAF3] p-5 sm:flex-row sm:items-center">
              <h2 className="text-xl font-black text-[#061A2E]">
                Submitted Applications
              </h2>
              <Link
                href="/parent/applications"
                className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#061A2E] px-4 text-sm font-black text-white sm:w-auto"
              >
                View All
              </Link>
            </div>
            <div className="grid gap-3 p-4 md:hidden">
              {applications.length ? (
                applications.slice(0, 6).map((application) => (
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
                      href={`/parent/applications/${application.id}`}
                      className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#061A2E] px-4 text-sm font-black text-white"
                    >
                      View Application
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
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.length ? (
                    applications.slice(0, 6).map((application) => (
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
                            View
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
