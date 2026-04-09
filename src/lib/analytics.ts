type DeliveryProvider = 'uber-eats' | 'pickme-food';

type DeliveryPlacement = 'hero' | 'sticky-mobile';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackDeliveryClick(provider: DeliveryProvider, placement: DeliveryPlacement) {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    event: 'delivery_cta_click',
    provider,
    placement,
    timestamp: new Date().toISOString()
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (process.env.NODE_ENV !== 'production') {
    // Helpful during local QA without requiring analytics tooling.
    // eslint-disable-next-line no-console
    console.info('[analytics]', payload);
  }
}
