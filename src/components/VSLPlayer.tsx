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
      // VTurb can send postMessage payloads as objects OR strings depending on browser/player
      const raw = event.data as unknown;
      const data: unknown = (() => {
        if (typeof raw === "string") {
          try {
            return JSON.parse(raw);
          } catch {
            return raw;
          }
        }
        return raw;
      })();

      const hasCtaShow = (payload: unknown) => {
        if (!payload) return false;

        // string payload
        if (typeof payload === "string") {
          return /ctashow|cta[_\s-]?show/i.test(payload);
        }

        // object payload
        if (typeof payload === "object") {
          const obj = payload as Record<string, any>;
          const eventName = obj.event ?? obj.type ?? obj.action;
          if (typeof eventName === "string" && /ctashow|cta[_\s-]?show/i.test(eventName)) {
            return true;
          }

          // Some implementations nest the event inside smartplayer
          if (obj.smartplayer && typeof obj.smartplayer === "object") {
            const sp = obj.smartplayer as Record<string, any>;
            const spEvent = sp.event ?? sp.type ?? sp.action;
            if (typeof spEvent === "string" && /ctashow|cta[_\s-]?show/i.test(spEvent)) {
              return true;
            }
          }

          // last resort: search inside the payload
          try {
            return /ctashow|cta[_\s-]?show/i.test(JSON.stringify(obj));
          } catch {
            return false;
          }
        }

        return false;
      };

      if (hasCtaShow(data) && !pitchReached.current) {
        pitchReached.current = true;
        onPitchTimeReached?.();

        // Track ViewContent event
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "ViewContent", { content_name: "Pitch Reached" });
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
