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

    // Listen for VTurb smartplayer events
    const handleMessage = (event: MessageEvent) => {
      // VTurb sends messages when CTA button appears
      if (event.data && typeof event.data === 'object') {
        // Check for VTurb CTA show event
        if (
          event.data.event === 'ctashow' ||
          event.data.type === 'ctashow' ||
          event.data.action === 'ctashow' ||
          (event.data.smartplayer && event.data.event === 'ctashow')
        ) {
          if (!pitchReached.current) {
            pitchReached.current = true;
            onPitchTimeReached?.();
            
            // Track ViewContent event
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'ViewContent', { content_name: 'Pitch Reached' });
            }
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // NO fallback timer - only show when VTurb button appears
    // Remove fallback to ensure buttons only appear with VTurb CTA

    return () => {
      window.removeEventListener('message', handleMessage);
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
