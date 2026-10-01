-- Consulting demo — Connected Mode schema (PREPARED, NOT APPLIED). Mirrors
-- the structure of 0001_real_estate_demo.sql, 0002_home_services_demo.sql
-- and 0003_clinics_demo.sql but is a fully separate set of tables, per
-- explicit instruction to keep each demo's data and business rules
-- independent.
--
-- This migration has not been run against any Supabase project. The demo
-- currently works entirely without it, in Preview Mode (see
-- src/components/demo/consulting/session.ts). Apply this only once a real
-- Supabase project is connected and you're ready to test Connected Mode —
-- see docs/consulting-demo-integration.md.
--
-- All rows this schema will ever hold are fictional demo data: sample
-- sessions/consultants and visitor-submitted demo requests. Session names
-- and prices are adapted from QUES Consulting's own supplied content;
-- consultants, clients and every date/time/payment are fictional. No real
-- payment, proposal or engagement is ever created.

create extension if not exists "pgcrypto";

create table if not exists demo_consulting_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  closed boolean not null default false
);

create table if not exists demo_consulting_session_services (
  id text primary key, -- matches content/consulting-services.ts ids (strategy, finance, ...)
  name text not null,
  description text not null,
  duration_minutes int not null,
  price numeric(10, 2) not null,
  currency text not null default 'USD'
);

create table if not exists demo_consulting_consultants (
  id text primary key,
  name text not null,
  title text not null,
  specialisms text[] not null default '{}',
  handles_custom_projects boolean not null default false
);

create table if not exists demo_consulting_requests (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_consulting_sessions(id) on delete cascade,
  request_id uuid not null, -- client-generated, for de-duplication (see contract.ts)
  name text not null,
  email text not null,
  path text not null check (path in ('session', 'project')),
  service_id text references demo_consulting_session_services(id), -- required when path = 'session'
  project_overview text not null default '',
  context text not null default '',
  follow_up_opt_in boolean not null default true,
  consultant_id text references demo_consulting_consultants(id),
  created_at timestamptz not null default now(),
  unique (session_id, request_id)
);

create table if not exists demo_consulting_appointments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_consulting_requests(id) on delete cascade,
  slot_iso timestamptz not null,
  status text not null check (status in ('requested', 'confirmed', 'cancelled')),
  payment_amount numeric(10, 2),
  payment_status text check (payment_status in ('unpaid', 'paid')),
  attendance_status text check (attendance_status in ('checked-in', 'attended', 'missed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_consulting_proposals (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_consulting_requests(id) on delete cascade,
  scope_of_work text not null,
  deliverables text not null,
  fee_range text not null,
  notes text not null,
  status text not null check (status in ('pending-approval', 'awaiting-client', 'accepted', 'declined', 'changes-requested')),
  revised boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_consulting_kickoffs (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_consulting_requests(id) on delete cascade,
  date_iso timestamptz,
  status text not null check (status in ('awaiting-scheduling', 'scheduled')) default 'awaiting-scheduling',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_consulting_followups (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_consulting_requests(id) on delete cascade,
  touches_sent int not null default 0,
  outcome text check (outcome in ('accepted', 'declined', 'cancelled', 'opted-out')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_consulting_tasks (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_consulting_requests(id) on delete cascade,
  label text not null,
  detail text not null,
  due_label text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists demo_consulting_message_previews (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references demo_consulting_requests(id) on delete cascade,
  label text not null,
  recipient text not null,
  subject text not null,
  body text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demo_consulting_activity_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_consulting_sessions(id) on delete cascade,
  label text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demo_consulting_jobs_queue (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_consulting_sessions(id) on delete cascade,
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

-- Row Level Security — same pattern as the other three demos: every
-- visitor-writable table is scoped to the caller's own session_id, and
-- only the server (service role key) ever writes. Reference data
-- (session services, consultants) is publicly readable but never
-- browser-writable.
alter table demo_consulting_sessions enable row level security;
alter table demo_consulting_requests enable row level security;
alter table demo_consulting_appointments enable row level security;
alter table demo_consulting_proposals enable row level security;
alter table demo_consulting_kickoffs enable row level security;
alter table demo_consulting_followups enable row level security;
alter table demo_consulting_tasks enable row level security;
alter table demo_consulting_message_previews enable row level security;
alter table demo_consulting_activity_events enable row level security;
alter table demo_consulting_jobs_queue enable row level security;

alter table demo_consulting_session_services enable row level security;
alter table demo_consulting_consultants enable row level security;

create policy "session services are publicly readable" on demo_consulting_session_services for select using (true);
create policy "consultants are publicly readable" on demo_consulting_consultants for select using (true);

-- No insert/update/delete policies are defined above: with RLS enabled
-- and no matching policy, every role except the service role is denied
-- by default. All writes go through the server route using the service
-- role key, never directly from the browser's anon key.

create or replace function demo_consulting_cleanup_expired_sessions()
returns void
language sql
as $$
  delete from demo_consulting_sessions where expires_at < now();
$$;
