import { useEffect, useState } from "react";

const PITCH_TIME = 339; // 5:39 in seconds

export function useVturbProgress() {
  const [currentTime, setCurrentTime] = useState(0);
  const [pitchReached, setPitchReached] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        const time = event.data.currentTime || event.data.time || 0;
        setCurrentTime(time);
        
        if (time >= PITCH_TIME && !pitchReached) {
          setPitchReached(true);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback after 6 minutes
    const fallbackTimer = setTimeout(() => {
      if (!pitchReached) {
        setPitchReached(true);
      }
    }, 360000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimer);
    };
  }, [pitchReached]);

  return { currentTime, pitchReached };
}
