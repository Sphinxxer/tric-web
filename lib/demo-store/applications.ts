import type {
  Application,
  ApplicationStatus,
  ApplicationType,
  ParentDetails,
  PaymentStatus,
  StudentDetails,
  StudentProfile,
} from "@/types/demo";
import { seedDemoApplicationsIfEmpty } from "./seed-demo-data";

const STORE_KEY = "tric_demo_applications";

const TYPE_PREFIX: Record<ApplicationType, string> = {
  "summer-class": "TRIC-SUM",
  membership: "TRIC-MEM",
};

const VALID_APPLICATION_STATUSES: ApplicationStatus[] = [
  "New",
  "Reviewed",
  "Approved",
  "Rejected",
  "Joined",
  "Payment Pending",
];

const VALID_PAYMENT_STATUSES: PaymentStatus[] = [
  "Not Paid",
  "Pending",
  "Partial",
  "Paid",
];

function storage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function nestedRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function stringValue(...values: unknown[]) {
  const value = values.find(
    (item) => typeof item === "string" && item.trim().length > 0,
  );
  return typeof value === "string" ? value.trim() : "";
}

function booleanValue(...values: unknown[]) {
  const value = values.find((item) => typeof item === "boolean");
  return typeof value === "boolean" ? value : false;
}

function timestampValue(...values: unknown[]) {
  const value = stringValue(...values);
  const date = value ? new Date(value) : null;
  return date && Number.isFinite(date.getTime()) ? date.toISOString() : new Date().toISOString();
}

function safeParse(value: string | null): Application[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((application, index) => normalizeApplication(application, index))
      .filter((application): application is Application => Boolean(application));
  } catch {
    storage()?.removeItem(STORE_KEY);
    return [];
  }
}

function normalizeType(value: unknown): ApplicationType {
  if (value === "membership" || value === "regular-membership") return "membership";
  return "summer-class";
}

function normalizeStatus(value: unknown): ApplicationStatus {
  return VALID_APPLICATION_STATUSES.includes(value as ApplicationStatus)
    ? (value as ApplicationStatus)
    : "New";
}

function normalizePaymentStatus(value: unknown): PaymentStatus {
  return VALID_PAYMENT_STATUSES.includes(value as PaymentStatus)
    ? (value as PaymentStatus)
    : "Not Paid";
}

function normalizeApplication(input: unknown, index = 0): Application | null {
  if (!isRecord(input)) return null;

  const student = nestedRecord(input.student);
  const parent = nestedRecord(input.parent);
  const emergency = nestedRecord(input.emergency);
  const health = nestedRecord(input.health);
  const program = nestedRecord(input.program);
  const type = normalizeType(
    input.type || input.applicationType || input.programType || input.formType,
  );
  const normalizedStudent = {
    fullName:
      stringValue(
        student.fullName,
        student.name,
        input.studentFullName,
        input.studentName,
        input.memberName,
      ) || "Student not provided",
    dateOfBirth: stringValue(
      student.dateOfBirth,
      student.dob,
      input.dateOfBirth,
      input.dob,
    ),
    age: stringValue(student.age, input.age),
    gender: stringValue(student.gender, input.gender),
  };
  const normalizedParent = {
    name: stringValue(parent.name, input.parentName, input.guardianName),
    phone: stringValue(parent.phone, input.phone, input.parentPhone),
    whatsapp: stringValue(parent.whatsapp, input.whatsapp, input.whatsappNumber),
    email: stringValue(parent.email, input.email),
    address: stringValue(parent.address, input.address),
  };
  const parentSnapshot = nestedRecord(input.parentSnapshot);
  const studentSnapshot = nestedRecord(input.studentSnapshot);
  const normalized: Application = {
    id: stringValue(input.id) || makeId(),
    applicationNo:
      stringValue(input.applicationNo, input.referenceNo) ||
      makeApplicationNo(type, index),
    parentId: stringValue(input.parentId) || "demo-parent-parents",
    studentId:
      stringValue(input.studentId, input.studentProfileId) ||
      makeStudentProfileId({ student: normalizedStudent }),
    type,
    applicationType: type,
    status: normalizeStatus(input.status),
    paymentStatus: normalizePaymentStatus(input.paymentStatus),
    adminNotes: stringValue(input.adminNotes),
    studentProfileId:
      stringValue(input.studentProfileId) ||
      makeStudentProfileId({ student: normalizedStudent }),
    studentSnapshot: {
      fullName:
        stringValue(studentSnapshot.fullName, normalizedStudent.fullName) ||
        "Student not provided",
      dateOfBirth: stringValue(studentSnapshot.dateOfBirth, normalizedStudent.dateOfBirth),
      age: stringValue(studentSnapshot.age, normalizedStudent.age),
      gender: stringValue(studentSnapshot.gender, normalizedStudent.gender),
      swimmingExperience: stringValue(
        studentSnapshot.swimmingExperience,
        input.swimmingExperience,
      ),
      skillLevel: stringValue(studentSnapshot.skillLevel, input.skillLevel) as Application["health"]["skillLevel"],
      medicalConcerns: stringValue(
        studentSnapshot.medicalConcerns,
        input.medicalConcerns,
        input.medicalConditions,
      ),
    },
    parentSnapshot: {
      name: stringValue(parentSnapshot.name, normalizedParent.name),
      phone: stringValue(parentSnapshot.phone, normalizedParent.phone),
      whatsapp: stringValue(parentSnapshot.whatsapp, normalizedParent.whatsapp),
      email: stringValue(parentSnapshot.email, normalizedParent.email),
      address: stringValue(parentSnapshot.address, normalizedParent.address),
    },
    student: normalizedStudent,
    parent: normalizedParent,
    emergency: {
      name: stringValue(emergency.name, input.emergencyName),
      phone: stringValue(emergency.phone, input.emergencyPhone),
    },
    health: {
      medicalConcerns: stringValue(
        health.medicalConcerns,
        input.medicalConcerns,
        input.medicalConditions,
      ),
      previousExperience: stringValue(
        health.previousExperience,
        input.previousExperience,
        input.swimmingExperience,
      ),
      skillLevel: stringValue(health.skillLevel, input.skillLevel) as Application["health"]["skillLevel"],
    },
    program:
      type === "summer-class"
        ? {
            preferredBatch: stringValue(program.preferredBatch, input.preferredBatch),
            preferredSession: stringValue(
              program.preferredSession,
              input.preferredSession,
            ),
            preferredTiming: stringValue(program.preferredTiming, input.preferredTiming),
          }
        : {
            membershipType: stringValue(program.membershipType, input.membershipType),
            preferredStartDate: stringValue(
              program.preferredStartDate,
              input.preferredStartDate,
            ),
            preferredTiming: stringValue(program.preferredTiming, input.preferredTiming),
          },
    termsAccepted: booleanValue(
      input.termsAccepted,
      input.declarationAccepted,
      input.declarationAccepted,
      input.consentAccepted,
    ),
    submittedAt: timestampValue(input.submittedAt, input.createdAt),
    updatedAt: timestampValue(input.updatedAt, input.submittedAt, input.createdAt),
  };

  return {
    ...normalized,
    paymentStatus: normalized.paymentStatus || "Not Paid",
    adminNotes: normalized.adminNotes || "",
    studentId: normalized.studentId || normalized.studentProfileId || makeStudentProfileId(normalized),
    studentProfileId: normalized.studentProfileId || normalized.studentId || makeStudentProfileId(normalized),
  };
}

export function getDemoApplications() {
  seedDemoApplicationsIfEmpty();
  return safeParse(storage()?.getItem(STORE_KEY) || null);
}

function saveDemoApplications(applications: Application[]) {
  // TODO: Replace this with Supabase insert/select/update calls.
  storage()?.setItem(STORE_KEY, JSON.stringify(applications));
}

export function getDemoApplication(id: string) {
  return getDemoApplications().find((application) => application.id === id) || null;
}

export function typeLabel(type: ApplicationType) {
  return type === "summer-class" ? "Summer Class Application" : "Membership Application";
}

export function statusClass(status: ApplicationStatus) {
  const classes: Record<ApplicationStatus, string> = {
    New: "bg-sky-50 text-sky-700 border-sky-200",
    Reviewed: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
    Joined: "bg-[#EAF8FF] text-[#0077B6] border-[#BDEBFA]",
    "Payment Pending": "bg-amber-50 text-amber-700 border-amber-200",
  };

  return classes[status] || classes.New;
}

export function paymentStatusClass(status: PaymentStatus) {
  const classes: Record<PaymentStatus, string> = {
    "Not Paid": "bg-slate-50 text-slate-700 border-slate-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Partial: "bg-orange-50 text-orange-700 border-orange-200",
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return classes[status] || classes["Not Paid"];
}

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `demo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function makeApplicationNo(type: ApplicationType, count: number) {
  const year = new Date().getFullYear();
  return `${TYPE_PREFIX[type]}-${year}-${String(count + 1).padStart(4, "0")}`;
}

function makeStudentProfileId(application: Pick<Application, "student">) {
  return `${normalize(application.student?.fullName || "student")}-${application.student?.dateOfBirth || "no-dob"}`;
}

export function getDemoStudentProfiles(): StudentProfile[] {
  const profiles = new Map<string, StudentProfile>();

  getDemoApplications().forEach((application) => {
    const id = application.studentProfileId || makeStudentProfileId(application);
    if (!profiles.has(id)) {
      profiles.set(id, {
        id,
        ...application.student,
      });
    }
  });

  return Array.from(profiles.values());
}

export function createDemoApplication(
  application: Omit<
    Application,
    | "id"
    | "applicationNo"
    | "status"
    | "paymentStatus"
    | "adminNotes"
    | "studentProfileId"
    | "submittedAt"
    | "updatedAt"
  >,
) {
  const applications = getDemoApplications();
  const applicationType = application.type || application.applicationType || "summer-class";
  const program = application.program || {};
  const duplicateBatch =
    applicationType === "summer-class"
      ? "preferredBatch" in program
        ? program.preferredBatch
        : ""
      : "";
  const duplicate = applications.find(
    (item) =>
      item.type === applicationType &&
      (application.parentId ? item.parentId === application.parentId : true) &&
      (application.studentId
        ? item.studentId === application.studentId || item.studentProfileId === application.studentId
        : normalize(item.student.fullName) === normalize(application.student.fullName) &&
          item.student.dateOfBirth === application.student.dateOfBirth) &&
      (!duplicateBatch ||
        !("preferredBatch" in item.program) ||
        item.program.preferredBatch === duplicateBatch),
  );

  if (duplicate) {
    return {
      ok: false,
      message: "This application has already been submitted for this student.",
    };
  }

  const now = new Date().toISOString();
  const next: Application = {
    ...application,
    id: makeId(),
    applicationNo: makeApplicationNo(applicationType, applications.length),
    type: applicationType,
    applicationType,
    status: "New",
    paymentStatus: "Not Paid",
    adminNotes: "",
    parentId: application.parentId || "demo-parent-parents",
    studentId: application.studentId || makeStudentProfileId(application),
    studentProfileId: application.studentId || makeStudentProfileId(application),
    studentSnapshot:
      application.studentSnapshot ||
      ({
        ...application.student,
        swimmingExperience: application.health.previousExperience,
        skillLevel: application.health.skillLevel,
        medicalConcerns: application.health.medicalConcerns,
      } as StudentDetails & {
        swimmingExperience?: string;
        skillLevel?: Application["health"]["skillLevel"];
        medicalConcerns?: string;
      }),
    parentSnapshot: application.parentSnapshot || (application.parent as ParentDetails),
    submittedAt: now,
    updatedAt: now,
  };

  saveDemoApplications([next, ...applications]);

  return { ok: true, application: next };
}

export function updateDemoApplication(id: string, updates: Partial<Application>) {
  const applications = getDemoApplications();
  const index = applications.findIndex((application) => application.id === id);

  if (index === -1) {
    return { ok: false, message: "Application not found." };
  }

  applications[index] = {
    ...applications[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveDemoApplications(applications);
  return { ok: true, application: applications[index] };
}

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  ...VALID_APPLICATION_STATUSES,
];

export const PAYMENT_STATUSES: PaymentStatus[] = [
  ...VALID_PAYMENT_STATUSES,
];
