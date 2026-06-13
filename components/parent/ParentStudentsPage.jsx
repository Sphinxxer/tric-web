"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import ParentGuard from "@/components/parent/ParentGuard";
import {
  getDemoApplications,
  typeLabel,
} from "@/lib/demo-store/applications";
import { getDemoStudents } from "@/lib/demo-store/students";

function relatedFor(student, applications) {
  return applications.filter((application) => application.studentProfileId === student.id);
}

export default function ParentStudentsPage() {
  const { user } = useAuth();
  const parentId = user?.id || "demo-parent-parents";
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setStudents(getDemoStudents(parentId));
    setApplications(
      getDemoApplications().filter((application) => application.parentId === parentId),
    );
    const message = window.sessionStorage?.getItem("tric_demo_student_success");
    if (message) {
      setSuccessMessage(message);
      window.sessionStorage?.removeItem("tric_demo_student_success");
    }
  }, [parentId]);

  const rows = useMemo(
    () =>
      students.map((student) => ({
        student,
        applications: relatedFor(student, applications),
      })),
    [students, applications],
  );

  return (
    <ParentGuard>
      <section className="bg-[#F5F7FA] py-10">
        <div className="container-shell">
          <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Parent portal
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#061A2E]">
                Student Profiles
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                Add and manage student profiles before submitting applications.
              </p>
            </div>
            <Link
              href="/parent/apply"
              className="focus-ring rounded-md bg-[#061A2E] px-4 py-3 text-center text-sm font-black text-white hover:bg-[#0B2B47]"
            >
              New Application
            </Link>
            <Link
              href="/parent/students/new"
              className="focus-ring rounded-md border border-[#DDEAF3] bg-white px-4 py-3 text-center text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
            >
              Add Student
            </Link>
          </div>

          {successMessage ? (
            <p className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          {rows.length ? (
            <div className="grid gap-4">
              {rows.map(({ student, applications: relatedApplications }) => (
                <section
                  key={student.id}
                  className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <h2 className="text-2xl font-black text-[#061A2E]">
                        {student.fullName}
                      </h2>
                      <div className="mt-3 grid gap-2 text-sm text-[#334155] sm:grid-cols-3">
                        <p>
                          <span className="font-black text-[#061A2E]">DOB:</span>{" "}
                          {student.dateOfBirth || "-"}
                        </p>
                        <p>
                          <span className="font-black text-[#061A2E]">Age:</span>{" "}
                          {student.age || "-"}
                        </p>
                        <p>
                          <span className="font-black text-[#061A2E]">Gender:</span>{" "}
                          {student.gender || "-"}
                        </p>
                        <p>
                          <span className="font-black text-[#061A2E]">Skill:</span>{" "}
                          {student.skillLevel || "-"}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-md border border-[#DDEAF3] bg-[#EAF8FF] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#0077B6]">
                      {relatedApplications.length} related application
                      {relatedApplications.length === 1 ? "" : "s"}
                    </span>
                    <Link
                      href={`/parent/students/${student.id}`}
                      className="focus-ring rounded-md border border-[#DDEAF3] px-3 py-2 text-center text-xs font-black uppercase tracking-[0.12em] text-[#061A2E] hover:bg-[#EAF8FF]"
                    >
                      Edit Student
                    </Link>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {relatedApplications.map((application) => (
                      <Link
                        key={application.id}
                        href={`/parent/applications/${application.id}`}
                        className="focus-ring flex flex-col justify-between gap-2 rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-3 text-sm hover:bg-[#EAF8FF] sm:flex-row sm:items-center"
                      >
                        <span className="font-black text-[#061A2E]">
                          {typeLabel(application.type)}
                        </span>
                        <span className="font-bold text-[#5F6B7A]">
                          {application.applicationNo} | {application.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-[#DDEAF3] bg-white p-6 text-center shadow-sm">
              <h2 className="text-2xl font-black text-[#061A2E]">
                No student profiles yet
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#5F6B7A]">
                Add a student to start an application. One parent account can manage
                multiple student records from the parent portal.
              </p>
              <Link
                href="/parent/students/new"
                className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md bg-[#061A2E] px-5 text-sm font-black text-white hover:bg-[#0B2B47]"
              >
                Add Student
              </Link>
            </div>
          )}
        </div>
      </section>
    </ParentGuard>
  );
}
