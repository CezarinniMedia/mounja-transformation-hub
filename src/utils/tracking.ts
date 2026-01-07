// Facebook Pixel + UTMify tracking utilities

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    Utmify?: {
      sendEvent: (event: string, params?: Record<string, any>) => void;
    };
  }
}

export const trackEvent = (event: string, params?: Record<string, any>) => {
  // Track with Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
  // Track with UTMify
  if (typeof window !== 'undefined' && window.Utmify?.sendEvent) {
    window.Utmify.sendEvent(event, params);
  }
};

export const trackPageView = () => {
  trackEvent('PageView');
};

export const trackViewContent = (contentName: string) => {
  trackEvent('ViewContent', { content_name: contentName });
};

export const trackInitiateCheckout = () => {
  trackEvent('InitiateCheckout');
};

export const trackPurchase = (value: number = 37.90, currency: string = 'BRL') => {
  trackEvent('Purchase', { value, currency });
};
