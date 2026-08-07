-- Exam attempts: one row per exam submission. Immutable by design — no
-- update/delete policies, since a record of every attempt should be kept.
-- bestExamResult() in src/lib/progress.ts picks the highest-scoring row
-- per user/path automatically, so retakes just insert new rows.

create table exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path_slug text not null,
  score int not null,
  total int not null,
  passed boolean not null,
  answers jsonb not null,
  created_at timestamptz not null default now()
);

alter table exam_attempts enable row level security;

create policy "Users can view their own exam attempts"
  on exam_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own exam attempts"
  on exam_attempts for insert
  with check (auth.uid() = user_id);
