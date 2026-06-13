"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import ParentGuard from "@/components/parent/ParentGuard";
import { getDemoStudents } from "@/lib/demo-store/students";

export default function ParentApplyPage() {
  const { user } = useAuth();
  const parentId = user?.id || "demo-parent-parents";
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getDemoStudents(parentId));
  }, [parentId]);

  return (
    <ParentGuard>
      <section className="bg-[#F5F7FA] py-10">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
              Apply
            </p>
            <h1 className="mt-3 text-4xl font-black text-[#061A2E]">
              Choose an Application
            </h1>
            <p className="mt-4 leading-7 text-[#5F6B7A]">
              Select a program and use a saved student profile to submit the
              application faster.
            </p>
          </div>
          <section className="mt-8 rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0077B6]">
                  Select student
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#061A2E]">
                  {students.length
                    ? `${students.length} student profile${students.length === 1 ? "" : "s"} saved`
                    : "Add a student before applying"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                  Applications use saved student details and keep a submitted
                  snapshot for academy records.
                </p>
              </div>
              <Link
                href={students.length ? "/parent/students" : "/parent/students/new"}
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-[#DDEAF3] bg-white px-4 text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
              >
                {students.length ? "View Students" : "Add Student"}
              </Link>
            </div>
          </section>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/parent/apply/summer-class"
              className="focus-ring rounded-lg border border-[#DDEAF3] bg-white p-6 shadow-sm hover:bg-[#EAF8FF]"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0077B6]">
                3-month summer program
              </p>
              <h2 className="mt-3 text-2xl font-black text-[#061A2E]">
                Summer Class Application
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5F6B7A]">
                For students joining the summer swimming program.
              </p>
            </Link>
            <Link
              href="/parent/apply/membership"
              className="focus-ring rounded-lg border border-[#DDEAF3] bg-white p-6 shadow-sm hover:bg-[#EAF8FF]"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0077B6]">
                Monthly / regular
              </p>
              <h2 className="mt-3 text-2xl font-black text-[#061A2E]">
                Membership Application
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5F6B7A]">
                For regular monthly learners and swimmers.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </ParentGuard>
  );
}
