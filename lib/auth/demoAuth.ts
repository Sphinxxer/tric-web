import type { DemoUser, UserRole } from "@/types/demo";

const SESSION_KEY = "tric_demo_session";

const DEMO_CREDENTIALS = {
  parent: { username: "Parents", password: "1234" },
  admin: { username: "Admin", password: "admin" },
} as const;

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage;
}

export function loginDemoUser(role: UserRole, username: string, password: string) {
  const expected = role === "admin" ? DEMO_CREDENTIALS.admin : DEMO_CREDENTIALS.parent;

  if (username.trim() !== expected.username || password !== expected.password) {
  return {
    ok: false,
    message: "Username or password did not match. Please try again.",
  };
}

  const user: DemoUser = {
    username: expected.username,
    role,
    loggedInAt: new Date().toISOString(),
  };

  // TODO: Replace this with Supabase Auth session handling.
  getStorage()?.setItem(SESSION_KEY, JSON.stringify(user));

  return { ok: true, user };
}

export function getDemoUser(): DemoUser | null {
  const raw = getStorage()?.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const user = JSON.parse(raw) as DemoUser;
    if (user?.role === "admin" || user?.role === "parent") return user;
  } catch {
    return null;
  }

  return null;
}

export function hasDemoRole(role: UserRole) {
  return getDemoUser()?.role === role;
}

export function logoutDemoUser() {
  getStorage()?.removeItem(SESSION_KEY);
}

export function demoCredentialsFor(role: UserRole) {
  return role === "admin" ? DEMO_CREDENTIALS.admin : DEMO_CREDENTIALS.parent;
}
