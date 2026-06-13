import type { DemoParentAccount, ParentSignupInput } from "@/types/auth";
import { saveDemoParentProfile } from "@/lib/demo-store/parentProfile";

const PARENT_ACCOUNTS_KEY = "tric_demo_parent_accounts";

function storage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `parent-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function normalizeLoginIdentifier(value: string) {
  return value.trim().toLowerCase();
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizePhone(value: string) {
  return value.replace(/[\s().+-]/g, "").replace(/\D/g, "");
}

function safeParse(value: string | null): DemoParentAccount[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((account): account is DemoParentAccount => {
      return Boolean(
        account &&
          typeof account === "object" &&
          typeof account.email === "string" &&
          typeof account.phone === "string" &&
          typeof account.password === "string",
      );
    });
  } catch {
    storage()?.removeItem(PARENT_ACCOUNTS_KEY);
    return [];
  }
}

export function getDemoParentAccounts() {
  return safeParse(storage()?.getItem(PARENT_ACCOUNTS_KEY) || null);
}

function saveDemoParentAccounts(accounts: DemoParentAccount[]) {
  // Demo only: never store real passwords in localStorage. Replace with Supabase Auth signUp.
  storage()?.setItem(PARENT_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function findDemoParentAccount(login: string) {
  const normalizedLogin = normalizeLoginIdentifier(login);
  const phoneLogin = normalizePhone(login);
  return (
    getDemoParentAccounts().find(
      (account) =>
        normalizeEmail(account.email) === normalizedLogin ||
        account.phone === phoneLogin,
    ) || null
  );
}

export function createDemoParentAccount(input: ParentSignupInput) {
  const accounts = getDemoParentAccounts();
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const whatsapp = normalizePhone(input.whatsapp);
  const duplicateEmail = accounts.find(
    (account) => normalizeEmail(account.email) === email,
  );
  const duplicatePhone = accounts.find((account) => account.phone === phone);

  if (duplicateEmail) {
    return {
      ok: false,
      message: "This email is already registered. Please login instead.",
    };
  }

  if (duplicatePhone) {
    return {
      ok: false,
      message: "This phone number is already registered. Please login or use another number.",
    };
  }

  const account: DemoParentAccount = {
    id: makeId(),
    name: input.name.trim(),
    phone,
    whatsapp,
    email,
    password: input.password,
    createdAt: new Date().toISOString(),
  };

  saveDemoParentAccounts([account, ...accounts]);
  saveDemoParentProfile(
    {
      id: account.id,
      name: account.name,
      phone: account.phone,
      whatsapp: account.whatsapp,
      email: account.email,
      address: "",
    },
    account.id,
  );

  return { ok: true, account };
}
