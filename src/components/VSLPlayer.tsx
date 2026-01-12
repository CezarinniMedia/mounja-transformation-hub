import { useEffect, useRef } from "react";

interface VSLPlayerProps {
  onPitchTimeReached?: () => void;
}

export function VSLPlayer({ onPitchTimeReached }: VSLPlayerProps) {
  const scriptLoaded = useRef(false);
  const pitchReached = useRef(false);
  const watchedCtaEl = useRef<HTMLElement | null>(null);
  const visibilityRafId = useRef<number | null>(null);

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

    const isElementVisibleNow = (el: HTMLElement) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      const hasBox = rect.width > 0 && rect.height > 0;
      const isDisplayed = style.display !== "none";
      const isVisible = style.visibility !== "hidden";

      // IMPORTANT: VTurb often animates opacity from 0 → 1.
      // To fire at the exact moment it becomes visible, we use a very small threshold.
      const opacity = Number.parseFloat(style.opacity || "1");
      const hasOpacity = Number.isFinite(opacity) ? opacity > 0.01 : true;

      return isDisplayed && isVisible && hasBox && hasOpacity;
    };

    const getSearchRoots = (playerContainer: HTMLElement) => {
      const roots: Array<ParentNode> = [playerContainer];
      const shadowRoot = (playerContainer as any).shadowRoot as ShadowRoot | null | undefined;
      if (shadowRoot) roots.push(shadowRoot);
      return roots;
    };

    const findVturbCtaElement = (playerContainer: HTMLElement) => {
      const roots = getSearchRoots(playerContainer);

      // VTurb can render CTA in light DOM OR inside the web-component shadow DOM.
      // We search broadly but still scoped to the player container roots.
      const selectors = [
        ".smartplayer-call-action",
        "[class*=\"smartplayer-call-action\"]",
        "[class*=\"call-action\"]",
        "[class*=\"cta\"]",
        "[data-testid*=\"call\" i]",
        "[data-testid*=\"cta\" i]",
      ];

      for (const root of roots) {
        for (const sel of selectors) {
          const el = root.querySelector(sel) as HTMLElement | null;
          if (el) return el;
        }
      }

      return null;
    };

    // Check for VTurb CTA button inside the player container only
    const checkForVturbButton = () => {
      if (pitchReached.current) return false;

      const playerContainer = document.getElementById("vid-695da2ecd57dbf7832670264");
      if (!playerContainer) return false;

      const vturbCta = findVturbCtaElement(playerContainer);
      if (!vturbCta) return false;

      const el = vturbCta as HTMLElement;

      // If we found a (new) CTA element, start a high-frequency watcher so we trigger
      // at the *exact* moment it becomes visible.
      if (watchedCtaEl.current !== el) {
        watchedCtaEl.current = el;

        // Cancel previous watcher loop (if any)
        if (visibilityRafId.current != null) {
          cancelAnimationFrame(visibilityRafId.current);
          visibilityRafId.current = null;
        }

        const tick = () => {
          if (pitchReached.current) return;
          if (isElementVisibleNow(el)) {
            console.log("[VTurb Debug] CTA became visible:", el);
            triggerPitchReached();
            return;
          }
          visibilityRafId.current = requestAnimationFrame(tick);
        };

        // Run once immediately (often same frame the node appears)
        tick();
      } else {
        // CTA element is the same; do a quick visibility check.
        if (isElementVisibleNow(el)) {
          console.log("[VTurb Debug] CTA visible (same el):", el);
          triggerPitchReached();
          return true;
        }
      }

      return false;
    };

    // Use MutationObserver on the player container and (if available) its shadowRoot
    let observer: MutationObserver | null = null;
    let setupTimeoutId: NodeJS.Timeout | null = null;

    const setupObserver = () => {
      const playerContainer = document.getElementById("vid-695da2ecd57dbf7832670264");
      if (!playerContainer) {
        setupTimeoutId = setTimeout(setupObserver, 100);
        return;
      }

      // First check if button is already there
      if (checkForVturbButton()) return;

      const shadowRoot = (playerContainer as any).shadowRoot as ShadowRoot | null | undefined;

      observer = new MutationObserver(() => {
        checkForVturbButton();
      });

      observer.observe(playerContainer, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      // If CTA is inside shadow DOM, we must observe it too.
      if (shadowRoot) {
        observer.observe(shadowRoot, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["style", "class"],
        });
      }
    };

    // Start setup immediately
    setupObserver();

    // Fallback timer - show CTA after 7 minutes if button detection fails
    const fallbackTimer = setTimeout(() => {
      console.log('[VTurb Debug] Fallback timer triggered');
      triggerPitchReached();
    }, 420000); // 7 minutes as absolute fallback

    return () => {
      if (observer) observer.disconnect();
      if (setupTimeoutId) clearTimeout(setupTimeoutId);
      if (visibilityRafId.current != null) cancelAnimationFrame(visibilityRafId.current);
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
