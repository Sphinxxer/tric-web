"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ParentGuard from "@/components/parent/ParentGuard";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  calculateStudentAge,
  createDemoStudent,
  getDemoStudent,
  updateDemoStudent,
} from "@/lib/demo-store/students";

const initialValues = {
  fullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  swimmingExperience: "",
  skillLevel: "",
  medicalConcerns: "",
};

function fieldClass(error) {
  return `focus-ring min-h-12 rounded-md border bg-white px-3 text-sm text-[#101820] ${
    error ? "border-red-400" : "border-slate-300"
  }`;
}

export default function StudentProfileForm({ id }) {
  const router = useRouter();
  const { user } = useAuth();
  const parentId = user?.id || "demo-parent-parents";
  const isEdit = Boolean(id);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const student = getDemoStudent(id);
    if (student) {
      setValues({
        fullName: student.fullName || "",
        dateOfBirth: student.dateOfBirth || "",
        age: student.age || "",
        gender: student.gender || "",
        swimmingExperience: student.swimmingExperience || "",
        skillLevel: student.skillLevel || "",
        medicalConcerns: student.medicalConcerns || "",
      });
    }
  }, [id]);

  function update(field, value) {
    setValues((current) => ({
      ...current,
      [field]: value,
      ...(field === "dateOfBirth" ? { age: calculateStudentAge(value) } : {}),
    }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setMessage("");
  }

  function validate() {
    const nextErrors = {};
    ["fullName", "dateOfBirth", "age", "gender", "skillLevel"].forEach((field) => {
      if (!String(values[field] || "").trim()) {
        nextErrors[field] = "Please complete this field.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submit(event) {
    event.preventDefault();
    if (!validate()) {
      setMessage("Please complete the required fields before saving.");
      return;
    }

    const result = isEdit
      ? updateDemoStudent(id, values)
      : createDemoStudent(parentId, values);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    window.sessionStorage?.setItem(
      "tric_demo_student_success",
      isEdit ? "Student profile updated successfully." : "Student profile added successfully.",
    );
    router.push("/parent/students");
  }

  function input(field, label, type = "text", required = true) {
    return (
      <label className="grid gap-2" htmlFor={field}>
        <span className="text-sm font-black text-[#061A2E]">
          {label} {required ? <span className="text-red-600">*</span> : null}
        </span>
        <input
          id={field}
          type={type}
          value={values[field] || ""}
          onChange={(event) => update(field, event.target.value)}
          className={fieldClass(errors[field])}
        />
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
                Student profile
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#061A2E]">
                {isEdit ? "Edit Student" : "Add Student"}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#5F6B7A]">
                Save student details once and use them for Summer Class or Membership
                applications.
              </p>
            </div>
            <Link
              href="/parent/students"
              className="focus-ring rounded-md border border-[#DDEAF3] px-4 py-3 text-center text-sm font-black text-[#061A2E] hover:bg-[#EAF8FF]"
            >
              Back to Students
            </Link>
          </div>

          <form
            onSubmit={submit}
            className="rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {input("fullName", "Student full name")}
              {input("dateOfBirth", "Date of birth", "date")}
              {input("age", "Age", "number")}
              <label className="grid gap-2" htmlFor="gender">
                <span className="text-sm font-black text-[#061A2E]">
                  Gender <span className="text-red-600">*</span>
                </span>
                <select
                  id="gender"
                  value={values.gender}
                  onChange={(event) => update("gender", event.target.value)}
                  className={fieldClass(errors.gender)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender ? (
                  <span className="text-xs font-bold text-red-600">
                    {errors.gender}
                  </span>
                ) : null}
              </label>
              {input("swimmingExperience", "Swimming experience", "text", false)}
              <label className="grid gap-2" htmlFor="skillLevel">
                <span className="text-sm font-black text-[#061A2E]">
                  Skill level <span className="text-red-600">*</span>
                </span>
                <select
                  id="skillLevel"
                  value={values.skillLevel}
                  onChange={(event) => update("skillLevel", event.target.value)}
                  className={fieldClass(errors.skillLevel)}
                >
                  <option value="">Select skill level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.skillLevel ? (
                  <span className="text-xs font-bold text-red-600">
                    {errors.skillLevel}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-2 md:col-span-2" htmlFor="medicalConcerns">
                <span className="text-sm font-black text-[#061A2E]">
                  Medical concerns / allergies
                </span>
                <textarea
                  id="medicalConcerns"
                  value={values.medicalConcerns}
                  onChange={(event) => update("medicalConcerns", event.target.value)}
                  rows={4}
                  className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-[#101820]"
                />
              </label>
            </div>

            {message ? (
              <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              className="focus-ring mt-5 min-h-12 w-full rounded-md bg-[#061A2E] px-6 text-sm font-black text-white hover:bg-[#0B2B47] sm:w-auto"
            >
              {isEdit ? "Save Student" : "Add Student"}
            </button>
          </form>
        </div>
      </section>
    </ParentGuard>
  );
}
