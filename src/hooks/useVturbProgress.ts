import { useEffect, useMemo, useState } from "react";

export const DEFAULT_PITCH_TIME_SECONDS = 339; // 5:39

type UseVturbProgressOptions = {
  /** Time (in seconds) when the offer should be considered unlocked */
  pitchTimeSeconds?: number;
  /** Advance unlocking by N seconds (e.g. 20 means unlock 20s earlier) */
  earlyOffsetSeconds?: number;
};

export function useVturbProgress(options: UseVturbProgressOptions = {}) {
  const pitchTimeSeconds = options.pitchTimeSeconds ?? DEFAULT_PITCH_TIME_SECONDS;
  const earlyOffsetSeconds = options.earlyOffsetSeconds ?? 0;

  const unlockTimeSeconds = useMemo(
    () => Math.max(0, pitchTimeSeconds - earlyOffsetSeconds),
    [pitchTimeSeconds, earlyOffsetSeconds]
  );

  const [currentTime, setCurrentTime] = useState(0);
  const [pitchReached, setPitchReached] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;

      // VTurb players may post different keys depending on version
      const time = Number((event.data as any).currentTime ?? (event.data as any).time ?? 0);
      if (!Number.isFinite(time)) return;

      setCurrentTime(time);
      if (time >= unlockTimeSeconds) setPitchReached(true);
    };

    window.addEventListener("message", handleMessage);

    // Fallback after 6 minutes (keeps behavior consistent if the player stops posting messages)
    const fallbackTimer = setTimeout(() => {
      setPitchReached(true);
    }, 360000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallbackTimer);
    };
  }, [unlockTimeSeconds]);

  return { currentTime, pitchReached, unlockTimeSeconds };
}

