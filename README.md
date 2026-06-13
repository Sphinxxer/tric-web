# TRIC Sports Academy Website

Demo-ready Next.js website for TRIC Sports Academy, Tirupur.

The public website is intentionally simple, and the real application flow lives behind parent/admin login. The demo uses `sessionStorage` for auth sessions and `localStorage` for submitted applications, payment status, and admin notes. Supabase integration is prepared but not connected yet.

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

Admin login:

```text
Username: Admin
Password: admin
```

Auth behavior:

- Parent sessions are stored in `sessionStorage` under `tric_demo_session`.
- The header shows `Login` when logged out.
- The header shows `Dashboard` and `Logout` for a logged-in parent.
- Admin login is only available by manually visiting `/admin`.
- Closing the browser/tab clears the demo auth session.

Demo portal data:

- Submitted Summer Class and Membership applications are stored in `localStorage`.
- Parent and admin pages read the same demo data store.
- Parent profile updates are stored in `localStorage` under `tric_demo_parent_profile`.
- Parent dashboard shows profile details, derived student profiles, quick application actions, submitted applications, status, payment status, and view-only application details.
- Student profiles are derived from submitted applications and de-duplicated by student name + date of birth.
- Admin dashboard supports application search, type/status/payment filters, manual payment tracking, internal admin notes, and A4 print view.
- Demo stores are isolated in `lib/demo-store/` for future Supabase replacement.

About page image replacement paths:

```text
/images/about/pool-main.jpg
/images/about/pool-1.jpg
/images/about/pool-2.jpg
/images/about/pool-3.jpg
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

- Edit parent profile details in demo mode.
- Submit Summer Class and Membership applications.
- Prevent duplicate applications for the same student + DOB + application type.
- View submitted applications with status and payment tracking.
- View derived student profiles for multi-student account planning.

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
```

The demo build does not require these values. The placeholder client is in `lib/supabase/client.ts`, and the planned schema is in `supabase/schema.sql`.

See `BACKEND_SETUP.md` for the future Supabase migration notes.

## Vercel Notes

- Use the project root as the Vercel root directory.
- Framework preset: Next.js.
- Build command: `npm run build`.
- No environment variables are required for the current demo mode.
- Do not expose Supabase service-role keys in frontend code.
