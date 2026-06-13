"use client";

import Link from "next/link";
import ParentGuard from "@/components/parent/ParentGuard";

export default function ParentApplyPage() {
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
              Summer class and membership applications are kept separate so TRIC can
              review each record clearly.
            </p>
          </div>
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
