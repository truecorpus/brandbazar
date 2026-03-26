
-- Fix overly permissive INSERT policies

DROP POLICY "System can insert profiles" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY "System can insert notifications" ON public.notifications;
CREATE POLICY "Staff can insert notifications" ON public.notifications FOR INSERT WITH CHECK (public.is_staff_or_above(auth.uid()));

DROP POLICY "Anyone can create quotes" ON public.quotes;
CREATE POLICY "Authenticated users can create quotes" ON public.quotes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR customer_id IS NULL);

DROP POLICY "System can insert audit log" ON public.audit_log;
CREATE POLICY "Staff can insert audit log" ON public.audit_log FOR INSERT WITH CHECK (public.is_staff_or_above(auth.uid()));
