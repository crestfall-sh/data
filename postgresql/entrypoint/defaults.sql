CREATE ROLE anon NOLOGIN NOINHERIT;
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.users TO anon;
ALTER ROLE anon SET statement_timeout = '5s';

CREATE ROLE authenticator LOGIN NOINHERIT;
GRANT anon TO authenticator;

CREATE TABLE public.users (
  "id" uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  "name" text NOT NULL
);
INSERT INTO public.users ("name")
VALUES ('alice', 'bob');