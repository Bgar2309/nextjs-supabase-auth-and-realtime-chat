-- SQL initialization for Supabase

-- 1. Organizations table
create extension if not exists "uuid-ossp";

create table if not exists organizations (
  id uuid primary key default uuid_generate_v4(),
  name text,
  created_at timestamptz default now()
);

-- 2. Profiles modifications
create type profile_role as enum ('CEO','manager');

alter table profiles
  add column if not exists role profile_role,
  add column if not exists organization_id uuid references organizations(id);

-- 3. Request status enum
create type request_status as enum ('pending','done','answered');

-- 4. Requests table
create table if not exists requests (
  id uuid primary key,
  title text,
  body text,
  sender_id uuid references profiles(id),
  receiver_id uuid references profiles(id),
  status request_status default 'pending',
  organization_id uuid references organizations(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Row Level Security
alter table profiles enable row level security;
create policy "Select own profile" on profiles
  for select using (id = auth.uid());

alter table requests enable row level security;
create policy "Access org requests" on requests
  for select using (organization_id = current_setting('request.jwt.claim.org_id')::uuid);
create policy "Insert org requests" on requests
  for insert with check (organization_id = current_setting('request.jwt.claim.org_id')::uuid);
create policy "Update org requests" on requests
  for update using (organization_id = current_setting('request.jwt.claim.org_id')::uuid);
