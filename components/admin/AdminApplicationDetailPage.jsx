"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import {
  APPLICATION_STATUSES,
  PAYMENT_STATUSES,
  getDemoApplication,
  typeLabel,
  updateDemoApplication,
} from "@/lib/demo-store/applications";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function flatten(application) {
  if (!application) return null;
  return {
    status: application.status,
    paymentStatus: application.paymentStatus,
    adminNotes: application.adminNotes,
    studentFullName: application.student.fullName,
    dateOfBirth: application.student.dateOfBirth,
    age: application.student.age,
    gender: application.student.gender,
    parentName: application.parent.name,
    phone: application.parent.phone,
    whatsapp: application.parent.whatsapp,
    email: application.parent.email,
    address: application.parent.address,
    emergencyName: application.emergency.name,
    emergencyPhone: application.emergency.phone,
    medicalConcerns: application.health.medicalConcerns,
    previousExperience: application.health.previousExperience,
    skillLevel: application.health.skillLevel,
    ...application.program,
  };
}

function fieldClass() {
  return "focus-ring min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-[#101820]";
}

export default function AdminApplicationDetailPage({ id }) {
  const [application, setApplication] = useState(null);
  const [values, setValues] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const record = getDemoApplication(id);
    setApplication(record);
    setValues(flatten(record));
  }, [id]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function save() {
    if (!application || !values) return;
    const updated = {
      status: values.status,
      paymentStatus: values.paymentStatus,
      adminNotes: values.adminNotes,
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
      program:
        application.type === "summer-class"
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
    };

    const result = updateDemoApplication(id, updated);
    if (result.ok) {
      setApplication(result.application);
      setMessage("Application saved successfully.");
    } else {
      setMessage(result.message);
    }
  }

  function input(field, label, type = "text") {
    return (
      <label className="grid gap-2" htmlFor={field}>
        <span className="text-xs font-black uppercase tracking-[0.12em] text-[#5F6B7A]">
          {label}
        </span>
        <input
          id={field}
          type={type}
          value={values?.[field] || ""}
          onChange={(event) => update(field, event.target.value)}
          className={fieldClass()}
        />
      </label>
    );
  }

  return (
    <AdminGuard>
      <AdminShell title="Application Details">
        {!application || !values ? (
          <div className="rounded-lg border border-[#DDEAF3] bg-white p-5 text-[#5F6B7A]">
            Application not found.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="grid gap-5">
              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                  {typeLabel(application.type)}
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#061A2E]">
                  {application.student.fullName}
                </h2>
                <p className="mt-2 text-sm text-[#5F6B7A]">
                  {application.applicationNo} | Submitted{" "}
                  {formatDate(application.submittedAt)}
                </p>
              </section>

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-[#061A2E]">Student Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {input("studentFullName", "Student name")}
                  {input("dateOfBirth", "Date of birth", "date")}
                  {input("age", "Age", "number")}
                  {input("gender", "Gender")}
                </div>
              </section>

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-[#061A2E]">Parent Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {input("parentName", "Parent / guardian")}
                  {input("phone", "Phone", "tel")}
                  {input("whatsapp", "WhatsApp", "tel")}
                  {input("email", "Email", "email")}
                  {input("address", "Address")}
                </div>
              </section>

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-[#061A2E]">Emergency & Health</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {input("emergencyName", "Emergency contact")}
                  {input("emergencyPhone", "Emergency phone", "tel")}
                  {input("medicalConcerns", "Medical concerns")}
                  {input("previousExperience", "Previous experience")}
                  {input("skillLevel", "Skill level")}
                </div>
              </section>

              <section className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-[#061A2E]">Program Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {application.type === "summer-class" ? (
                    <>
                      {input("preferredBatch", "Preferred batch")}
                      {input("preferredSession", "Preferred session")}
                      {input("preferredTiming", "Preferred timing")}
                    </>
                  ) : (
                    <>
                      {input("membershipType", "Membership type")}
                      {input("preferredStartDate", "Preferred start date", "date")}
                      {input("preferredTiming", "Preferred timing")}
                    </>
                  )}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h3 className="text-lg font-black text-[#061A2E]">Admin Actions</h3>
              <label className="mt-4 grid gap-2">
                <span className="text-sm font-black text-[#061A2E]">Status</span>
                <select
                  value={values.status}
                  onChange={(event) => update("status", event.target.value)}
                  className={fieldClass()}
                >
                  {APPLICATION_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-4 grid gap-2">
                <span className="text-sm font-black text-[#061A2E]">
                  Payment Status
                </span>
                <select
                  value={values.paymentStatus}
                  onChange={(event) => update("paymentStatus", event.target.value)}
                  className={fieldClass()}
                >
                  {PAYMENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-4 grid gap-2">
                <span className="text-sm font-black text-[#061A2E]">
                  Internal Admin Notes
                </span>
                <textarea
                  value={values.adminNotes || ""}
                  onChange={(event) => update("adminNotes", event.target.value)}
                  rows={5}
                  className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-[#101820]"
                  placeholder="Internal note for TRIC staff. This is not shown to parents or printed."
                />
              </label>
              <button
                type="button"
                onClick={save}
                className="focus-ring mt-4 min-h-11 w-full rounded-md bg-[#061A2E] px-4 text-sm font-black text-white"
              >
                Save Changes
              </button>
              {message ? (
                <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold leading-6 text-emerald-700">
                  {message}
                </p>
              ) : null}
              <div className="mt-5 grid gap-3">
                <Link
                  href={`/admin/applications/${id}/print`}
                  className="focus-ring rounded-md border border-[#DDEAF3] px-4 py-3 text-center text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
                >
                  Print A4
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="focus-ring rounded-md border border-[#DDEAF3] px-4 py-3 text-center text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
                >
                  Back to Dashboard
                </Link>
              </div>
            </aside>
          </div>
        )}
      </AdminShell>
    </AdminGuard>
  );
}
