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
      
      console.log('[VTurb Debug] Pitch reached triggered!');
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

    // Check for VTurb CTA button inside the player container only
    const checkForVturbButton = () => {
      if (pitchReached.current) return false;
      
      const playerContainer = document.getElementById('vid-695da2ecd57dbf7832670264');
      if (!playerContainer) return false;
      
      // Look specifically for VTurb's CTA button class inside the player
      const vturbCta = playerContainer.querySelector('.smartplayer-call-action, [class*="smartplayer-call-action"]');
      
      if (vturbCta) {
        const style = window.getComputedStyle(vturbCta);
        if (style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0) {
          console.log('[VTurb Debug] CTA button detected:', vturbCta);
          triggerPitchReached();
          return true;
        }
      }
      
      return false;
    };

    // Use MutationObserver ONLY on the player container once it exists
    let observer: MutationObserver | null = null;
    let setupTimeoutId: NodeJS.Timeout | null = null;
    
    const setupObserver = () => {
      const playerContainer = document.getElementById('vid-695da2ecd57dbf7832670264');
      if (!playerContainer) {
        // Player not ready yet, retry
        setupTimeoutId = setTimeout(setupObserver, 500);
        return;
      }
      
      // First check if button is already there
      if (checkForVturbButton()) return;
      
      observer = new MutationObserver(() => {
        checkForVturbButton();
      });
      
      observer.observe(playerContainer, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    };

    // Start setup after a small delay to ensure player starts loading
    setupTimeoutId = setTimeout(setupObserver, 1000);

    // Fallback timer - show CTA after 7 minutes if button detection fails
    const fallbackTimer = setTimeout(() => {
      console.log('[VTurb Debug] Fallback timer triggered');
      triggerPitchReached();
    }, 420000); // 7 minutes as absolute fallback

    return () => {
      if (observer) observer.disconnect();
      if (setupTimeoutId) clearTimeout(setupTimeoutId);
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
