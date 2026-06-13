import type { ParentProfile } from "@/types/demo";
import { getDemoApplications } from "@/lib/demo-store/applications";

const PROFILE_KEY = "tric_demo_parent_profile";
const PROFILE_MAP_KEY = "tric_demo_parent_profiles";

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

function safeProfileMap() {
  const value = storage()?.getItem(PROFILE_MAP_KEY);
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    storage()?.removeItem(PROFILE_MAP_KEY);
    return {};
  }
}

export function getDemoParentProfile(parentId = "demo-parent-parents"): ParentProfile {
  const profileMap = safeProfileMap();
  if (profileMap[parentId]) {
    return normalizeProfile(profileMap[parentId] as ParentProfile);
  }

  const value = storage()?.getItem(PROFILE_KEY);

  if (value) {
    try {
      return normalizeProfile({ id: parentId, ...JSON.parse(value) });
    } catch {
      return EMPTY_PARENT_PROFILE;
    }
  }

  const latestApplication = getDemoApplications()[0];
  return normalizeProfile({ id: parentId, ...(latestApplication?.parent || {}) });
}

export function saveDemoParentProfile(profile: ParentProfile, parentId = "demo-parent-parents") {
  // TODO: Replace this localStorage profile update with a Supabase profiles upsert.
  const normalized = normalizeProfile({ ...profile, id: parentId });
  const profileMap = safeProfileMap();
  profileMap[parentId] = normalized;
  storage()?.setItem(PROFILE_MAP_KEY, JSON.stringify(profileMap));
  storage()?.setItem(PROFILE_KEY, JSON.stringify(normalized));
  return normalized;
}
