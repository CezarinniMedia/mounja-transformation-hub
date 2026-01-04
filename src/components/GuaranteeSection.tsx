import { ShieldCheck } from "lucide-react";

export function GuaranteeSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 p-5">
      {/* Background glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col items-center text-center gap-3">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border border-primary/30">
          <ShieldCheck className="w-7 h-7 text-primary" />
        </div>
        
        <h3 className="text-lg font-bold text-foreground leading-tight">
          Garantia Incondicional de 30 Dias
        </h3>
        
        <p className="text-small text-muted-foreground leading-relaxed">
          Você tem 30 dias para testar o Mounja Natural. Se não gostar, se não tiver resultados, 
          ou se simplesmente mudar de ideia... devolvemos 100% do seu dinheiro. 
          Sem perguntas. Sem burocracia. O risco é TODO nosso.
        </p>
        
        <div className="inline-flex items-center gap-2 text-primary font-medium text-small bg-primary/10 px-3 py-1.5 rounded-full">
          <span>✅</span>
          <span>Garantia registrada</span>
        </div>
      </div>
    </div>
  );
}
