"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ParentGuard from "@/components/parent/ParentGuard";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  EMPTY_PARENT_PROFILE,
  getDemoParentProfile,
  saveDemoParentProfile,
} from "@/lib/demo-store/parentProfile";

const fields = [
  ["name", "Parent / guardian name", "text"],
  ["phone", "Phone number", "tel"],
  ["whatsapp", "WhatsApp number", "tel"],
  ["email", "Email", "email"],
];

function fieldClass(error) {
  return `focus-ring min-h-12 rounded-md border bg-white px-3 text-sm text-[#101820] ${
    error ? "border-red-400" : "border-slate-300"
  }`;
}

export default function ParentProfilePage() {
  const { user } = useAuth();
  const parentId = user?.id || "demo-parent-parents";
  const [profile, setProfile] = useState(EMPTY_PARENT_PROFILE);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getDemoParentProfile(parentId));
  }, [parentId]);

  function update(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSaved(false);
  }

  function validate() {
    const nextErrors = {};

    ["name", "phone", "whatsapp", "email", "address"].forEach((field) => {
      if (!String(profile[field] || "").trim()) {
        nextErrors[field] = "Please complete this field.";
      }
    });

    if (profile.phone && !/^[6-9]\d{9}$/.test(profile.phone.replace(/\D/g, ""))) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (
      profile.whatsapp &&
      !/^[6-9]\d{9}$/.test(profile.whatsapp.replace(/\D/g, ""))
    ) {
      nextErrors.whatsapp = "Enter a valid 10-digit WhatsApp number.";
    }

    if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submit(event) {
    event.preventDefault();
    if (!validate()) return;

    saveDemoParentProfile(profile, parentId);
    setSaved(true);
  }

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
                Parent Profile
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                Save your contact details so future applications are quicker to
                complete.
              </p>
            </div>
            <Link
              href="/parent/dashboard"
              className="focus-ring rounded-md border border-[#DDEAF3] px-4 py-3 text-center text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
            >
              Back to Dashboard
            </Link>
          </div>

          <form
            onSubmit={submit}
            className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map(([field, label, type]) => (
                <label key={field} className="grid gap-2" htmlFor={field}>
                  <span className="text-sm font-black text-[#061A2E]">
                    {label} <span className="text-red-600">*</span>
                  </span>
                  <input
                    id={field}
                    type={type}
                    value={profile[field]}
                    onChange={(event) => update(field, event.target.value)}
                    className={fieldClass(errors[field])}
                  />
                  {errors[field] ? (
                    <span className="text-xs font-bold text-red-600">
                      {errors[field]}
                    </span>
                  ) : null}
                </label>
              ))}

              <label className="grid gap-2 md:col-span-2" htmlFor="address">
                <span className="text-sm font-black text-[#061A2E]">
                  Address <span className="text-red-600">*</span>
                </span>
                <textarea
                  id="address"
                  value={profile.address}
                  onChange={(event) => update("address", event.target.value)}
                  rows={4}
                  className={`${fieldClass(errors.address)} py-3`}
                />
                {errors.address ? (
                  <span className="text-xs font-bold text-red-600">
                    {errors.address}
                  </span>
                ) : null}
              </label>
            </div>

            {saved ? (
              <p className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-700">
                Profile saved successfully.
              </p>
            ) : null}

            <button
              type="submit"
              className="focus-ring mt-5 min-h-12 w-full rounded-md bg-[#061A2E] px-6 text-sm font-black text-white hover:bg-[#0B2B47] sm:w-auto"
            >
              Save Profile
            </button>
          </form>
        </div>
      </section>
    </ParentGuard>
  );
}
