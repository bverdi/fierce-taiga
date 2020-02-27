CREATE TABLE public.tenants
(
  id		integer NOT NULL generated always as identity,
  alias	character varying(50) COLLATE pg_catalog."default" NOT NULL,
  host	character varying(100) COLLATE pg_catalog."default" NOT NULL,
  token	character varying(100) COLLATE pg_catalog."default" NOT NULL,
  
  CONSTRAINT tenants_pkey       PRIMARY KEY (id),
  CONSTRAINT tenants_alias_key 	UNIQUE (alias)
);

CREATE TABLE public.tenant_courses
(
  id		      integer NOT NULL generated always as identity,
  openid      integer NOT NULL,
  fullname	  character varying(100) COLLATE pg_catalog."default" NOT NULL,
  displayname	character varying(100) COLLATE pg_catalog."default" NOT NULL,
  tenant_id   integer NOT NULL, 
  
  CONSTRAINT tenant_courses_pkey            PRIMARY KEY (id),
  CONSTRAINT tenant_courses_id_key 	        UNIQUE (openid),
  CONSTRAINT tenant_courses_tenant_id_fkey	FOREIGN KEY (tenant_id)
    REFERENCES public.tenants (id)           MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE 
);

CREATE TABLE public.trails
(
  id		    integer NOT NULL generated always as identity,
  name	    character varying(50) COLLATE pg_catalog."default" NOT NULL,
  tenant_id integer NOT NULL, 
  
  CONSTRAINT trails_pkey            PRIMARY KEY (id),
  CONSTRAINT trails_name_key 	      UNIQUE (name),
  CONSTRAINT trails_tenant_id_fkey	FOREIGN KEY (tenant_id)
    REFERENCES public.tenants (id)   MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE 
);

CREATE TABLE public.trails_courses
(
  id		      integer NOT NULL generated always as identity,
  course_id   integer NOT NULL, 
  trail_id    integer NOT NULL, 
  
  CONSTRAINT trails_courses_pkey              PRIMARY KEY (id),
  CONSTRAINT trails_courses_course_trail_key 	UNIQUE (course_id, trail_id),
  CONSTRAINT trails_courses_trail_id_fkey	    FOREIGN KEY (trail_id)
    REFERENCES public.trails (id)             MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE 
);

CREATE TABLE public.trails_users
(
  id		    integer NOT NULL generated always as identity,
  user_id   integer NOT NULL, 
  trail_id  integer NOT NULL, 
  
  CONSTRAINT trails_users_pkey            PRIMARY KEY (id),
  CONSTRAINT trails_users_user_trail_key 	UNIQUE (user_id, trail_id),
  CONSTRAINT trails_users_trail_id_fkey	  FOREIGN KEY (trail_id)
    REFERENCES public.trails (id)         MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE 
);