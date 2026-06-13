export type UserRole = "parent" | "admin";

export type DemoUser = {
  id?: string;
  username: string;
  role: UserRole;
  email?: string;
  loggedInAt: string;
};

export type ApplicationType = "summer-class" | "membership";

export type ApplicationStatus =
  | "New"
  | "Reviewed"
  | "Approved"
  | "Rejected"
  | "Joined"
  | "Payment Pending";

export type PaymentStatus = "Not Paid" | "Pending" | "Partial" | "Paid";

export type ParentProfile = {
  id?: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
};

export type StudentProfile = {
  id: string;
  parentId?: string;
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  swimmingExperience?: string;
  skillLevel?: "Beginner" | "Intermediate" | "Advanced" | "";
  medicalConcerns?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type StudentDetails = {
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
};

export type ParentDetails = {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
};

export type EmergencyDetails = {
  name: string;
  phone: string;
};

export type HealthDetails = {
  medicalConcerns: string;
  previousExperience: string;
  skillLevel: "Beginner" | "Intermediate" | "Advanced" | "";
};

export type SummerProgramDetails = {
  preferredBatch: string;
  preferredSession: string;
  preferredTiming: string;
};

export type MembershipProgramDetails = {
  membershipType: string;
  preferredStartDate: string;
  preferredTiming: string;
};

export type Application = {
  id: string;
  applicationNo: string;
  parentId?: string;
  studentId?: string;
  type: ApplicationType;
  applicationType?: ApplicationType;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  adminNotes: string;
  studentProfileId?: string;
  studentSnapshot?: StudentDetails & {
    swimmingExperience?: string;
    skillLevel?: "Beginner" | "Intermediate" | "Advanced" | "";
    medicalConcerns?: string;
  };
  parentSnapshot?: ParentDetails;
  student: StudentDetails;
  parent: ParentDetails;
  emergency: EmergencyDetails;
  health: HealthDetails;
  program: SummerProgramDetails | MembershipProgramDetails;
  termsAccepted: boolean;
  submittedAt: string;
  updatedAt: string;
};
