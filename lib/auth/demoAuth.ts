import type { DemoUser, UserRole } from "@/types/demo";
import {
  createDemoParentAccount,
  findDemoParentAccount,
  normalizeEmail,
  normalizeLoginIdentifier,
} from "@/lib/demo-store/parents";
import type { ParentSignupInput } from "@/types/auth";

const SESSION_KEY = "tric_demo_session";

const DEMO_CREDENTIALS = {
  parent: { username: "Parents", password: "1234" },
  admin: { username: "Admin", password: "admin" },
} as const;

const DEFAULT_PARENT_ID = "demo-parent-parents";
const DEFAULT_ADMIN_ID = "demo-admin";

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage;
}

export function loginDemoUser(role: UserRole, username: string, password: string) {
  const expected = role === "admin" ? DEMO_CREDENTIALS.admin : DEMO_CREDENTIALS.parent;
  const normalizedIdentifier = normalizeLoginIdentifier(username);

  if (role === "parent") {
    const account = findDemoParentAccount(username);
    if (account && account.password === password) {
      const user: DemoUser = {
        id: account.id,
        username: account.name,
        email: account.email,
        role: "parent",
        loggedInAt: new Date().toISOString(),
      };

      // TODO: Replace this with Supabase Auth signInWithPassword.
      getStorage()?.setItem(SESSION_KEY, JSON.stringify(user));
      return { ok: true, user };
    }
  }

  if (
    normalizedIdentifier !== normalizeLoginIdentifier(expected.username) ||
    password !== expected.password
  ) {
    return {
      ok: false,
      message: "Invalid email/username or password. Please try again.",
    };
  }

  const user: DemoUser = {
    id: role === "admin" ? DEFAULT_ADMIN_ID : DEFAULT_PARENT_ID,
    username: expected.username,
    role,
    loggedInAt: new Date().toISOString(),
  };

  // TODO: Replace this with Supabase Auth session handling.
  getStorage()?.setItem(SESSION_KEY, JSON.stringify(user));

  return { ok: true, user };
}

export function signupDemoParent(input: ParentSignupInput) {
  const result = createDemoParentAccount({
    ...input,
    email: normalizeEmail(input.email),
  });
  if (!result.ok) return result;

  const user: DemoUser = {
    id: result.account.id,
    username: result.account.name,
    email: result.account.email,
    role: "parent",
    loggedInAt: new Date().toISOString(),
  };

  // TODO: Replace this demo signup with Supabase Auth signUp and profile insert.
  getStorage()?.setItem(SESSION_KEY, JSON.stringify(user));

  return { ok: true, user };
}

export function getDemoUser(): DemoUser | null {
  const raw = getStorage()?.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const user = JSON.parse(raw) as DemoUser;
    if (user?.role === "admin" || user?.role === "parent") {
      return {
        ...user,
        id:
          user.id ||
          (user.role === "admin"
            ? DEFAULT_ADMIN_ID
            : user.email
              ? `parent-${user.email}`
              : DEFAULT_PARENT_ID),
      };
    }
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

export function defaultParentId() {
  return DEFAULT_PARENT_ID;
}
