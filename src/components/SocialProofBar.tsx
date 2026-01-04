import { Users, Star, ThumbsUp } from "lucide-react";

export function SocialProofBar() {
  const stats = [
    { icon: Users, value: "+47.000", label: "Mulheres Transformadas" },
    { icon: Star, value: "4.9★", label: "Avaliação Média" },
    { icon: ThumbsUp, value: "97%", label: "Aprovação" },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <span className="text-xl md:text-2xl font-bold text-primary">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground mt-1 leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
