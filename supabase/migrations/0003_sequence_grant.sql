-- Fixes "permission denied for sequence user_uid_seq" (Postgres error 42501).
-- GRANT INSERT on a table does not automatically grant usage on sequences
-- referenced by that table's column defaults (e.g. uid integer default
-- nextval('user_uid_seq')) — sequences need their own explicit grant.

grant usage, select on sequence public.user_uid_seq to authenticated;
