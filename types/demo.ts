export type UserRole = "parent" | "admin";

export type DemoUser = {
  username: string;
  role: UserRole;
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
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
};

export type StudentProfile = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
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
  type: ApplicationType;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  adminNotes: string;
  studentProfileId?: string;
  student: StudentDetails;
  parent: ParentDetails;
  emergency: EmergencyDetails;
  health: HealthDetails;
  program: SummerProgramDetails | MembershipProgramDetails;
  termsAccepted: boolean;
  submittedAt: string;
  updatedAt: string;
};
