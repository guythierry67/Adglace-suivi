create table if not exists kv_store (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

alter table kv_store enable row level security;

create policy "Allow anon read" on kv_store
  for select using (true);

create policy "Allow anon insert" on kv_store
  for insert with check (true);

create policy "Allow anon update" on kv_store
  for update using (true);

create policy "Allow anon delete" on kv_store
  for delete using (true);
