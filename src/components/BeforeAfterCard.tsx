import { cn } from "@/lib/utils";

interface BeforeAfterCardProps {
  name: string;
  age: number;
  result: string;
  beforeImage?: string;
  afterImage?: string;
  className?: string;
}

export function BeforeAfterCard({ 
  name, 
  age, 
  result, 
  beforeImage, 
  afterImage,
  className 
}: BeforeAfterCardProps) {
  return (
    <div className={cn("bg-surface rounded-2xl border border-border overflow-hidden", className)}>
      {/* Images row */}
      <div className="flex">
        {/* Before */}
        <div className="flex-1 relative">
          {beforeImage ? (
            <img 
              src={beforeImage} 
              alt="Antes" 
              className="w-full aspect-[3/4] object-cover"
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-card flex items-center justify-center">
              <span className="text-muted-foreground font-medium">ANTES</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
            <span className="text-small font-semibold text-foreground">Antes</span>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-0.5 bg-primary" />
        
        {/* After */}
        <div className="flex-1 relative">
          {afterImage ? (
            <img 
              src={afterImage} 
              alt="Depois" 
              className="w-full aspect-[3/4] object-cover"
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">DEPOIS</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
            <span className="text-small font-semibold text-primary">Depois</span>
          </div>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-3 text-center bg-card">
        <p className="font-semibold text-foreground">
          {name}, {age} anos
        </p>
        <p className="text-primary font-bold text-lg">
          {result}
        </p>
      </div>
    </div>
  );
}
