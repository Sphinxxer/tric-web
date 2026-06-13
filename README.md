# TRIC Sports Academy Website

Demo-ready Next.js website for TRIC Sports Academy, Tirupur.

The public website is intentionally simple, and the real application flow lives behind parent/admin login. The demo uses `sessionStorage` for auth sessions and `localStorage` for parent signup accounts, parent profiles, student profiles, submitted applications, payment status, and admin notes. Supabase integration is prepared but not connected yet.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Demo Login Credentials

Parent login:

```text
Username: Parents
Password: 1234
```

Parent signup:

- Open `/login`.
- Switch to `Create Account`.
- Create a parent account with name, phone, WhatsApp, email, password, and declaration.
- The account is saved locally for frontend testing and can be used to login again during the same browser environment.

Admin login:

```text
Username: Admin
Password: admin
```

Auth behavior:

- Parent sessions are stored in `sessionStorage` under `tric_demo_session`.
- Registered parent accounts are stored in `localStorage` under `tric_demo_parent_accounts`.
- The header shows `Login` when logged out.
- The header shows `Dashboard` and `Logout` for a logged-in parent.
- Admin login is only available by manually visiting `/admin`.
- Closing the browser/tab clears the demo auth session.
- Demo signup passwords are stored locally only for frontend testing. Production must replace this with Supabase Auth and must not store passwords in browser storage.

Demo portal data:

- Submitted Summer Class and Membership applications are stored in `localStorage`.
- Parent and admin pages read the same demo data store.
- Parent profile updates are stored in `localStorage` under `tric_demo_parent_profile`.
- Saved student profiles are stored in `localStorage` under `tric_demo_students`.
- Parent dashboard shows profile details, saved student profiles, quick application actions, submitted applications, status, payment status, and view-only application details.
- Student profiles can be added and edited before submitting applications.
- Applications store parent/student snapshots so submitted records stay stable if a profile is edited later.
- Admin dashboard supports application search, type/status/payment filters, manual payment tracking, internal admin notes, and A4 print view.
- Demo stores are isolated in `lib/demo-store/` for future Supabase replacement.

About page image replacement paths:

```text
/images/about/pool-main.jpg
/images/about/poolside.jpg
/images/about/training.jpg
/images/about/facility.jpg
```

Missing images fall back visually and do not block the build.

## Routes

Public:

```text
/
/about
/facilities
/programs
/contact
/login
```

Parent:

```text
/parent/dashboard
/parent/profile
/parent/students
/parent/students/new
/parent/students/[id]
/parent/apply
/parent/apply/summer-class
/parent/apply/membership
/parent/applications
/parent/applications/[id]
```

Admin:

```text
/admin
/admin/dashboard
/admin/applications
/admin/applications/[id]
/admin/applications/[id]/print
```

## Current Demo Features

Parent portal:

- Create a demo parent account from `/login`.
- Edit parent profile details in demo mode.
- Add and edit multiple student profiles.
- Apply for Summer Class or Membership using a saved student profile.
- Submit Summer Class and Membership applications.
- Prevent duplicate applications for the same parent + student + application type.
- View submitted applications with status and payment tracking.
- View saved student profiles for multi-student account planning.

Admin panel:

- View application summary counts.
- Search and filter applications by type, status, and payment status.
- Update application status, payment status, and internal admin notes.
- Print a clean A4 application form for filing or signature.

## Supabase Preparation

Future environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SHOW_DEMO_CREDENTIALS=true
```

The demo build does not require these values. The placeholder client is in `lib/supabase/client.ts`, and the planned schema is in `supabase/schema.sql`.

Future signup replacement:

- Replace demo parent signup with Supabase Auth `signUp`.
- Replace demo parent login with Supabase Auth `signInWithPassword`.
- Save parent profile details to the Supabase `profiles` table.
- Save student profiles to the Supabase `students` table.
- Save applications with parent/student snapshots in the Supabase `applications` table.
- Control admin access through a Supabase-backed role such as `profiles.role = 'admin'`.

See `BACKEND_SETUP.md` for the future Supabase migration notes.

## Vercel Notes

- Use the project root as the Vercel root directory.
- Framework preset: Next.js.
- Build command: `npm run build`.
- No environment variables are required for the current demo mode.
- Do not expose Supabase service-role keys in frontend code.
