-- Re-grant has_role to authenticated (needed by admin server fn middleware)
-- The info leak is minimal (can check if a UUID is an admin)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
