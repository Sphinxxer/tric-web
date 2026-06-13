"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ParentGuard from "@/components/parent/ParentGuard";
import { createDemoApplication } from "@/lib/demo-store/applications";
import {
  getDemoParentProfile,
  saveDemoParentProfile,
} from "@/lib/demo-store/parentProfile";

const baseInitial = {
  studentFullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  parentName: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  emergencyName: "",
  emergencyPhone: "",
  medicalConcerns: "",
  previousExperience: "",
  skillLevel: "",
  preferredBatch: "",
  preferredSession: "",
  preferredTiming: "",
  membershipType: "",
  preferredStartDate: "",
  termsAccepted: false,
};

const SUCCESS_MESSAGE = "Application submitted successfully.";

function fieldClass(error) {
  return `focus-ring min-h-12 rounded-md border bg-white px-3 text-sm text-[#101820] ${
    error ? "border-red-400" : "border-slate-300"
  }`;
}

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return "";
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return Number.isFinite(age) && age >= 0 ? String(age) : "";
}

export default function ParentApplicationForm({ type }) {
  const router = useRouter();
  const isSummer = type === "summer-class";
  const [values, setValues] = useState(baseInitial);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const title = isSummer ? "Summer Class Application" : "Membership Application";

  useEffect(() => {
    const profile = getDemoParentProfile();
    setValues((current) => ({
      ...current,
      parentName: profile.name || current.parentName,
      phone: profile.phone || current.phone,
      whatsapp: profile.whatsapp || current.whatsapp,
      email: profile.email || current.email,
      address: profile.address || current.address,
    }));
  }, []);

  function update(field, value) {
    setValues((current) => ({
      ...current,
      [field]: value,
      ...(field === "dateOfBirth" ? { age: calculateAge(value) } : {}),
    }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setMessage("");
  }

  function validate() {
    const required = [
      "studentFullName",
      "dateOfBirth",
      "age",
      "gender",
      "parentName",
      "phone",
      "whatsapp",
      "email",
      "address",
      "emergencyName",
      "emergencyPhone",
      "previousExperience",
      "skillLevel",
    ];

    if (isSummer) {
      required.push("preferredBatch", "preferredSession", "preferredTiming");
    } else {
      required.push("membershipType", "preferredStartDate", "preferredTiming");
    }

    const nextErrors = {};
    required.forEach((field) => {
      if (!String(values[field] || "").trim()) {
        nextErrors[field] = "Please complete this field.";
      }
    });

    if (!values.termsAccepted) {
      nextErrors.termsAccepted = "Please accept the declaration before submitting.";
    }

    if (values.phone && !/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, ""))) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (
      values.whatsapp &&
      !/^[6-9]\d{9}$/.test(values.whatsapp.replace(/\D/g, ""))
    ) {
      nextErrors.whatsapp = "Enter a valid 10-digit WhatsApp number.";
    }

    if (
      values.emergencyPhone &&
      !/^[6-9]\d{9}$/.test(values.emergencyPhone.replace(/\D/g, ""))
    ) {
      nextErrors.emergencyPhone = "Enter a valid 10-digit phone number.";
    }

    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submit(event) {
    event.preventDefault();
    if (!validate()) {
      setMessage("Please complete the required fields before submitting.");
      return;
    }

    const result = createDemoApplication({
      type,
      student: {
        fullName: values.studentFullName,
        dateOfBirth: values.dateOfBirth,
        age: values.age,
        gender: values.gender,
      },
      parent: {
        name: values.parentName,
        phone: values.phone,
        whatsapp: values.whatsapp,
        email: values.email,
        address: values.address,
      },
      emergency: {
        name: values.emergencyName,
        phone: values.emergencyPhone,
      },
      health: {
        medicalConcerns: values.medicalConcerns,
        previousExperience: values.previousExperience,
        skillLevel: values.skillLevel,
      },
      program: isSummer
        ? {
            preferredBatch: values.preferredBatch,
            preferredSession: values.preferredSession,
            preferredTiming: values.preferredTiming,
          }
        : {
            membershipType: values.membershipType,
            preferredStartDate: values.preferredStartDate,
            preferredTiming: values.preferredTiming,
          },
      termsAccepted: values.termsAccepted,
    });

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    saveDemoParentProfile({
      name: values.parentName,
      phone: values.phone,
      whatsapp: values.whatsapp,
      email: values.email,
      address: values.address,
    });

    window.sessionStorage?.setItem("tric_demo_application_success", SUCCESS_MESSAGE);
    router.push("/parent/applications");
  }

  function input(field, label, typeName = "text") {
    return (
      <label className="grid gap-2" htmlFor={field}>
        <span className="text-sm font-black text-[#061A2E]">
          {label} <span className="text-red-600">*</span>
        </span>
        <input
          id={field}
          type={typeName}
          value={values[field]}
          onChange={(event) => update(field, event.target.value)}
          className={fieldClass(errors[field])}
        />
        {errors[field] ? (
          <span className="text-xs font-bold text-red-600">{errors[field]}</span>
        ) : null}
      </label>
    );
  }

  function select(field, label, options) {
    return (
      <label className="grid gap-2" htmlFor={field}>
        <span className="text-sm font-black text-[#061A2E]">
          {label} <span className="text-red-600">*</span>
        </span>
        <select
          id={field}
          value={values[field]}
          onChange={(event) => update(field, event.target.value)}
          className={fieldClass(errors[field])}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors[field] ? (
          <span className="text-xs font-bold text-red-600">{errors[field]}</span>
        ) : null}
      </label>
    );
  }

  return (
    <ParentGuard>
      <section className="bg-[#F5F7FA] py-10">
        <div className="container-shell">
          <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Parent application
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#061A2E]">{title}</h1>
              <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                Fill the required details. This demo stores applications locally in
                the browser.
              </p>
            </div>
            <Link
              href="/parent/apply"
              className="focus-ring rounded-md border border-[#DDEAF3] px-4 py-3 text-center text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
            >
              Switch Form
            </Link>
          </div>

          <form onSubmit={submit} className="grid gap-5">
            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-[#061A2E]">Student Details</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {input("studentFullName", "Student full name")}
                {input("dateOfBirth", "Date of birth", "date")}
                {input("age", "Age", "number")}
                {select("gender", "Gender", ["Male", "Female", "Prefer not to say"])}
              </div>
            </section>

            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-[#061A2E]">Parent Details</h2>
              <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                These details can later auto-fill from the parent profile after
                Supabase Auth is connected.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {input("parentName", "Parent / guardian name")}
                {input("phone", "Phone number", "tel")}
                {input("whatsapp", "WhatsApp number", "tel")}
                {input("email", "Email", "email")}
                <label className="grid gap-2 md:col-span-2" htmlFor="address">
                  <span className="text-sm font-black text-[#061A2E]">
                    Address <span className="text-red-600">*</span>
                  </span>
                  <textarea
                    id="address"
                    value={values.address}
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
            </section>

            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-[#061A2E]">Emergency Contact</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {input("emergencyName", "Emergency contact name")}
                {input("emergencyPhone", "Emergency contact phone", "tel")}
              </div>
            </section>

            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-[#061A2E]">
                Health & Experience
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {input("previousExperience", "Previous swimming experience")}
                {select("skillLevel", "Skill level", [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ])}
                <label className="grid gap-2 md:col-span-2" htmlFor="medicalConcerns">
                  <span className="text-sm font-black text-[#061A2E]">
                    Medical concerns / allergies
                  </span>
                  <textarea
                    id="medicalConcerns"
                    value={values.medicalConcerns}
                    onChange={(event) =>
                      update("medicalConcerns", event.target.value)
                    }
                    rows={4}
                    className="focus-ring min-h-12 rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-[#101820]"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-[#061A2E]">
                Program Preference
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {isSummer ? (
                  <>
                    {input("preferredBatch", "Preferred summer batch")}
                    {input("preferredSession", "Preferred month/session")}
                    {input("preferredTiming", "Preferred timing")}
                  </>
                ) : (
                  <>
                    {select("membershipType", "Membership type", [
                      "Monthly",
                      "Regular coaching",
                      "Family enquiry",
                    ])}
                    {input("preferredStartDate", "Preferred start date", "date")}
                    {input("preferredTiming", "Preferred timing")}
                  </>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
              <label className="flex gap-3">
                <input
                  type="checkbox"
                  checked={values.termsAccepted}
                  onChange={(event) => update("termsAccepted", event.target.checked)}
                  className="mt-1 size-5 accent-[#0077B6]"
                />
                <span>
                  <span className="block text-sm font-bold text-[#061A2E]">
                    I confirm that the information provided is accurate and agree to
                    be contacted by TRIC Sports Academy.
                  </span>
                  {errors.termsAccepted ? (
                    <span className="mt-2 block text-xs font-bold text-red-600">
                      {errors.termsAccepted}
                    </span>
                  ) : null}
                </span>
              </label>
            </section>

            {message ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700">
                {message}
              </p>
            ) : null}

            <div className="grid gap-3 sm:flex">
              <button
                type="submit"
                className="focus-ring min-h-12 w-full rounded-md bg-[#061A2E] px-6 text-sm font-black text-white hover:bg-[#0B2B47] sm:w-auto"
              >
                Submit Application
              </button>
              <Link
                href="/parent/dashboard"
                className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[#DDEAF3] bg-white px-6 text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF] sm:w-auto"
              >
                Back to Dashboard
              </Link>
            </div>
          </form>
        </div>
      </section>
    </ParentGuard>
  );
}
