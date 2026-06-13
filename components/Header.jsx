"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { navLinks } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isParent, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    setOpen(false);
    router.push(isAdmin ? "/" : "/login");
  }

  function renderAuthActions({ mobile = false } = {}) {
    if (loading) {
      return <span className={mobile ? "hidden" : "h-10 w-20"} aria-hidden="true" />;
    }

    if (isParent) {
      return (
        <>
          <Link
            href="/parent/dashboard"
            onClick={() => setOpen(false)}
            className={
              mobile
                ? "focus-ring rounded-md bg-[#061A2E] px-3 py-3 text-center text-sm font-black text-white"
                : "focus-ring ml-auto inline-flex min-h-9 items-center rounded-md bg-[#061A2E] px-3 text-sm font-black text-white transition hover:bg-[#0B2B47] lg:ml-0 lg:min-h-10 lg:px-4"
            }
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className={
              mobile
                ? "focus-ring rounded-md border border-[#DDEAF3] px-3 py-3 text-center text-sm font-black text-[#061A2E]"
                : "focus-ring inline-flex min-h-9 items-center rounded-md border border-[#DDEAF3] px-3 text-sm font-black text-[#061A2E] transition hover:bg-[#EAF8FF] lg:min-h-10 lg:px-4"
            }
          >
            Logout
          </button>
        </>
      );
    }

    if (user && isAdmin) {
      return (
        <button
          type="button"
          onClick={handleLogout}
          className={
            mobile
              ? "focus-ring rounded-md border border-[#DDEAF3] px-3 py-3 text-center text-sm font-black text-[#061A2E]"
              : "focus-ring ml-auto inline-flex min-h-9 items-center rounded-md border border-[#DDEAF3] px-3 text-sm font-black text-[#061A2E] transition hover:bg-[#EAF8FF] lg:ml-0 lg:min-h-10 lg:px-4"
          }
        >
          Logout
        </button>
      );
    }

    return (
      <Link
        href="/login"
        onClick={() => setOpen(false)}
        className={
          mobile
            ? "focus-ring mt-2 rounded-md bg-[#061A2E] px-3 py-3 text-center text-sm font-black text-white"
            : "focus-ring ml-auto inline-flex min-h-9 items-center rounded-md bg-[#061A2E] px-3 text-sm font-black text-white transition hover:bg-[#0B2B47] lg:ml-0 lg:min-h-10 lg:px-4"
        }
      >
        Login
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-[#061A2E] shadow-sm backdrop-blur">
      <div className="container-shell flex min-h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="focus-ring flex items-center gap-2.5 rounded-md"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#DDB648]/70 bg-[#061A2E] shadow-sm">
            <Image
              src="/images/tric-academy-logo.png"
              alt="TRIC Sports Academy logo"
              width={44}
              height={44}
              sizes="44px"
              className="size-11 object-cover"
              priority
            />
          </span>
          <span>
            <span className="block text-sm font-black leading-4 sm:text-base">
              TRIC
            </span>
            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0077B6]">
              Sports Academy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-md px-3 py-2 text-[0.94rem] font-bold transition ${
                  active
                    ? "bg-[#EAF8FF] text-[#0077B6]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#061A2E]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 sm:flex lg:ml-0">
          {renderAuthActions()}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid size-10 place-items-center rounded-md border border-slate-200 bg-white text-[#061A2E] lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white text-[#061A2E] lg:hidden">
          <nav className="container-shell grid gap-1 py-4">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`focus-ring rounded-md px-3 py-3 text-sm font-bold ${
                    active
                      ? "bg-[#EAF8FF] text-[#0077B6]"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 grid gap-2">{renderAuthActions({ mobile: true })}</div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
