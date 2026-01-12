import { useEffect, useRef } from "react";

interface VSLPlayerProps {
  onPitchTimeReached?: () => void;
}

export function VSLPlayer({ onPitchTimeReached }: VSLPlayerProps) {
  const scriptLoaded = useRef(false);
  const pitchReached = useRef(false);

  useEffect(() => {
    // Load VTurb script
    if (!scriptLoaded.current) {
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/dfa4d91e-b35a-4522-a5e2-a962ca21e730/players/695da2ecd57dbf7832670264/v4/player.js";
      script.async = true;
      document.head.appendChild(script);
      scriptLoaded.current = true;
    }

    // Function to trigger pitch reached
    const triggerPitchReached = () => {
      if (pitchReached.current) return;
      pitchReached.current = true;
      
      onPitchTimeReached?.();

      // Track with Facebook Pixel
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "ViewContent", { content_name: "Pitch Reached" });
      }
      // Track with UTMify
      if (typeof window !== "undefined" && (window as any).Utmify?.sendEvent) {
        (window as any).Utmify.sendEvent("ViewContent", { content_name: "Pitch Reached" });
      }
    };

    // Use MutationObserver to detect when VTurb button appears in the DOM
    // This ensures perfect sync with the actual button visibility
    const observer = new MutationObserver((mutations) => {
      if (pitchReached.current) return;
      
      // Look for VTurb CTA button elements - check multiple possible selectors
      const vturbButton = document.querySelector('[class*="smartplayer-call-action"], [class*="cta-button"], .smartplayer-cta, [data-cta]');
      
      // Also check for elements inside the vturb player that indicate CTA
      const playerContainer = document.getElementById('vid-695da2ecd57dbf7832670264');
      if (playerContainer) {
        const ctaElements = playerContainer.querySelectorAll('a, button');
        for (const el of ctaElements) {
          const style = window.getComputedStyle(el);
          // Check if element is visible and likely a CTA
          if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
            const text = el.textContent?.toLowerCase() || '';
            const href = (el as HTMLAnchorElement).href?.toLowerCase() || '';
            if (text.includes('comprar') || text.includes('quero') || text.includes('garantir') || 
                href.includes('checkout') || href.includes('pay') || href.includes('compra')) {
              console.log('[VTurb Debug] CTA button detected inside player:', el);
              triggerPitchReached();
              return;
            }
          }
        }
      }
      
      if (vturbButton) {
        const style = window.getComputedStyle(vturbButton);
        if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
          console.log('[VTurb Debug] CTA button detected via selector:', vturbButton);
          triggerPitchReached();
        }
      }
    });

    // Start observing the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Fallback timer - show CTA after 7 minutes if button detection fails
    const fallbackTimer = setTimeout(() => {
      triggerPitchReached();
    }, 420000); // 7 minutes as absolute fallback

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [onPitchTimeReached]);

  return (
    <div className="relative bg-card border border-border shadow-card p-2 rounded-2xl">
      <div className="w-full relative">
        {/* @ts-ignore - VTurb custom element */}
        <vturb-smartplayer 
          id="vid-695da2ecd57dbf7832670264" 
          style={{ display: 'block', margin: '0 auto', width: '100%' }}
        />
      </div>
    </div>
  );
}
