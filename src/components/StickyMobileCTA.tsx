import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface StickyMobileCTAProps {
  isVisible: boolean;
}

export function StickyMobileCTA({ isVisible }: StickyMobileCTAProps) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay for animation
      setTimeout(() => setShow(true), 100);
    }
  }, [isVisible]);

  const handleClick = () => {
    // Track event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    navigate('/checkout');
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
        "bg-background/95 backdrop-blur-sm border-t-2 border-primary",
        "p-3 safe-bottom",
        "transition-all duration-500",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <button
        onClick={handleClick}
        className="w-full bg-gradient-cta text-primary-foreground font-bold py-4 px-6 rounded-xl shadow-cta animate-pulse-cta"
      >
        QUERO EMAGRECER · R$ 47,00
      </button>
    </div>
  );
}
