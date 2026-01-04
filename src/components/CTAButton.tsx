import { ButtonHTMLAttributes, forwardRef } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  showSubtext?: boolean;
  subtextContent?: string;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = "primary", showSubtext = true, subtextContent, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <button
          ref={ref}
          className={cn(
            "w-full relative overflow-hidden rounded-xl font-bold text-cta transition-all duration-300",
            "min-h-[64px] px-6 py-4",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            variant === "primary" && [
              "bg-gradient-cta text-primary-foreground",
              "shadow-cta hover:shadow-glow",
              "animate-pulse-cta"
            ],
            variant === "secondary" && [
              "bg-card border-2 border-primary text-primary",
              "hover:bg-primary hover:text-primary-foreground"
            ],
            className
          )}
          {...props}
        >
          {children}
        </button>
        
        {showSubtext && (
          <p className="flex items-center justify-center gap-1.5 mt-3 text-small text-muted-foreground text-center">
            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="whitespace-nowrap">{subtextContent || "Compra 100% Segura • Garantia 30 Dias"}</span>
          </p>
        )}
      </div>
    );
  }
);

CTAButton.displayName = "CTAButton";
