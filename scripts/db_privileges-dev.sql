REVOKE ALL PRIVILEGES ON SCHEMA public FROM "api-client-dev";

GRANT SELECT ON TABLE public.tenants TO "api-client-dev";
GRANT SELECT ON TABLE public.tenant_courses TO "api-client-dev";
GRANT SELECT ON TABLE public.trails TO "api-client-dev";
GRANT SELECT ON TABLE public.trails_courses TO "api-client-dev";
GRANT SELECT ON TABLE public.trails_users TO "api-client-dev";
GRANT ALL ON TABLE public.tenants TO "api-client-dev";
GRANT ALL ON TABLE public.tenant_courses TO "api-client-dev";
GRANT ALL ON TABLE public.trails TO "api-client-dev";
GRANT ALL ON TABLE public.trails_courses TO "api-client-dev";
GRANT ALL ON TABLE public.trails_users TO "api-client-dev";

