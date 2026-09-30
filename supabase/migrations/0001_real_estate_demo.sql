-- Real Estate demo — Connected Mode schema (PREPARED, NOT APPLIED).
--
-- This migration has not been run against any Supabase project. No
-- Supabase credentials are configured in this repo yet (see .env.example).
-- The demo currently works entirely without this schema, in Preview Mode
-- (see src/components/demo/real-estate/session.ts). Apply this only once
-- a real Supabase project is connected and you're ready to test Connected
-- Mode end to end — see docs/real-estate-demo-integration.md.
--
-- All rows this schema will ever hold are fictional demo data: sample
-- properties/agents and visitor-submitted demo enquiries. No real personal
-- data, payments or bookings are modelled here.

create extension if not exists "pgcrypto";

-- One row per browser demo session (a signed, httpOnly cookie holds this
-- id — the browser never sees or chooses it). Session isolation is
-- enforced by scoping every other table's RLS policy to session_id.
create table if not exists demo_real_estate_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  closed boolean not null default false
);

create table if not exists demo_real_estate_properties (
  id text primary key, -- matches content/real-estate-properties.ts ids (wf-101, ...)
  name text not null,
  neighbourhood text not null,
  property_type text not null,
  listing_type text not null check (listing_type in ('buy', 'rent')),
  price numeric not null,
  currency text not null default 'USD',
  rental_period text,
  bedrooms int not null,
  bathrooms int not null,
  status text not null check (status in ('Available', 'Under Offer')),
  description text not null,
  image text
);

create table if not exists demo_real_estate_agents (
  id text primary key,
  name text not null,
  email text not null,
  neighbourhoods text[] not null default '{}',
  specialism text not null check (specialism in ('buy', 'rent', 'both'))
);

create table if not exists demo_real_estate_enquiries (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_real_estate_sessions(id) on delete cascade,
  request_id uuid not null, -- client-generated, for de-duplication (see contract.ts)
  name text not null,
  email text not null,
  listing_type text not null check (listing_type in ('buy', 'rent')),
  neighbourhood text not null,
  max_budget numeric,
  min_bedrooms int not null default 0,
  property_type text not null default 'any',
  timeline text not null,
  notes text not null default '',
  created_at timestamptz not null default now(),
  unique (session_id, request_id)
);

create table if not exists demo_real_estate_matches (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references demo_real_estate_enquiries(id) on delete cascade,
  property_id text not null references demo_real_estate_properties(id),
  reasons text[] not null default '{}',
  is_alternative boolean not null default false,
  differs text -- only set when is_alternative is true
);

create table if not exists demo_real_estate_assignments (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references demo_real_estate_enquiries(id) on delete cascade,
  agent_id text not null references demo_real_estate_agents(id),
  created_at timestamptz not null default now()
);

create table if not exists demo_real_estate_viewings (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references demo_real_estate_enquiries(id) on delete cascade,
  property_id text not null references demo_real_estate_properties(id),
  slot_iso timestamptz not null,
  status text not null check (status in ('requested', 'confirmed', 'cancelled', 'attended', 'missed')),
  interest text check (interest in ('interested', 'not-interested', 'needs-info')),
  feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demo_real_estate_tasks (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references demo_real_estate_enquiries(id) on delete cascade,
  label text not null,
  detail text not null,
  due_label text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists demo_real_estate_message_previews (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references demo_real_estate_enquiries(id) on delete cascade,
  label text not null,
  recipient text not null,
  subject text not null,
  body text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demo_real_estate_activity_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_real_estate_sessions(id) on delete cascade,
  label text not null,
  simulated_day int not null default 0,
  created_at timestamptz not null default now()
);

-- Async job/status record for the "accepted -> processing -> completed/failed"
-- flow described in src/lib/real-estate-demo/contract.ts. The client polls
-- this by request_id.
create table if not exists demo_real_estate_jobs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references demo_real_estate_sessions(id) on delete cascade,
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

-- Row Level Security: every visitor-writable table is scoped to the
-- caller's own session_id, and only the server (using the service role
-- key, which bypasses RLS entirely and must stay server-only — see
-- .env.example) ever writes to these tables. No anon/public policy grants
-- direct browser writes to Supabase; the browser only ever talks to
-- /api/demo/real-estate, which validates and forwards.
alter table demo_real_estate_sessions enable row level security;
alter table demo_real_estate_enquiries enable row level security;
alter table demo_real_estate_matches enable row level security;
alter table demo_real_estate_assignments enable row level security;
alter table demo_real_estate_viewings enable row level security;
alter table demo_real_estate_tasks enable row level security;
alter table demo_real_estate_message_previews enable row level security;
alter table demo_real_estate_activity_events enable row level security;
alter table demo_real_estate_jobs enable row level security;

-- Reference data (properties, agents) is safe to read publicly (it's the
-- same fictional sample data already shown on the page) but never
-- writable from the browser.
alter table demo_real_estate_properties enable row level security;
alter table demo_real_estate_agents enable row level security;

create policy "properties are publicly readable" on demo_real_estate_properties for select using (true);
create policy "agents are publicly readable" on demo_real_estate_agents for select using (true);

-- No insert/update/delete policies are defined for any table above: with
-- RLS enabled and no policy granting a given operation, that operation is
-- denied by default for every role except the service role. This is
-- intentional — all writes go through the server route using the service
-- role key, never directly from the browser's anon key.

-- Cleanup: expired sessions and everything cascading from them (Stage D —
-- "expired-session cleanup" in n8n-workflows/real-estate/04-*.json is the
-- intended trigger for this, running on a schedule).
create or replace function demo_real_estate_cleanup_expired_sessions()
returns void
language sql
as $$
  delete from demo_real_estate_sessions where expires_at < now();
$$;
