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
      script.src = "https://scripts.converteai.net/dfa4d91e-b35a-4522-a5e2-a962ca21e730/players/69588da7bfcaaae23cccf36e/v4/player.js";
      script.async = true;
      document.head.appendChild(script);
      scriptLoaded.current = true;
    }

    // Listen for VTurb progress messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        const currentTime = event.data.currentTime || event.data.time || 0;
        
        // 5:39 = 339 seconds
        if (currentTime >= 339 && !pitchReached.current) {
          pitchReached.current = true;
          onPitchTimeReached?.();
          
          // Track ViewContent event
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'ViewContent', { content_name: 'Pitch Reached' });
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback: reveal CTAs after 6 minutes
    const fallbackTimer = setTimeout(() => {
      if (!pitchReached.current) {
        pitchReached.current = true;
        onPitchTimeReached?.();
      }
    }, 360000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimer);
    };
  }, [onPitchTimeReached]);

  return (
    <div className="relative bg-card border border-border shadow-card p-2 rounded-2xl">
      <div className="w-full relative">
        {/* @ts-ignore - VTurb custom element */}
        <vturb-smartplayer 
          id="vid-69588da7bfcaaae23cccf36e" 
          style={{ display: 'block', margin: '0 auto', width: '100%' }}
        />
      </div>
    </div>
  );
}
