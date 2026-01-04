import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sandraCostaImg from "@/assets/sandra-costa.jpeg";
import { 
  Leaf, 
  Lock, 
  Check, 
  ShieldCheck, 
  Star, 
  CreditCard,
  Eye,
  AlertTriangle
} from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { trackInitiateCheckout } from "@/utils/tracking";

const CHECKOUT_URL = "https://pay.kirvano.com/f1b14723-7021-4dd3-8dbb-3f3fd45ef81b";

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

const faqItems = [
  {
    question: "O pagamento é seguro?",
    answer: "Sim! Usamos a Kirvano, uma das maiores plataformas de pagamento do Brasil, com criptografia bancária de 256 bits.",
  },
  {
    question: "Como vou receber o acesso?",
    answer: "Imediatamente após a confirmação do pagamento, você receberá um email com suas credenciais de acesso à área de membros.",
  },
  {
    question: "E se eu não gostar?",
    answer: "Você tem 30 dias de garantia incondicional. Devolvemos 100% do seu dinheiro sem perguntas.",
  },
];

export default function Checkout() {
  const [viewersCount, setViewersCount] = useState(127);

  useEffect(() => {
    // Randomize viewers count between 89-156
    const interval = setInterval(() => {
      setViewersCount(Math.floor(Math.random() * (156 - 89 + 1)) + 89);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCheckout = () => {
    trackInitiateCheckout();
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-foreground">Mounja Natural</span>
          </Link>
          
          <div className="flex items-center gap-1.5 text-small text-primary">
            <Lock className="w-4 h-4" />
            <span>Checkout Seguro</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-card border-t border-border px-4 py-2">
          <div className="container flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">1</span>
              </div>
              <span className="text-small text-foreground font-medium">Confirmação</span>
            </div>
            <div className="flex-1 h-1 bg-border rounded-full">
              <div className="w-1/2 h-full bg-primary rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">2</span>
              </div>
              <span className="text-small text-muted-foreground">Pagamento</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-6 px-4">
        <div className="container max-w-lg mx-auto space-y-6">
          {/* Order Summary */}
          <section className="bg-card rounded-2xl border-2 border-primary overflow-hidden">
            <div className="bg-primary/10 px-5 py-3 border-b border-primary/30">
              <h2 className="font-bold text-foreground">Resumo do Seu Pedido</h2>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Product */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-surface border border-border flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Método Mounja Natural
                  </h3>
                  <p className="text-small text-muted-foreground">
                    Acesso Completo + Bônus
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-small text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground line-through">De R$ 197,00</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">R$ 47,00</p>
                    <p className="text-small text-muted-foreground">ou 11x de R$ 5,17</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Testimonial */}
          <section className="bg-surface rounded-2xl border border-border p-5">
            <div className="flex items-start gap-3 mb-4">
              <img 
                src={sandraCostaImg} 
                alt="Sandra Costa" 
                className="flex-shrink-0 w-12 h-12 rounded-full object-cover border border-border"
              />
              <div>
                <p className="font-semibold text-foreground">Sandra Costa, 52 anos</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-foreground italic">
              "Gastei mais de R$ 3.000 em nutricionista e academia sem resultado. 
              Com o Mounja Natural gastei R$ 37 e perdi mais peso do que em 2 anos de luta. É surreal!"
            </p>
            <p className="text-primary font-semibold mt-3">Resultado: -18kg em 60 dias</p>
          </section>

          {/* Guarantee */}
          <section className="bg-primary/10 rounded-2xl border border-primary/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-foreground">Sua Compra Está Protegida</h3>
            </div>
            <p className="text-muted-foreground">
              30 dias para testar ou seu dinheiro de volta. Sem perguntas, sem burocracia.
            </p>
          </section>

          {/* Security Badges */}
          <section className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">SSL Seguro</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">Kirvano</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-xs text-muted-foreground">Compra Segura</span>
              </div>
            </div>
            <p className="text-center text-small text-muted-foreground mt-4">
              Ambiente 100% seguro e criptografado
            </p>
          </section>

          {/* Checkout Button */}
          <section>
            <CTAButton onClick={handleCheckout} showSubtext={false}>
              FINALIZAR MINHA COMPRA
            </CTAButton>
            <p className="flex items-center justify-center gap-1.5 text-small text-muted-foreground mt-3 text-center">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">Você será redirecionado para o checkout seguro</span>
            </p>
          </section>

          {/* Urgency */}
          <section className="bg-warning/10 border border-warning/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-warning">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-small">Preço promocional por tempo limitado</span>
            </div>
            
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
              <Eye className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs">
                <span className="text-primary font-semibold">{viewersCount}</span> pessoas vendo agora
              </span>
            </div>
          </section>

          {/* Mini FAQ */}
          <section className="space-y-3">
            <h3 className="font-semibold text-foreground text-center">
              Dúvidas Frequentes
            </h3>
            {faqItems.map((item, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-4">
                <p className="font-medium text-foreground mb-2">{item.question}</p>
                <p className="text-small text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
