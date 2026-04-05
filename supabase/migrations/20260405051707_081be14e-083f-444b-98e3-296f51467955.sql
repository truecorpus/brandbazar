CREATE OR REPLACE FUNCTION public.check_admins_exist()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE role IN ('super_admin', 'admin', 'staff')
    LIMIT 1
  );
$$;