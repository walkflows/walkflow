-- Home Services (roofing) demo — Connected Mode schema (PREPARED, NOT
-- APPLIED). Mirrors the structure of 0001_real_estate_demo.sql but is a
-- fully separate set of tables, per explicit instruction to keep each
-- demo's data and business rules independent.
--
-- This migration has not been run against any Supabase project. The demo
-- currently works entirely without it, in Preview Mode (see
-- src/components/demo/home-services/session.ts). Apply this only once a
-- real Supabase project is connected and you're ready to test Connected
-- Mode — see docs/home-services-demo-integration.md.
--
-- All rows this schema will ever hold are fictional demo data: sample
-- services/crews and visitor-submitted demo requests. No real customer
-- data, payments or jobs are modelled here. Service names/descriptions
-- are adapted from ROOFORA's real supplied business content; crews,
-- customers and every date/time are fictional.

create extension if not exists "pgcrypto";

create table if not exists demo_home_services_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  closed boolean not null default false
);

create table if not exists demo_home_services_services (
  id text primary key, -- matches content/home-services-roofing.ts ids (roof-repair, ...)
  name text not null,
  description text not null,
  image text
);

create table if not exists demo_home_services_crews (
  id text primary key,
  name text not null,
  lead_name text not null,
  email text not null,
  specialisms text[] not null default '{}',
  areas text[] not null default '{}'
);

create table if not exists demo_home_services_requests (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_home_services_sessions(id) on delete cascade,
  request_id uuid not null, -- client-generated, for de-duplication (see contract.ts)
  name text not null,
  email text not null,
  phone text not null,
  service_id text not null references demo_home_services_services(id),
  property_kind text not null check (property_kind in ('residential', 'commercial')),
  location text not null,
  issue_description text not null,
  urgency text not null check (urgency in ('routine', 'soon', 'urgent')),
  preferred_slot_iso timestamptz,
  photo_id text not null default 'photo-none',
  area_covered boolean,
  urgent_flagged boolean not null default false,
  assigned_crew_id text references demo_home_services_crews(id),
  created_at timestamptz not null default now(),
  unique (session_id, request_id)
);

create table if not exists demo_home_services_inspections (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_home_services_requests(id) on delete cascade,
  slot_iso timestamptz not null,
  status text not null check (status in ('requested', 'confirmed', 'cancelled', 'completed', 'missed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_home_services_estimates (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_home_services_requests(id) on delete cascade,
  scope_of_work text not null,
  materials text not null,
  labour text not null,
  amount numeric not null,
  currency text not null default 'USD',
  notes text not null default '',
  revised boolean not null default false,
  status text not null check (status in ('pending-approval', 'awaiting-customer', 'accepted', 'changes-requested', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_home_services_jobs (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_home_services_requests(id) on delete cascade,
  crew_id text not null references demo_home_services_crews(id),
  date_iso timestamptz,
  status text not null check (status in ('awaiting-scheduling', 'scheduled', 'in-progress', 'delayed', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_home_services_invoices (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references demo_home_services_jobs(id) on delete cascade,
  amount numeric not null,
  currency text not null default 'USD',
  status text not null check (status in ('unpaid', 'paid')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_home_services_tasks (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_home_services_requests(id) on delete cascade,
  label text not null,
  detail text not null,
  due_label text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists demo_home_services_message_previews (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_home_services_requests(id) on delete cascade,
  label text not null,
  recipient text not null,
  subject text not null,
  body text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demo_home_services_activity_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_home_services_sessions(id) on delete cascade,
  label text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demo_home_services_jobs_queue (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_home_services_sessions(id) on delete cascade,
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

-- Row Level Security — same pattern as the Real Estate migration: every
-- visitor-writable table is scoped to the caller's own session_id, and
-- only the server (service role key) ever writes. Reference data
-- (services, crews) is publicly readable but never browser-writable.
alter table demo_home_services_sessions enable row level security;
alter table demo_home_services_requests enable row level security;
alter table demo_home_services_inspections enable row level security;
alter table demo_home_services_estimates enable row level security;
alter table demo_home_services_jobs enable row level security;
alter table demo_home_services_invoices enable row level security;
alter table demo_home_services_tasks enable row level security;
alter table demo_home_services_message_previews enable row level security;
alter table demo_home_services_activity_events enable row level security;
alter table demo_home_services_jobs_queue enable row level security;

alter table demo_home_services_services enable row level security;
alter table demo_home_services_crews enable row level security;

create policy "services are publicly readable" on demo_home_services_services for select using (true);
create policy "crews are publicly readable" on demo_home_services_crews for select using (true);

-- No insert/update/delete policies are defined above: with RLS enabled and
-- no matching policy, every role except the service role is denied by
-- default. All writes go through the server route using the service role
-- key, never directly from the browser's anon key.

create or replace function demo_home_services_cleanup_expired_sessions()
returns void
language sql
as $$
  delete from demo_home_services_sessions where expires_at < now();
$$;
