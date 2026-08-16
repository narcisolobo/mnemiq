-- Extensions required by the MnemIQ schema.
-- Source of truth: notes/core-tables.md

-- pg_trgm: trigram similarity, used for fuzzy tag autocomplete matching (PRD §6.5).
create extension if not exists pg_trgm with schema extensions;
