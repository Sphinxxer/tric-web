"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications & Print" },
];

export default function AdminShell({ title, children }) {
  const router = useRouter();
  const { logout: endSession } = useAuth();

  function logout() {
    endSession();
    router.push("/admin");
  }

  return (
    <section className="bg-[#F5F7FA] py-8">
      <div className="container-shell">
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
              TRIC admin
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#061A2E]">{title}</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="focus-ring min-h-11 w-full rounded-md border border-[#DDEAF3] px-4 text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF] sm:w-auto"
          >
            Logout
          </button>
        </div>

        <nav className="mb-6 flex flex-wrap gap-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-md border border-[#DDEAF3] bg-white px-4 py-2 text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </section>
  );
}
