create table if not exists users(
id uuid primary key default gen_random_uuid(),
name text,
email text,
password text,
role text,
payment_status text,
course_completed text
);

create table if not exists enrollments(
id uuid primary key default gen_random_uuid(),
name text,
email text,
course text
);

create table if not exists exam_results(
id uuid primary key default gen_random_uuid(),
email text,
course text,
score int
);