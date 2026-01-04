// Facebook Pixel tracking utilities

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const trackEvent = (event: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
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
