import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 py-8 px-4">
        <div className="container max-w-lg mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Fale Conosco
            </h1>
            <p className="text-muted-foreground">
              Estamos aqui para ajudar você!
            </p>
          </div>

          {/* Contact Info */}
          <section className="bg-card rounded-2xl border border-border p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-muted-foreground">contato@mounjanatural.com.br</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">WhatsApp</p>
                <p className="text-muted-foreground">(11) 99999-9999</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Horário de Atendimento</p>
                <p className="text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="bg-card rounded-2xl border border-border p-5">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Envie sua mensagem
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-small font-medium text-foreground mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-small font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-small font-medium text-foreground mb-1.5">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground font-semibold py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </section>

          {/* FAQ Summary */}
          <section className="space-y-3">
            <h2 className="font-semibold text-foreground text-center">
              Perguntas Frequentes
            </h2>
            
            {[
              {
                q: "Não recebi meu acesso, o que fazer?",
                a: "Verifique sua pasta de spam. Se não encontrar, entre em contato pelo WhatsApp para suporte imediato.",
              },
              {
                q: "Como solicitar reembolso?",
                a: "Envie um email para contato@mounjanatural.com.br com o assunto 'Reembolso' e seu email de compra.",
              },
              {
                q: "Posso acessar pelo celular?",
                a: "Sim! A área de membros funciona em qualquer dispositivo com acesso à internet.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-surface rounded-xl border border-border p-4">
                <p className="font-medium text-foreground mb-2">{item.q}</p>
                <p className="text-small text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
