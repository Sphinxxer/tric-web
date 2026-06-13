-- TRIC Sports Academy planned Supabase schema
-- Demo mode currently uses localStorage. Run this later when replacing demo auth/store with Supabase.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  role text not null default 'parent',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint profiles_role_check check (role in ('parent', 'admin'))
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  dob date not null,
  age integer,
  gender text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  application_type text not null,
  status text not null default 'New',
  payment_status text not null default 'Not Paid',
  admin_notes text,
  form_data jsonb not null default '{}'::jsonb,
  submitted_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint applications_type_check check (application_type in ('summer-class', 'membership')),
  constraint applications_status_check check (
    status in ('New', 'Reviewed', 'Approved', 'Rejected', 'Joined', 'Payment Pending')
  ),
  constraint applications_payment_status_check check (
    payment_status in ('Not Paid', 'Pending', 'Partial', 'Paid')
  )
);

create table if not exists public.admin_activity_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id) on delete set null,
  application_id uuid references public.applications(id) on delete cascade,
  action text not null,
  created_at timestamp with time zone not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists students_user_id_idx on public.students (user_id);
create index if not exists students_name_dob_idx on public.students (lower(full_name), dob);
create index if not exists applications_user_id_idx on public.applications (user_id);
create index if not exists applications_student_id_idx on public.applications (student_id);
create index if not exists applications_type_idx on public.applications (application_type);
create index if not exists applications_status_idx on public.applications (status);
create index if not exists applications_payment_status_idx on public.applications (payment_status);
create index if not exists applications_submitted_at_idx on public.applications (submitted_at desc);
create index if not exists admin_activity_application_idx on public.admin_activity_log (application_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_students_updated_at on public.students;
create trigger set_students_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists set_applications_updated_at on public.applications;
create trigger set_applications_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.applications enable row level security;
alter table public.admin_activity_log enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- Starter RLS policies. Review before production launch.

drop policy if exists "Parents can read own profile" on public.profiles;
create policy "Parents can read own profile"
on public.profiles for select to authenticated
using (id = auth.uid());

drop policy if exists "Parents can update own profile" on public.profiles;
create policy "Parents can update own profile"
on public.profiles for update to authenticated
using (id = auth.uid())
with check (id = auth.uid() and role = 'parent');

drop policy if exists "Admins can read profiles" on public.profiles;
create policy "Admins can read profiles"
on public.profiles for select to authenticated
using (public.is_admin());

drop policy if exists "Parents can insert own students" on public.students;
create policy "Parents can insert own students"
on public.students for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "Parents can read own students" on public.students;
create policy "Parents can read own students"
on public.students for select to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins can read students" on public.students;
create policy "Admins can read students"
on public.students for select to authenticated
using (public.is_admin());

drop policy if exists "Parents can insert own applications" on public.applications;
create policy "Parents can insert own applications"
on public.applications for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "Parents can read own applications" on public.applications;
create policy "Parents can read own applications"
on public.applications for select to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins can read applications" on public.applications;
create policy "Admins can read applications"
on public.applications for select to authenticated
using (public.is_admin());

drop policy if exists "Admins can update applications" on public.applications;
create policy "Admins can update applications"
on public.applications for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can insert activity logs" on public.admin_activity_log;
create policy "Admins can insert activity logs"
on public.admin_activity_log for insert to authenticated
with check (public.is_admin());

drop policy if exists "Admins can read activity logs" on public.admin_activity_log;
create policy "Admins can read activity logs"
on public.admin_activity_log for select to authenticated
using (public.is_admin());

comment on table public.profiles is 'Future Supabase Auth profiles for TRIC parent and admin users.';
comment on table public.students is 'Future student/member identity records.';
comment on table public.applications is 'Future summer class and membership application records.';
comment on table public.admin_activity_log is 'Future admin status-change audit trail.';

-- Future storage note:
-- Create a private Supabase Storage bucket named student-photos when photo upload is added.
-- Keep frontend validation at JPG, PNG, WEBP and max 2 MB.
-- Never expose a Supabase service-role key in browser code.

-- Future table direction:
-- payments: manual and gateway payment tracking records.
-- batches: class/batch scheduling and capacity.
-- admin_notes: staff-only notes if separated from application records.
-- announcements: parent portal notices and academy updates.
