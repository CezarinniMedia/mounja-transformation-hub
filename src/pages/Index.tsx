import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VSLPlayer } from "@/components/VSLPlayer";
import { SocialProofBar } from "@/components/SocialProofBar";
import { PriceBox } from "@/components/PriceBox";
import { CTAButton } from "@/components/CTAButton";
import { SecurityBadges } from "@/components/SecurityBadges";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { trackInitiateCheckout, trackViewContent } from "@/utils/tracking";
import { 
  AlertTriangle, 
  Play, 
  GraduationCap, 
  Medal, 
  BookOpen, 
  Users,
  Beaker,
  Coffee,
  Sparkles,
  Check,
  X,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

import testimonial1 from "@/assets/testimonial-1.jpeg";
import testimonial2 from "@/assets/testimonial-2.jpeg";
import testimonial3 from "@/assets/testimonial-3.jpeg";
import testimonial4 from "@/assets/testimonial-4.jpeg";
import testimonial5 from "@/assets/testimonial-5.jpeg";
import testimonial6 from "@/assets/testimonial-6.jpeg";

import alessandraPhoto from "@/assets/alessandra-silva.jpeg";

import renataBefore from "@/assets/before-after/renata-before.jpeg";
import renataAfter from "@/assets/before-after/renata-after.jpeg";
import danielaBefore from "@/assets/before-after/daniela-before.jpeg";
import danielaAfter from "@/assets/before-after/daniela-after.jpeg";
import patriciaBefore from "@/assets/before-after/patricia-before.jpeg";
import patriciaAfter from "@/assets/before-after/patricia-after.jpeg";
import elianeBefore from "@/assets/before-after/eliane-before.jpeg";
import elianeAfter from "@/assets/before-after/eliane-after.jpeg";

const testimonials = [
  {
    name: "Márcia Oliveira",
    age: 47,
    city: "São Paulo, SP",
    text: "Perdi 14kg em 6 semanas! Meu marido não acredita na transformação. Voltei a usar roupas que estavam guardadas há 5 anos. Obrigada, Alessandra!",
    image: testimonial1,
  },
  {
    name: "Sandra Costa",
    age: 52,
    city: "Rio de Janeiro, RJ",
    text: "Gastei mais de R$ 3.000 em nutricionista e academia sem resultado. Com o Mounja Natural gastei R$ 37 e perdi mais peso do que em 2 anos de luta. É surreal!",
    image: testimonial2,
  },
  {
    name: "Ana Paula Ferreira",
    age: 41,
    city: "Belo Horizonte, MG",
    text: "Minha médica perguntou o que eu estava fazendo porque meus exames melhoraram muito. Colesterol e glicose normalizaram junto com a perda de peso!",
    image: testimonial3,
  },
  {
    name: "Luciana Mendes",
    age: 38,
    city: "Curitiba, PR",
    text: "Eu tinha vergonha de sair de casa. Hoje posto foto de biquíni! Perdi 11kg em 1 mês e meio. Minhas amigas estão morrendo de inveja 😂",
    image: testimonial4,
  },
  {
    name: "Fátima Rodrigues",
    age: 55,
    city: "Salvador, BA",
    text: "Com 55 anos eu achava que não tinha mais jeito. Estava errada. O método funciona em qualquer idade! Perdi 9kg e minha disposição voltou.",
    image: testimonial5,
  },
  {
    name: "Cristiane Lima",
    age: 44,
    city: "Brasília, DF",
    text: "Meu marido voltou a me olhar diferente. Ele não fala, mas eu sinto. E a esposa do meu pastor que vivia se exibindo? Agora EU sou mais magra que ela!",
    image: testimonial6,
  },
];

const beforeAfter = [
  { name: "Renata", age: 43, result: "-12kg em 45 dias", beforeImage: renataBefore, afterImage: renataAfter },
  { name: "Daniela", age: 51, result: "-17kg em 60 dias", beforeImage: danielaBefore, afterImage: danielaAfter },
  { name: "Patrícia", age: 39, result: "-9kg em 30 dias", beforeImage: patriciaBefore, afterImage: patriciaAfter },
  { name: "Eliane", age: 48, result: "-14kg em 50 dias", beforeImage: elianeBefore, afterImage: elianeAfter },
];

const faqItems = [
  {
    question: "O Mounja Natural funciona mesmo?",
    answer: "Sim! Mais de 47.000 mulheres já comprovaram os resultados. O método é baseado em estudos de Harvard sobre a boldina e sua capacidade de impedir a absorção de gordura. Além disso, você tem 30 dias de garantia — se não funcionar, devolvemos seu dinheiro.",
  },
  {
    question: "Em quanto tempo vou ver resultados?",
    answer: "A maioria das mulheres reporta resultados visíveis entre 7 e 14 dias. Resultados mais expressivos (10kg+) geralmente aparecem após 30-45 dias de uso consistente.",
  },
  {
    question: "Tem alguma contraindicação?",
    answer: "O Mounja Natural é 100% natural e seguro para a maioria das pessoas. Porém, gestantes, lactantes e pessoas com condições médicas específicas devem consultar um médico antes de iniciar.",
  },
  {
    question: "Preciso fazer dieta ou exercício?",
    answer: "Não! O grande diferencial do método é que ele funciona sem dietas restritivas e sem academia. A bebida age impedindo a absorção de gordura, então você pode comer normalmente.",
  },
  {
    question: "Como é feita a entrega?",
    answer: "O acesso é 100% digital e imediato. Assim que o pagamento for confirmado, você recebe no seu email o acesso à área de membros com todos os vídeos, receitas e bônus.",
  },
  {
    question: "O pagamento é seguro?",
    answer: "Totalmente! Usamos a Kirvano, uma das maiores plataformas de pagamento do Brasil, com a mesma tecnologia de segurança dos grandes bancos. Seus dados estão 100% protegidos.",
  },
  {
    question: "E se não funcionar para mim?",
    answer: "Você tem 30 dias de garantia incondicional. Se por qualquer motivo você não gostar ou não tiver resultados, basta enviar um email e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.",
  },
  {
    question: "Posso parcelar?",
    answer: "Sim! Você pode parcelar em até 11x de R$ 5,17 sem juros no cartão de crédito, ou pagar à vista via PIX com desconto.",
  },
];

const comparisonData = [
  { criteria: "Preço mensal", mounjaro: "R$ 2.000+", natural: "R$ 47,00 (único)" },
  { criteria: "Aplicação", mounjaro: "Injeção semanal", natural: "Bebida natural" },
  { criteria: "Efeitos colaterais", mounjaro: "Náusea, diarreia", natural: "Nenhum" },
  { criteria: "Receita médica", mounjaro: "Obrigatória", natural: "Não precisa" },
  { criteria: "Disponibilidade", mounjaro: "Escassa", natural: "Imediata" },
  { criteria: "Ingredientes", mounjaro: "Sintéticos", natural: "100% naturais" },
];

export default function Index() {
  const navigate = useNavigate();
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    // Track ViewContent after 30 seconds
    const timer = setTimeout(() => {
      trackViewContent('VSL Page - 30s');
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handlePitchTimeReached = () => {
    setCtaVisible(true);
  };

  const handleCTAClick = () => {
    trackInitiateCheckout();
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main content with header offset */}
      <main className="pt-14">
        {/* Hero + VSL Section */}
        <section className="py-6 px-4">
          <div className="container max-w-lg mx-auto space-y-5">
            {/* Live badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/20 border border-destructive/40 rounded-full">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse-live" />
                <span className="text-small font-medium text-destructive">
                  AO VIVO • REVELAÇÃO EXCLUSIVA
                </span>
              </div>
            </div>

            {/* Pre-headline */}
            <p className="text-center text-small text-muted-foreground px-2">
              Para mulheres que já tentaram de tudo e estão cansadas de gastar fortunas sem resultado
            </p>

            {/* Headline */}
            <h1 className="text-hero-sm md:text-hero text-center text-foreground leading-tight px-2">
              A Bebida de R$ 6 Que Faz o Mesmo Que a{" "}
              <span className="text-primary">Caneta de R$ 2.000</span> de Emagrecimento
            </h1>

            {/* Sub-headline */}
            <p className="text-center text-subhero text-muted-foreground px-4">
              O segredo que a indústria farmacêutica não quer que você descubra
            </p>

            {/* VSL Player */}
            <VSLPlayer onPitchTimeReached={handlePitchTimeReached} />

            {/* Anchor text */}
            <div className="flex items-center justify-center gap-2 text-small text-muted-foreground">
              <Play className="w-4 h-4 flex-shrink-0" />
              <span>Assista até o final</span>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="py-4 px-4">
          <div className="container max-w-lg mx-auto">
            <SocialProofBar />
          </div>
        </section>

        {/* CTA Section - Hidden until pitch time */}
        <section 
          className={cn(
            "py-6 px-4",
            !ctaVisible && "hidden"
          )}
        >
          <div className="container max-w-lg mx-auto space-y-5">
            {/* Urgency badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-small font-semibold">OFERTA LIMITADA</span>
              </div>
            </div>

            {/* Price Box */}
            <PriceBox />

            {/* CTA Button */}
            <CTAButton onClick={handleCTAClick}>
              QUERO EMAGRECER AGORA
            </CTAButton>

            {/* Security Badges */}
            <SecurityBadges />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-8 px-4">
          <div className="container max-w-lg mx-auto space-y-4">
            <h2 className="text-xl font-bold text-center text-foreground">
              Veja o Que Estão Dizendo:
            </h2>

            {/* Swipe hint */}
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <span className="text-small">Arraste para ver mais</span>
              <span className="text-primary animate-pulse">→</span>
            </div>

            {/* Horizontal scroll carousel */}
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-4 snap-x-mandatory pb-4">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-8 px-4 bg-card">
          <div className="container max-w-lg mx-auto space-y-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Transformações Reais
              </h2>
              <p className="text-small text-muted-foreground">
                Mulheres que seguiram o método
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {beforeAfter.map((item, index) => (
                <BeforeAfterCard key={index} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="py-8 px-4">
          <div className="container max-w-lg mx-auto space-y-6">
            {/* Doctor info */}
            <div className="flex flex-col items-center text-center gap-4">
              {/* Avatar with photo */}
              <div className="w-24 h-24 rounded-full border-2 border-primary/30 overflow-hidden">
                <img 
                  src={alessandraPhoto} 
                  alt="Dra. Alessandra Silva"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Dra. Alessandra Silva
                </h3>
                <p className="text-muted-foreground">
                  Criadora do Método Mounja Natural
                </p>
              </div>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: GraduationCap, text: "Mestre e Doutora pela PUC" },
                { icon: Medal, text: "Diretora do Comitê Olímpico" },
                { icon: BookOpen, text: "25+ anos de experiência" },
                { icon: Users, text: "47.000+ mulheres transformadas" },
              ].map((cred, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-surface rounded-xl border border-border">
                  <cred.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-small text-foreground">{cred.text}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="relative bg-primary/10 border border-primary/30 rounded-2xl p-5">
              <span className="absolute -top-3 left-4 text-4xl text-primary">"</span>
              <p className="text-foreground italic pt-2">
                Depois de ver tantas mulheres sofrendo e gastando fortunas sem resultado, 
                eu não podia mais guardar esse segredo. A indústria lucra com o seu sofrimento. 
                Eu lucro com a sua transformação.
              </p>
              <span className="absolute -bottom-3 right-4 text-4xl text-primary">"</span>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-8 px-4 bg-card">
          <div className="container max-w-lg mx-auto space-y-6">
            <h2 className="text-xl font-bold text-center text-foreground">
              Como o Método Funciona
            </h2>

            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-border" />

              {[
                {
                  icon: Beaker,
                  number: "01",
                  title: "Prepare a Bebida",
                  description: "Com ingredientes simples que custam menos de R$ 6, você prepara a bebida em menos de 5 minutos. Até uma criança de 12 anos consegue fazer.",
                },
                {
                  icon: Coffee,
                  number: "02",
                  title: "Tome 3x Por Semana",
                  description: "Uma xícara pela manhã, 3 vezes por semana. A boldina potencializada vai destruir a gordura antes do seu corpo absorver.",
                },
                {
                  icon: Sparkles,
                  number: "03",
                  title: "Veja os Resultados",
                  description: "Em 7 a 14 dias você já começa a ver a diferença. Em 30 dias, suas roupas antigas vão servir de novo.",
                },
              ].map((step, index) => (
                <div key={index} className="relative flex gap-4 pl-2">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-small font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1 bg-surface rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-small text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-8 px-4">
          <div className="container max-w-lg mx-auto space-y-5">
            <h2 className="text-xl font-bold text-center text-foreground">
              Por Que Escolher o Mounja Natural?
            </h2>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-surface border-b border-border">
                <div className="p-3 text-center">
                  <span className="text-small font-medium text-muted-foreground">Critério</span>
                </div>
                <div className="p-3 text-center border-x border-border">
                  <span className="text-small font-medium text-muted-foreground">Mounjaro</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-small font-medium text-primary">Mounja Natural</span>
                </div>
              </div>

              {/* Rows */}
              {comparisonData.map((row, index) => (
                <div key={index} className={cn("grid grid-cols-3", index !== comparisonData.length - 1 && "border-b border-border")}>
                  <div className="p-3 flex items-center">
                    <span className="text-small text-foreground">{row.criteria}</span>
                  </div>
                  <div className="p-3 flex items-center justify-center border-x border-border bg-destructive/5">
                    <div className="flex items-center gap-1.5">
                      <X className="w-4 h-4 text-destructive" />
                      <span className="text-small text-muted-foreground">{row.mounjaro}</span>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-center bg-primary/5">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-small text-primary font-medium">{row.natural}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 px-4 bg-card">
          <div className="container max-w-lg mx-auto space-y-5">
            <h2 className="text-xl font-bold text-center text-foreground">
              Perguntas Frequentes
            </h2>

            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-8 px-4">
          <div className="container max-w-lg mx-auto">
            <GuaranteeSection />
          </div>
        </section>

        {/* Final CTA Section - Hidden until pitch time */}
        <section 
          className={cn(
            "py-8 px-4",
            !ctaVisible && "hidden"
          )}
        >
          <div className="container max-w-lg mx-auto space-y-5">
            {/* Recap */}
            <div className="bg-gradient-to-br from-primary/20 to-secondary/10 rounded-2xl border border-primary/30 p-5">
              <p className="font-bold text-lg text-foreground mb-4 text-center">
                Você vai receber:
              </p>
              <ul className="space-y-2 mb-5">
                {[
                  "Método completo em vídeo",
                  "Protocolo de 21 dias",
                  "App exclusivo",
                  "Suporte por 30 dias",
                  "3 bônus especiais",
                  "Garantia de 30 dias",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center py-3 bg-primary/10 rounded-xl">
                <p className="text-small text-muted-foreground">Tudo isso por apenas</p>
                <p className="text-2xl font-bold text-primary">R$ 47,00</p>
              </div>
            </div>

            {/* Urgency */}
            <div className="flex items-center justify-center gap-2 text-warning">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="text-small font-medium">Oferta por tempo limitado</span>
            </div>

            {/* Final CTA */}
            <CTAButton onClick={handleCTAClick}>
              QUERO COMEÇAR AGORA
            </CTAButton>

            <p className="text-center text-small text-muted-foreground">
              🔒 Compra segura · Acesso imediato · Garantia 30 dias
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA isVisible={ctaVisible} />
    </div>
  );
}
