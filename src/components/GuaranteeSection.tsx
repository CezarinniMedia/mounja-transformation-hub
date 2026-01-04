import { ShieldCheck } from "lucide-react";

export function GuaranteeSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 p-6">
      {/* Background glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col items-center text-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-xl font-bold text-foreground">
          Garantia Incondicional de 30 Dias
        </h3>
        
        <p className="text-muted-foreground leading-relaxed max-w-md">
          Você tem 30 dias para testar o Mounja Natural. Se não gostar, se não tiver resultados, 
          ou se simplesmente mudar de ideia... devolvemos 100% do seu dinheiro. Sem perguntas. 
          Sem burocracia. Sem letra miúda. O risco é TODO nosso. Você não tem NADA a perder.
        </p>
        
        <div className="flex items-center gap-2 text-primary font-medium">
          <span>✅</span>
          <span>Garantia registrada e assegurada</span>
        </div>
      </div>
    </div>
  );
}
