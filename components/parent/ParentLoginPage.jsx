"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { demoCredentialsFor } from "@/lib/auth/demoAuth";

const initialSignup = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

const initialLogin = {
  username: "",
  password: "",
};

function fieldClass(error) {
  return `focus-ring min-h-12 rounded-md border bg-white px-3 text-sm text-[#101820] ${
    error ? "border-red-400" : "border-slate-300"
  }`;
}

function digits(value) {
  return value.replace(/\D/g, "");
}

export default function ParentLoginPage() {
  const { login, signupParent, loading, isParent } = useAuth();
  const [mode, setMode] = useState("login");
  const [loginValues, setLoginValues] = useState(initialLogin);
  const [loginError, setLoginError] = useState("");
  const [signupValues, setSignupValues] = useState(initialSignup);
  const [signupErrors, setSignupErrors] = useState({});
  const credentials = demoCredentialsFor("parent");
  const showDemoCredentials =
    process.env.NEXT_PUBLIC_SHOW_DEMO_CREDENTIALS === "true";

  useEffect(() => {
    if (!loading && isParent) {
      window.location.replace("/parent/dashboard");
    }
  }, [isParent, loading]);

  function updateSignup(field, value) {
    setSignupValues((current) => ({ ...current, [field]: value }));
    setSignupErrors((current) => ({ ...current, [field]: "" }));
  }

  function updateLogin(field, value) {
    setLoginValues((current) => ({ ...current, [field]: value }));
    setLoginError("");
  }

  function submitLogin(event) {
    event.preventDefault();
    setLoginError("");

    const result = login("parent", loginValues.username, loginValues.password);

    if (!result.ok) {
      setLoginError(result.message);
      return;
    }

    window.location.assign("/parent/dashboard");
  }

  function validateSignup() {
    const nextErrors = {};
    const phone = digits(signupValues.phone);
    const whatsapp = digits(signupValues.whatsapp);

    if (!signupValues.name.trim()) {
      nextErrors.name = "Please enter the parent / guardian name.";
    }

    if (!phone) {
      nextErrors.phone = "Please enter a phone number.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (whatsapp && !/^[6-9]\d{9}$/.test(whatsapp)) {
      nextErrors.whatsapp = "Enter a valid 10-digit WhatsApp number.";
    }

    if (!whatsapp) {
      nextErrors.whatsapp = "Please enter a WhatsApp number.";
    }

    if (!signupValues.email.trim()) {
      nextErrors.email = "Please enter an email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(signupValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!signupValues.password) {
      nextErrors.password = "Please enter a password.";
    }

    if (signupValues.confirmPassword !== signupValues.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!signupValues.termsAccepted) {
      nextErrors.termsAccepted = "Please accept the declaration to continue.";
    }

    setSignupErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submitSignup(event) {
    event.preventDefault();
    if (!validateSignup()) return;

    const result = signupParent({
      name: signupValues.name,
      phone: signupValues.phone,
      whatsapp: signupValues.whatsapp || signupValues.phone,
      email: signupValues.email,
      password: signupValues.password,
    });

    if (!result.ok) {
      setSignupErrors({ form: result.message });
      return;
    }

    window.sessionStorage?.setItem(
      "tric_demo_signup_success",
      "Account created successfully.",
    );
    window.location.assign("/parent/dashboard");
  }

  function signupInput(field, label, type = "text", autoComplete = "") {
    return (
      <label className="grid gap-2" htmlFor={field}>
        <span className="text-sm font-black text-[#061A2E]">
          {label} <span className="text-red-600">*</span>
        </span>
        <input
          id={field}
          type={type}
          autoComplete={autoComplete}
          value={signupValues[field] ?? ""}
          onChange={(event) => updateSignup(field, event.target.value)}
          className={fieldClass(signupErrors[field])}
        />
        {signupErrors[field] ? (
          <span className="text-xs font-bold text-red-600">
            {signupErrors[field]}
          </span>
        ) : null}
      </label>
    );
  }

  return (
    <section className="bg-[#F5F7FA] py-8 sm:py-12">
      <div className="container-shell grid min-h-[64vh] place-items-center">
        <div className="w-full max-w-lg rounded-lg border border-[#DDEAF3] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center overflow-hidden rounded-full border border-[#DDB648]/70 bg-[#061A2E]">
              <Image
                src="/images/tric-academy-logo.png"
                alt="TRIC Sports Academy logo"
                width={48}
                height={48}
                className="object-cover"
                style={{ width: "48px", height: "48px" }}
              />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0077B6]">
                Parent login
              </p>
              <h1 className="text-2xl font-black text-[#061A2E]">
                TRIC Sports Academy
              </h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-[#5F6B7A]">
            Login or create a parent account to apply for Summer Classes and
            Membership programs at TRIC Sports Academy.
          </p>

          <div className="mt-5 grid grid-cols-2 rounded-lg border border-[#DDEAF3] bg-[#F8FCFF] p-1">
            {[
              ["login", "Login"],
              ["signup", "Create Account"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setMode(value);
                  setLoginError("");
                  setSignupErrors({});
                }}
                className={`focus-ring min-h-11 rounded-md px-3 text-sm font-black transition ${
                  mode === value
                    ? "bg-[#061A2E] text-white shadow-sm"
                    : "text-[#061A2E] hover:bg-[#EAF8FF]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {showDemoCredentials ? (
            <div className="mt-5 rounded-md border border-[#DDEAF3] bg-[#EAF8FF] p-3 text-sm font-bold text-[#061A2E]">
              Use your registered email. Demo users can login with{" "}
              <span className="font-black">{credentials.username}</span>, Password{" "}
              <span className="font-black">{credentials.password}</span>
            </div>
          ) : null}

          {mode === "login" ? (
            <form key="login-form" onSubmit={submitLogin} className="mt-6">
              <label className="grid gap-2">
                <span className="text-sm font-black text-[#061A2E]">
                  Email or Username
                </span>
                <input
                  name="username"
                  required
                  autoComplete="username"
                  value={loginValues.username}
                  onChange={(event) => updateLogin("username", event.target.value)}
                  className="focus-ring min-h-12 rounded-md border border-slate-300 px-3 text-sm"
                />
              </label>

              <label className="mt-4 grid gap-2">
                <span className="text-sm font-black text-[#061A2E]">Password</span>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={loginValues.password}
                  onChange={(event) => updateLogin("password", event.target.value)}
                  className="focus-ring min-h-12 rounded-md border border-slate-300 px-3 text-sm"
                />
              </label>

              {loginError ? (
                <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                  {loginError}
                </p>
              ) : null}

              <button
                type="submit"
                className="focus-ring mt-6 min-h-12 w-full rounded-md bg-[#061A2E] px-4 text-sm font-black text-white hover:bg-[#0B2B47]"
              >
                Login
              </button>
            </form>
          ) : (
            <form key="signup-form" onSubmit={submitSignup} className="mt-6 grid gap-4">
              <p className="rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-3 text-sm font-bold leading-6 text-[#334155]">
                Create one parent account to submit and track applications for one
                or more students.
              </p>

              {signupInput("name", "Parent / guardian name", "text", "name")}
              {signupInput("phone", "Phone number", "tel", "tel")}
              <label className="grid gap-2" htmlFor="whatsapp">
                <span className="text-sm font-black text-[#061A2E]">
                  WhatsApp number <span className="text-red-600">*</span>
                </span>
                <input
                  id="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  value={signupValues.whatsapp ?? ""}
                  onChange={(event) => updateSignup("whatsapp", event.target.value)}
                  className={fieldClass(signupErrors.whatsapp)}
                />
                {signupErrors.whatsapp ? (
                  <span className="text-xs font-bold text-red-600">
                    {signupErrors.whatsapp}
                  </span>
                ) : null}
              </label>
              {signupInput("email", "Email", "email", "email")}
              {signupInput("password", "Password", "password", "new-password")}
              {signupInput(
                "confirmPassword",
                "Confirm password",
                "password",
                "new-password",
              )}

              <label className="flex gap-3 rounded-md border border-[#DDEAF3] bg-[#F8FCFF] p-3">
                <input
                  type="checkbox"
                  checked={signupValues.termsAccepted}
                  onChange={(event) =>
                    updateSignup("termsAccepted", event.target.checked)
                  }
                  className="mt-1 size-5 accent-[#0077B6]"
                />
                <span className="text-sm font-bold leading-6 text-[#061A2E]">
                  I confirm that the information provided is accurate and agree to
                  be contacted by TRIC Sports Academy.
                  {signupErrors.termsAccepted ? (
                    <span className="mt-2 block text-xs font-bold text-red-600">
                      {signupErrors.termsAccepted}
                    </span>
                  ) : null}
                </span>
              </label>

              {signupErrors.form ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                  {signupErrors.form}
                </p>
              ) : null}

              <button
                type="submit"
                className="focus-ring min-h-12 w-full rounded-md bg-[#061A2E] px-4 text-sm font-black text-white hover:bg-[#0B2B47]"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
