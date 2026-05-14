export function gtagEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

export const EVENT_QUOTE_SUBMIT = 'quote_submit';
export const EVENT_CONTACT_SUBMIT = 'contact_form_submit';
export const EVENT_WHATSAPP_CLICK = 'whatsapp_click';
export const EVENT_PRODUCT_QUOTE_CLICK = 'product_quote_click';
export const EVENT_CTA_CLICK = 'cta_click';
export const EVENT_DRAWER_OPEN = 'quote_drawer_open';
