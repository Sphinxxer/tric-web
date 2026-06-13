import type { StudentProfile } from "@/types/demo";

export type StudentProfileInput = Omit<
  StudentProfile,
  "id" | "parentId" | "createdAt" | "updatedAt"
>;
