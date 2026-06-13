const APPLICATIONS_STORE_KEY = "tric_demo_applications";

const SEEDED_DEMO_APPLICATION = {
  id: "demo-summer-aarav-kumar",
  applicationNo: "TRIC-SUM-DEMO-0001",
  parentId: "demo-parent-ramesh",
  studentId: "demo-student-aarav-kumar",
  studentProfileId: "demo-student-aarav-kumar",
  type: "summer-class",
  applicationType: "summer-class",
  status: "New",
  paymentStatus: "Pending",
  adminNotes: "Parent requested morning batch if available.",
  studentSnapshot: {
    fullName: "Aarav Kumar",
    dateOfBirth: "2016-05-14",
    age: "9",
    gender: "Male",
    swimmingExperience: "Has basic water comfort and wants structured coaching.",
    skillLevel: "Beginner",
    medicalConcerns: "None declared",
  },
  parentSnapshot: {
    name: "Ramesh Kumar",
    phone: "9876543210",
    whatsapp: "9876543210",
    email: "ramesh.kumar@example.com",
    address: "Tirupur, Tamil Nadu",
  },
  student: {
    fullName: "Aarav Kumar",
    dateOfBirth: "2016-05-14",
    age: "9",
    gender: "Male",
  },
  parent: {
    name: "Ramesh Kumar",
    phone: "9876543210",
    whatsapp: "9876543210",
    email: "ramesh.kumar@example.com",
    address: "Tirupur, Tamil Nadu",
  },
  emergency: {
    name: "Priya Kumar",
    phone: "9876501234",
  },
  health: {
    medicalConcerns: "None declared",
    previousExperience: "Has basic water comfort and wants structured coaching.",
    skillLevel: "Beginner",
  },
  program: {
    preferredBatch: "Morning Batch",
    preferredSession: "May Summer Camp",
    preferredTiming: "7:00 AM - 8:00 AM",
  },
  termsAccepted: true,
  submittedAt: "2026-05-01T03:30:00.000Z",
  updatedAt: "2026-05-01T03:30:00.000Z",
};

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function seedDemoApplicationsIfEmpty() {
  const localStorage = getStorage();
  if (!localStorage) return;

  const rawValue = localStorage.getItem(APPLICATIONS_STORE_KEY);

  if (!rawValue) {
    localStorage.setItem(
      APPLICATIONS_STORE_KEY,
      JSON.stringify([SEEDED_DEMO_APPLICATION]),
    );
    return;
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed) && parsed.length > 0) return;
  } catch {
    // Recover old malformed demo data with a clean seeded record.
  }

  localStorage.setItem(
    APPLICATIONS_STORE_KEY,
    JSON.stringify([SEEDED_DEMO_APPLICATION]),
  );
}
