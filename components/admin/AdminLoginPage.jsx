"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { demoCredentialsFor } from "@/lib/auth/demoAuth";

export default function AdminLoginPage() {
  const { login, loading, isAdmin } = useAuth();
  const [error, setError] = useState("");
  const credentials = demoCredentialsFor("admin");
  const showDemoCredentials =
    process.env.NEXT_PUBLIC_SHOW_DEMO_CREDENTIALS === "true";

  useEffect(() => {
    if (!loading && isAdmin) {
      window.location.replace("/admin/dashboard");
    }
  }, [isAdmin, loading]);

  function submit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");
    const result = login("admin", username, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    window.location.assign("/admin/dashboard");
  }

  return (
    <section className="bg-[#F5F7FA] py-8 sm:py-12">
      <div className="container-shell grid min-h-[64vh] place-items-center">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center overflow-hidden rounded-full border border-[#DDB648]/70 bg-[#061A2E]">
              <Image
                src="/images/tric-academy-logo.png"
                alt="TRIC Sports Academy logo"
                width={48}
                height={48}
                className="object-cover"
                style={{ width: "48px", height: "48px" }}
              />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Admin access
              </p>
              <h1 className="text-2xl font-black text-[#061A2E]">
                TRIC Admin Login
              </h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-[#5F6B7A]">
            Staff demo login for viewing applications, updating status, and printing
            A4 forms.
          </p>

          {showDemoCredentials ? (
            <div className="mt-5 rounded-md border border-[#DDEAF3] bg-[#EAF8FF] p-3 text-sm font-bold text-[#061A2E]">
              Demo: Username{" "}
              <span className="font-black">{credentials.username}</span>, Password{" "}
              <span className="font-black">{credentials.password}</span>
            </div>
          ) : null}

          <label className="mt-6 grid gap-2">
            <span className="text-sm font-black text-[#061A2E]">Admin Username</span>
            <input
              name="username"
              required
              autoComplete="username"
              className="focus-ring min-h-12 rounded-md border border-slate-300 px-3 text-sm"
            />
          </label>

          <label className="mt-4 grid gap-2">
            <span className="text-sm font-black text-[#061A2E]">Password</span>
            <input
              name="password"
              type="password"
              required
              className="focus-ring min-h-12 rounded-md border border-slate-300 px-3 text-sm"
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="focus-ring mt-6 min-h-12 w-full rounded-md bg-[#061A2E] px-4 text-sm font-black text-white hover:bg-[#0B2B47]"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </section>
  );
}
