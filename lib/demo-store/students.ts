import type { StudentProfile } from "@/types/demo";
import type { StudentProfileInput } from "@/types/student";

const STUDENTS_KEY = "tric_demo_students";

function storage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `student-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function calculateStudentAge(dateOfBirth: string) {
  if (!dateOfBirth) return "";
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  if (!Number.isFinite(birthDate.getTime())) return "";
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age >= 0 ? String(age) : "";
}

function normalizeStudent(input: unknown): StudentProfile | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const record = input as Partial<StudentProfile>;
  const fullName = String(record.fullName || "").trim();
  const dateOfBirth = String(record.dateOfBirth || "").trim();
  if (!fullName || !dateOfBirth) return null;
  const now = new Date().toISOString();
  return {
    id: String(record.id || makeId()),
    parentId: String(record.parentId || "demo-parent-parents"),
    fullName,
    dateOfBirth,
    age: String(record.age || calculateStudentAge(dateOfBirth)),
    gender: String(record.gender || ""),
    swimmingExperience: String(record.swimmingExperience || ""),
    skillLevel: record.skillLevel || "",
    medicalConcerns: String(record.medicalConcerns || ""),
    createdAt: String(record.createdAt || now),
    updatedAt: String(record.updatedAt || record.createdAt || now),
  };
}

function safeParse(value: string | null): StudentProfile[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => normalizeStudent(item))
      .filter((student): student is StudentProfile => Boolean(student));
  } catch {
    storage()?.removeItem(STUDENTS_KEY);
    return [];
  }
}

export function getDemoStudents(parentId?: string) {
  const students = safeParse(storage()?.getItem(STUDENTS_KEY) || null);
  return parentId ? students.filter((student) => student.parentId === parentId) : students;
}

function saveDemoStudents(students: StudentProfile[]) {
  // TODO: Replace this localStorage student store with Supabase students table queries.
  storage()?.setItem(STUDENTS_KEY, JSON.stringify(students));
}

export function getDemoStudent(id: string) {
  return getDemoStudents().find((student) => student.id === id) || null;
}

export function createDemoStudent(parentId: string, input: StudentProfileInput) {
  const students = getDemoStudents();
  const duplicate = students.find(
    (student) =>
      student.parentId === parentId &&
      normalize(student.fullName) === normalize(input.fullName) &&
      student.dateOfBirth === input.dateOfBirth,
  );

  if (duplicate) {
    return {
      ok: false,
      message: "This student profile already exists.",
    };
  }

  const now = new Date().toISOString();
  const student: StudentProfile = {
    id: makeId(),
    parentId,
    fullName: input.fullName.trim(),
    dateOfBirth: input.dateOfBirth,
    age: input.age || calculateStudentAge(input.dateOfBirth),
    gender: input.gender,
    swimmingExperience: input.swimmingExperience || "",
    skillLevel: input.skillLevel || "",
    medicalConcerns: input.medicalConcerns || "",
    createdAt: now,
    updatedAt: now,
  };

  saveDemoStudents([student, ...students]);
  return { ok: true, student };
}

export function updateDemoStudent(id: string, input: StudentProfileInput) {
  const students = getDemoStudents();
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) return { ok: false, message: "Student profile not found." };
  const parentId = students[index].parentId || "demo-parent-parents";
  const duplicate = students.find(
    (student) =>
      student.id !== id &&
      student.parentId === parentId &&
      normalize(student.fullName) === normalize(input.fullName) &&
      student.dateOfBirth === input.dateOfBirth,
  );

  if (duplicate) {
    return {
      ok: false,
      message: "This student profile already exists.",
    };
  }

  students[index] = {
    ...students[index],
    fullName: input.fullName.trim(),
    dateOfBirth: input.dateOfBirth,
    age: input.age || calculateStudentAge(input.dateOfBirth),
    gender: input.gender,
    swimmingExperience: input.swimmingExperience || "",
    skillLevel: input.skillLevel || "",
    medicalConcerns: input.medicalConcerns || "",
    updatedAt: new Date().toISOString(),
  };

  saveDemoStudents(students);
  return { ok: true, student: students[index] };
}
