declare function gtag(...args: unknown[]): void;

export function trackWhatsAppClick(source: string, cakeName?: string): void {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      event_category: 'conversion',
      event_label: source,
      cake_name: cakeName ?? 'none'
    });
  }
}

export function trackFormSubmit(formName: string): void {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', { form_name: formName });
  }
}

export function trackDeliveryClick(platform: 'uber_eats' | 'pickme'): void {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'delivery_link_click', { platform });
  }
}
