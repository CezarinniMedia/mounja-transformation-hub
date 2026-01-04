import { Lock, CreditCard, Smartphone, ShieldCheck } from "lucide-react";

export function SecurityBadges() {
  const badges = [
    { icon: Lock, label: "Compra Segura" },
    { icon: CreditCard, label: "Parcelamento" },
    { icon: Smartphone, label: "Acesso Imediato" },
    { icon: ShieldCheck, label: "Garantia 30 dias" },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="grid grid-cols-4 gap-2">
        {badges.map((badge, index) => (
          <div key={index} className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-border">
              <badge.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground leading-tight">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
