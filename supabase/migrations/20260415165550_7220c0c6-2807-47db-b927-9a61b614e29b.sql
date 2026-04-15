
-- 1. Fix coupon data exposure: create a restricted view
CREATE OR REPLACE VIEW public.public_coupons
WITH (security_invoker = true)
AS
SELECT
  id,
  code,
  description,
  discount_type,
  discount_value,
  min_order_value,
  valid_from,
  valid_until,
  is_active
FROM public.coupons
WHERE is_active = true
  AND (valid_until IS NULL OR valid_until > now());

-- Drop the overly permissive SELECT policy for authenticated users
DROP POLICY IF EXISTS "Authenticated users can view active coupons" ON public.coupons;

-- 2. Fix customization sessions: require authentication
DROP POLICY IF EXISTS "Users can manage own sessions" ON public.customization_sessions;

CREATE POLICY "Users can manage own sessions"
ON public.customization_sessions
FOR ALL
USING (auth.uid() IS NOT NULL AND customer_user_id = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND customer_user_id = auth.uid());
