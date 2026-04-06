
-- 1. Fix quotes INSERT policy: require authentication
DROP POLICY IF EXISTS "Authenticated users can create quotes" ON public.quotes;

CREATE POLICY "Authenticated users can create quotes"
ON public.quotes
FOR INSERT
TO authenticated
WITH CHECK (
  (customer_id = auth.uid()) OR (customer_id IS NULL)
);

-- 2. Fix reviews: extend trigger to INSERT + UPDATE
DROP TRIGGER IF EXISTS protect_review_admin_fields_trigger ON public.reviews;

CREATE TRIGGER protect_review_admin_fields_trigger
BEFORE INSERT OR UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.protect_review_admin_fields();

-- 3. Extend order defaults trigger to cover UPDATE too
DROP TRIGGER IF EXISTS enforce_order_defaults_trigger ON public.orders;

CREATE TRIGGER enforce_order_defaults_trigger
BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.enforce_order_defaults();

-- 4. Extend order item pricing trigger to cover UPDATE too
DROP TRIGGER IF EXISTS enforce_order_item_pricing_trigger ON public.order_items;

CREATE TRIGGER enforce_order_item_pricing_trigger
BEFORE INSERT OR UPDATE ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.enforce_order_item_pricing();

-- 5. Add storage policies for design-uploads: UPDATE and DELETE for users
CREATE POLICY "Users can update own design uploads"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'design-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own design uploads"
ON storage.objects
FOR DELETE
USING (bucket_id = 'design-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
