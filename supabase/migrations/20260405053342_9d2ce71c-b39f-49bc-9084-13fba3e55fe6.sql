
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
DECLARE seq_num INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 9) AS INT)), 0) + 1 INTO seq_num FROM public.orders WHERE order_number LIKE 'BB-' || TO_CHAR(NOW(), 'YYYY') || '-%';
  NEW.order_number := 'BB-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_quote_number()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
DECLARE seq_num INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number FROM 9) AS INT)), 0) + 1 INTO seq_num FROM public.quotes WHERE quote_number LIKE 'QT-' || TO_CHAR(NOW(), 'YYYY') || '-%';
  NEW.quote_number := 'QT-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
DECLARE seq_num INT; prefix TEXT;
BEGIN
  IF NEW.invoice_type = 'tax_invoice' THEN prefix := 'BB-INV';
  ELSIF NEW.invoice_type = 'proforma' THEN prefix := 'BB-PI';
  ELSIF NEW.invoice_type = 'credit_note' THEN prefix := 'BB-CN';
  ELSE prefix := 'BB-INV';
  END IF;
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM LENGTH(prefix || '-' || TO_CHAR(NOW(), 'YYYY') || '-') + 1) AS INT)), 0) + 1
  INTO seq_num FROM public.invoices
  WHERE invoice_number LIKE prefix || '-' || TO_CHAR(NOW(), 'YYYY') || '-%';
  NEW.invoice_number := prefix || '-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$$;
