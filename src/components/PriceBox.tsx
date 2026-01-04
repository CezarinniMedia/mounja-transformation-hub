import { Check } from "lucide-react";

interface PriceBoxProps {
  showFullList?: boolean;
}

export function PriceBox({ showFullList = true }: PriceBoxProps) {
  const benefits = [
    "Receita completa passo a passo em vídeo",
    "Protocolo de 21 dias para resultados máximos",
    "Guia de ingredientes e onde comprar",
    "Acesso ao app exclusivo",
    "Suporte via WhatsApp por 30 dias",
    "BÔNUS: Protocolo anti-flacidez",
    "BÔNUS: Chá detox para manchas",
    "BÔNUS: Receitas de sucos emagrecedores",
  ];

  const displayBenefits = showFullList ? benefits : benefits.slice(0, 5);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-secondary/20 border-2 border-primary p-6">
      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
      
      <div className="relative space-y-5">
        <div className="text-center">
          <h3 className="text-lg font-bold text-foreground mb-3">
            ACESSO COMPLETO AO MÉTODO MOUNJA NATURAL
          </h3>
          
          <div className="space-y-1">
            <p className="text-muted-foreground line-through">
              De R$ 197,00
            </p>
            <p className="text-3xl font-bold text-foreground">
              Por apenas <span className="text-primary">R$ 37,90</span>
            </p>
            <p className="text-small text-muted-foreground">
              ou 6x de R$ 7,32 sem juros
            </p>
          </div>
        </div>
        
        <div className="space-y-2.5">
          {displayBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
