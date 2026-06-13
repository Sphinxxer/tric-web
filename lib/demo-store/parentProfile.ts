import type { ParentProfile } from "@/types/demo";
import { getDemoApplications } from "@/lib/demo-store/applications";

const PROFILE_KEY = "tric_demo_parent_profile";

export const EMPTY_PARENT_PROFILE: ParentProfile = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
};

function storage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function normalizeProfile(profile: Partial<ParentProfile> | null): ParentProfile {
  return {
    ...EMPTY_PARENT_PROFILE,
    ...(profile || {}),
  };
}

export function getDemoParentProfile(): ParentProfile {
  const value = storage()?.getItem(PROFILE_KEY);

  if (value) {
    try {
      return normalizeProfile(JSON.parse(value));
    } catch {
      return EMPTY_PARENT_PROFILE;
    }
  }

  const latestApplication = getDemoApplications()[0];
  return normalizeProfile(latestApplication?.parent || null);
}

export function saveDemoParentProfile(profile: ParentProfile) {
  // TODO: Replace this localStorage profile update with a Supabase profiles upsert.
  storage()?.setItem(PROFILE_KEY, JSON.stringify(normalizeProfile(profile)));
  return normalizeProfile(profile);
}
