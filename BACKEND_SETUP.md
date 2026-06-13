# TRIC Sports Academy Backend Setup Notes

The current app is a stable demo build. Parent login, admin login, application submission, status updates, manual payment tracking, admin notes, and A4 print views use dummy credentials plus browser storage.

Supabase should be connected only in the next backend phase.

## Current Demo Mode

Parent:

```text
Username: Parents
Password: 1234
```

Admin:

```text
Username: Admin
Password: admin
```

Demo implementation files:

```text
lib/auth/demoAuth.ts
lib/demo-store/applications.ts
types/demo.ts
```

## Future Stack

- Hosting: Vercel Hobby
- Auth: Supabase Auth
- Database: Supabase Postgres
- Storage: Supabase Storage for future student photos
- Admin: protected admin dashboard
- Print: browser A4 print view

## Environment Variables

Future `.env.local` values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

The app must continue to build without these variables until live Supabase flows are enabled.

Never expose a Supabase service-role key in browser code.

## Planned Database

The planned SQL schema is in:

```text
supabase/schema.sql
```

It prepares:

- `profiles`
- `students`
- `applications`
- `admin_activity_log`

Future tables/sections to consider after the first Supabase connection:

- `payments`
- `batches`
- `admin_notes`
- `announcements`

Planned application statuses:

- `New`
- `Reviewed`
- `Approved`
- `Rejected`
- `Joined`
- `Payment Pending`

## Future Migration Steps

1. Create a Supabase project.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Replace `lib/auth/demoAuth.ts` with Supabase Auth session helpers.
5. Replace `lib/demo-store/applications.ts` with Supabase insert/select/update helpers.
6. Move payment status and internal admin notes into Supabase-backed records.
7. Keep parent and admin permissions separate.
8. Add private `student-photos` storage bucket when photo upload is reintroduced.
9. Test parent submissions, admin status changes, payment updates, notes, and A4 print views.

## Storage Plan

Future bucket:

```text
student-photos
```

Recommended production setting: private bucket.

Frontend validation should stay:

- JPG, PNG, WEBP
- Maximum 2 MB

Use signed URLs if the bucket remains private.

## Security Direction

- Parents should only read and create their own records.
- Admin users should read and update all application records.
- Public visitors should never read application tables.
- Admin routes must remain unlinked from the public header.
- Service-role keys must only be used in trusted server-side code, if needed later.
