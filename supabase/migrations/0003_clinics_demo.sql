-- Clinics demo — Connected Mode schema (PREPARED, NOT APPLIED). Mirrors
-- the structure of 0001_real_estate_demo.sql and 0002_home_services_demo.sql
-- but is a fully separate set of tables, per explicit instruction to keep
-- each demo's data and business rules independent.
--
-- This migration has not been run against any Supabase project. The demo
-- currently works entirely without it, in Preview Mode (see
-- src/components/demo/clinics/session.ts). Apply this only once a real
-- Supabase project is connected and you're ready to test Connected Mode —
-- see docs/clinics-demo-integration.md.
--
-- All rows this schema will ever hold are fictional demo data: sample
-- service categories/staff and visitor-submitted demo requests. No real
-- patient data, diagnoses, treatment plans or medical records are
-- modelled here — this stays strictly administrative. Service category
-- names/descriptions are adapted from Happy Clinics' own supplied
-- content; staff, patients and every date/time are fictional.

create extension if not exists "pgcrypto";

create table if not exists demo_clinics_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  closed boolean not null default false
);

create table if not exists demo_clinics_service_categories (
  id text primary key, -- matches content/clinics-services.ts ids (dental-care, ...)
  name text not null,
  description text not null,
  image text
);

create table if not exists demo_clinics_reception_staff (
  id text primary key,
  name text not null,
  email text not null,
  categories text[] not null default '{}'
);

create table if not exists demo_clinics_providers (
  id text primary key,
  name text not null,
  title text not null,
  category_id text not null references demo_clinics_service_categories(id)
);

create table if not exists demo_clinics_requests (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_clinics_sessions(id) on delete cascade,
  request_id uuid not null, -- client-generated, for de-duplication (see contract.ts)
  name text not null,
  email text not null,
  category_id text not null references demo_clinics_service_categories(id),
  patient_kind text not null check (patient_kind in ('new', 'returning')),
  support_needs_id text not null default 'support-none',
  note text not null default '',
  follow_up_opt_in boolean not null default true,
  category_pending boolean not null default false,
  reception_owner_id text references demo_clinics_reception_staff(id),
  provider_id text references demo_clinics_providers(id),
  created_at timestamptz not null default now(),
  unique (session_id, request_id)
);

create table if not exists demo_clinics_appointments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_clinics_requests(id) on delete cascade,
  slot_iso timestamptz not null,
  status text not null check (status in ('requested', 'confirmed', 'cancelled')),
  reminders_valid boolean not null default true,
  attendance_intent_confirmed boolean not null default false,
  attendance_status text check (attendance_status in ('checked-in', 'attended', 'missed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_clinics_waitlist_candidates (
  id text primary key,
  name text not null,
  category_id text not null references demo_clinics_service_categories(id)
);

create table if not exists demo_clinics_waitlist_offers (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references demo_clinics_appointments(id) on delete cascade,
  candidate_id text not null references demo_clinics_waitlist_candidates(id),
  slot_iso timestamptz not null,
  status text not null check (status in ('offered', 'accepted', 'declined', 'expired')) default 'offered',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_clinics_tasks (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_clinics_requests(id) on delete cascade,
  label text not null,
  detail text not null,
  due_label text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists demo_clinics_message_previews (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_clinics_requests(id) on delete cascade,
  label text not null,
  recipient text not null,
  subject text not null,
  body text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demo_clinics_activity_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_clinics_sessions(id) on delete cascade,
  label text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demo_clinics_jobs_queue (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_clinics_sessions(id) on delete cascade,
  request_id uuid not null,
  action text not null,
  status text not null check (status in ('accepted', 'processing', 'completed', 'failed')) default 'accepted',
  result jsonb,
  error_code text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, request_id)
);

-- Row Level Security — same pattern as the other two demos: every
-- visitor-writable table is scoped to the caller's own session_id, and
-- only the server (service role key) ever writes. Reference data
-- (service categories, staff, providers, waiting-list candidates) is
-- publicly readable but never browser-writable.
alter table demo_clinics_sessions enable row level security;
alter table demo_clinics_requests enable row level security;
alter table demo_clinics_appointments enable row level security;
alter table demo_clinics_waitlist_offers enable row level security;
alter table demo_clinics_tasks enable row level security;
alter table demo_clinics_message_previews enable row level security;
alter table demo_clinics_activity_events enable row level security;
alter table demo_clinics_jobs_queue enable row level security;

alter table demo_clinics_service_categories enable row level security;
alter table demo_clinics_reception_staff enable row level security;
alter table demo_clinics_providers enable row level security;
alter table demo_clinics_waitlist_candidates enable row level security;

create policy "service categories are publicly readable" on demo_clinics_service_categories for select using (true);
create policy "reception staff are publicly readable" on demo_clinics_reception_staff for select using (true);
create policy "providers are publicly readable" on demo_clinics_providers for select using (true);
create policy "waitlist candidates are publicly readable" on demo_clinics_waitlist_candidates for select using (true);

-- No insert/update/delete policies are defined above: with RLS enabled
-- and no matching policy, every role except the service role is denied
-- by default. All writes go through the server route using the service
-- role key, never directly from the browser's anon key.

create or replace function demo_clinics_cleanup_expired_sessions()
returns void
language sql
as $$
  delete from demo_clinics_sessions where expires_at < now();
$$;
