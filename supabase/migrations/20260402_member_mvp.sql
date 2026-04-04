create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'MEMBER' check (role in ('MEMBER', 'BRANCH_ADMIN', 'BRAND_OWNER', 'PLATFORM_ADMIN')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  coach_name text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  capacity integer,
  created_at timestamptz not null default timezone('utc', now()),
  constraint sessions_ends_after_start check (ends_at > starts_at),
  constraint sessions_capacity_positive check (capacity is null or capacity > 0)
);

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id uuid not null references public.sessions (id) on delete cascade,
  checked_in_at timestamptz not null default timezone('utc', now()),
  unique (user_id, session_id)
);

create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source text not null,
  amount integer not null,
  related_check_in_id uuid unique references public.check_ins (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists sessions_starts_at_idx on public.sessions (starts_at);
create index if not exists check_ins_user_checked_in_idx on public.check_ins (user_id, checked_in_at desc);
create index if not exists check_ins_session_idx on public.check_ins (session_id);
create index if not exists xp_events_user_created_idx on public.xp_events (user_id, created_at desc);

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1))
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    updated_at = timezone('utc', now());

  return new;
end;
$$;

create or replace function public.handle_check_in_xp_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.xp_events (user_id, source, amount, related_check_in_id)
  values (new.user_id, 'session_check_in', 10, new.id)
  on conflict (related_check_in_id) do nothing;

  return new;
end;
$$;

create or replace function public.check_into_session(target_session_id uuid)
returns table (
  id uuid,
  user_id uuid,
  session_id uuid,
  checked_in_at timestamptz,
  was_created boolean,
  xp_awarded integer
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_user_id uuid;
  existing_check_in public.check_ins;
  created_check_in public.check_ins;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select *
  into existing_check_in
  from public.check_ins
  where user_id = current_user_id
    and session_id = target_session_id;

  if existing_check_in.id is not null then
    return query
    select existing_check_in.id, existing_check_in.user_id, existing_check_in.session_id, existing_check_in.checked_in_at, false, 0;
    return;
  end if;

  insert into public.check_ins (user_id, session_id)
  values (current_user_id, target_session_id)
  returning * into created_check_in;

  return query
  select created_check_in.id, created_check_in.user_id, created_check_in.session_id, created_check_in.checked_in_at, true, 10;
end;
$$;

create or replace function public.get_gym_activity_metrics()
returns table (
  active_members bigint,
  check_ins_today bigint,
  available_sessions bigint,
  featured_session_title text
)
language sql
security definer
set search_path = public
as $$
  with today_check_ins as (
    select user_id
    from public.check_ins
    where checked_in_at >= date_trunc('day', timezone('utc', now()))
  ),
  upcoming_sessions as (
    select title
    from public.sessions
    where starts_at >= timezone('utc', now())
    order by starts_at asc
  )
  select
    (select count(distinct user_id) from today_check_ins),
    (select count(*) from today_check_ins),
    (select count(*) from upcoming_sessions),
    (select title from upcoming_sessions limit 1);
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_current_timestamp_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

drop trigger if exists on_check_in_created_xp_event on public.check_ins;
create trigger on_check_in_created_xp_event
after insert on public.check_ins
for each row
execute function public.handle_check_in_xp_event();

alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.check_ins enable row level security;
alter table public.xp_events enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "sessions_select_authenticated" on public.sessions;
create policy "sessions_select_authenticated"
on public.sessions
for select
to authenticated
using (true);

drop policy if exists "check_ins_select_own" on public.check_ins;
create policy "check_ins_select_own"
on public.check_ins
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "check_ins_insert_own" on public.check_ins;
create policy "check_ins_insert_own"
on public.check_ins
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "xp_events_select_own" on public.xp_events;
create policy "xp_events_select_own"
on public.xp_events
for select
to authenticated
using (auth.uid() = user_id);

grant execute on function public.check_into_session(uuid) to authenticated;
grant execute on function public.get_gym_activity_metrics() to authenticated;

do $$
begin
  if not exists (select 1 from public.sessions limit 1) then
    insert into public.sessions (title, description, coach_name, starts_at, ends_at, capacity)
    values
      (
        'Morning Strength',
        'A full-body lifting session built for consistency and form.',
        'Coach Lina',
        timezone('utc', now()) + interval '1 day' + interval '7 hours',
        timezone('utc', now()) + interval '1 day' + interval '8 hours',
        20
      ),
      (
        'Lunch Break Cardio',
        'A fast-paced conditioning block to keep your streak moving.',
        'Coach Sami',
        timezone('utc', now()) + interval '1 day' + interval '12 hours',
        timezone('utc', now()) + interval '1 day' + interval '13 hours',
        16
      ),
      (
        'Evening Mobility Flow',
        'Recovery, mobility, and light core activation for all levels.',
        'Coach Yasmine',
        timezone('utc', now()) + interval '2 days' + interval '18 hours',
        timezone('utc', now()) + interval '2 days' + interval '19 hours',
        24
      );
  end if;
end
$$;
