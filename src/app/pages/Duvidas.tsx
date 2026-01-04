import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from 'lucide-react';

const faqItems = [
  {
    question: "Posso tomar se tenho gastrite?",
    answer: "Sim! Na verdade, o método pode ajudar a melhorar a gastrite. A boldina tem propriedades anti-inflamatórias que acalmam o estômago. Comece com doses menores (metade da quantidade) e vá aumentando gradualmente conforme seu corpo se adapta."
  },
  {
    question: "Funciona depois dos 50 anos?",
    answer: "Absolutamente! Na verdade, mulheres acima dos 50 costumam ter resultados ainda melhores porque o metabolismo mais lento se beneficia muito da ativação ácida. Muitas das nossas melhores transformações são de mulheres 50+."
  },
  {
    question: "Preciso fazer academia?",
    answer: "Não é obrigatório. O método funciona mesmo sem exercícios. Porém, se você puder fazer caminhadas leves (20-30 minutos por dia), os resultados serão acelerados. Mas foque primeiro em seguir o protocolo direitinho."
  },
  {
    question: "Quanto tempo até ver resultado?",
    answer: "A maioria das mulheres começa a notar diferença na balança a partir do 3º ou 4º dia. Resultados mais visíveis no espelho costumam aparecer entre a 2ª e 3ª semana. Lembre-se: cada corpo é único!"
  },
  {
    question: "E se eu esquecer de tomar um dia?",
    answer: "Não se preocupe! Um dia perdido não vai arruinar seu progresso. Apenas retome no dia seguinte normalmente. O importante é a consistência ao longo do tempo, não a perfeição. Evite compensar tomando dose dobrada."
  },
  {
    question: "Meu marido pode tomar?",
    answer: "Pode sim! O método funciona para homens também, embora tenha sido otimizado para o metabolismo feminino. Homens geralmente precisam de doses um pouco maiores (cerca de 20% a mais) para o mesmo efeito."
  },
  {
    question: "Posso usar adoçante no café?",
    answer: "Não é recomendado. O café deve ser tomado puro para máxima ativação da gastrina. Adoçantes, mesmo os sem calorias, podem interferir na resposta hormonal. Se for muito difícil no início, use no máximo 1/4 de sachê de stevia."
  },
  {
    question: "Vou ficar com flacidez?",
    answer: "Se você seguir as dicas de hidratação (2L de água por dia) e fizer o protocolo anti-flacidez incluído nos bônus, a pele vai se adaptando gradualmente. A perda de peso pelo método é gradual, o que ajuda a evitar flacidez excessiva."
  },
  {
    question: "Posso comer o que quiser?",
    answer: "O método não exige dieta restritiva, mas use o bom senso. Você pode comer normalmente, mas evite exageros em frituras e açúcares. Quanto mais equilibrada for sua alimentação, mais rápidos serão os resultados."
  },
  {
    question: "Por que o freezer é importante?",
    answer: "O choque térmico do freezer quebra as paredes celulares das folhas de boldo, liberando até 3x mais boldina na água. É isso que torna a infusão potencializada. Sem esse passo, o efeito é muito menor."
  },
];

export function Duvidas() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Tenho uma dúvida sobre o Método Mounja Natural.', '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Dúvidas Frequentes" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-surface rounded-xl border-none overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline text-left">
                <span className="text-foreground font-medium text-sm pr-4">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Card */}
        <div className="bg-surface rounded-2xl p-5">
          <p className="text-foreground font-medium mb-3">Ainda com dúvidas?</p>
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            Falar com suporte
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
