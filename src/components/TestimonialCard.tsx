import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  age: number;
  city: string;
  text: string;
  className?: string;
}

export function TestimonialCard({ name, age, city, text, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-5 bg-surface rounded-2xl border border-border",
        "min-w-[300px] max-w-[320px] snap-start",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Avatar placeholder */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-card flex items-center justify-center border border-border">
          <span className="text-lg font-semibold text-primary">
            {name.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">
            {name}, {age} anos
          </p>
          <p className="text-small text-muted-foreground truncate">{city}</p>
        </div>
      </div>
      
      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-warning text-warning" />
        ))}
      </div>
      
      {/* Text */}
      <p className="text-body text-foreground leading-relaxed">
        "{text}"
      </p>
      
      {/* Verified badge */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-border">
        <CheckCircle2 className="w-4 h-4 text-primary" />
        <span className="text-small text-primary font-medium">Resultado Verificado</span>
      </div>
    </div>
  );
}
