create extension if not exists pgcrypto;

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  course text,
  reason text,
  approved boolean default false,
  payment_status text default 'pending',
  level text default 'beginner',
  exam_score integer,
  created_at timestamptz default now()
);

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  course text,
  reason text,
  approved boolean default false,
  payment_status text default 'pending',
  level text default 'beginner',
  exam_score integer,
  created_at timestamptz default now()
);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  course text not null,
  question text not null,
  options jsonb not null,
  correct_answer text not null,
  created_at timestamptz default now()
);

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  course text,
  score integer,
  percent integer,
  level text,
  answers jsonb,
  submitted_at timestamptz default now()
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  username text unique,
  password text,
  role text default 'student',
  approved boolean default false,
  payment_status text default 'pending',
  level text default 'beginner',
  course text,
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text,
  role text default 'student',
  created_at timestamptz default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  course text,
  progress_percent integer default 0,
  updated_at timestamptz default now()
);

create table if not exists public.certificate_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  course text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.daily_quizzes (
  id uuid primary key default gen_random_uuid(),
  course text,
  question text,
  options jsonb,
  correct_answer text,
  created_at timestamptz default now()
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  course text,
  score integer,
  submitted_at timestamptz default now()
);
