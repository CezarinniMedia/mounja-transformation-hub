import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  CheckCircle2,
  Smartphone,
  Lightbulb,
  Clock,
  Heart
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { trackPurchase } from "@/utils/tracking";

export default function Obrigado() {
  useEffect(() => {
    // Track purchase event
    trackPurchase(37.90, 'BRL');
  }, []);

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
            <CheckCircle2 className="w-4 h-4" />
            <span>Compra Confirmada</span>
          </div>
        </div>
      </header>

      <main className="py-8 px-4">
        <div className="container max-w-lg mx-auto space-y-8">
          {/* Success Message */}
          <section className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-fade-in-up">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                PARABÉNS! Sua compra foi aprovada!
              </h1>
              <p className="text-muted-foreground">
                Bem-vinda à comunidade Mounja Natural
              </p>
            </div>
          </section>

          {/* Next Steps */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground text-center">
              O que fazer agora:
            </h2>

            <div className="space-y-4">
              {/* Acesso à área de membros */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      📱 Crie seu cadastro
                    </h3>
                    <p className="text-small text-muted-foreground mb-3">
                      Acesse a área de membros e crie sua conta
                    </p>
                    <a href="https://mounjanatural.com.br/app/auth" className="block w-full bg-gradient-cta text-primary-foreground font-semibold py-3 px-4 rounded-xl text-center">
                      CRIAR MEU CADASTRO
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground text-center">
              Enquanto prepara tudo, aqui vão algumas dicas:
            </h2>

            <div className="grid gap-3">
              {[
                {
                  icon: Lightbulb,
                  title: "Prepare os ingredientes",
                  description: "Veja a lista no material e compre tudo que precisa no mercado mais próximo.",
                },
                {
                  icon: Clock,
                  title: "Reserve 5 minutos por dia",
                  description: "É só o tempo que você vai precisar para preparar sua bebida.",
                },
                {
                  icon: Heart,
                  title: "Tenha paciência",
                  description: "Os primeiros resultados aparecem entre 7-14 dias. Confie no processo!",
                },
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-surface rounded-xl border border-border p-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <tip.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{tip.title}</h3>
                    <p className="text-small text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Support */}
          <section className="bg-card rounded-2xl border border-border p-5 text-center">
            <h3 className="font-semibold text-foreground mb-3">
              Dúvidas? Estamos aqui!
            </h3>
            <div className="text-muted-foreground">
              <p>📧 contato@mounjanatural.com.br</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
