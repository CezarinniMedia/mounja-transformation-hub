import { cn } from "@/lib/utils";

interface BeforeAfterCardProps {
  name: string;
  age: number;
  result: string;
  className?: string;
}

export function BeforeAfterCard({ name, age, result, className }: BeforeAfterCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-4 bg-surface rounded-2xl border border-border",
        className
      )}
    >
      {/* Images container */}
      <div className="flex gap-2">
        {/* Before */}
        <div className="flex-1 aspect-[3/4] rounded-xl bg-card border border-border flex items-center justify-center">
          <div className="text-center">
            <span className="text-small text-muted-foreground font-medium">ANTES</span>
          </div>
        </div>
        
        {/* After */}
        <div className="flex-1 aspect-[3/4] rounded-xl bg-gradient-cta/10 border border-primary/30 flex items-center justify-center">
          <div className="text-center">
            <span className="text-small text-primary font-medium">DEPOIS</span>
          </div>
        </div>
      </div>
      
      {/* Info */}
      <div className="text-center">
        <p className="font-semibold text-foreground">{name}, {age} anos</p>
        <p className="text-primary font-bold">{result}</p>
      </div>
    </div>
  );
}
