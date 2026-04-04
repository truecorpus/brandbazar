
-- Add personalization fields to customization_sessions
ALTER TABLE public.customization_sessions
ADD COLUMN IF NOT EXISTS personalization_fields jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS bulk_data jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS total_quantity integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS identical_quantity integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS personalized_quantity integer DEFAULT 0;

-- Add bulk personalization data to order_items
ALTER TABLE public.order_items
ADD COLUMN IF NOT EXISTS bulk_personalization_data jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS personalization_cost_per_unit numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_personalized boolean DEFAULT false;
