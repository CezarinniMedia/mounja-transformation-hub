import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 py-8 px-4">
        <div className="container max-w-2xl mx-auto">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-2xl font-bold text-foreground mb-6">
              Política de Privacidade
            </h1>
            
            <p className="text-small text-muted-foreground mb-8">
              Última atualização: Janeiro de 2025
            </p>

            <section className="space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Esta Política de Privacidade descreve como o Mounja Natural coleta, usa e protege 
                  suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  1. Coleta de Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Coletamos os seguintes tipos de informações:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Dados de identificação: nome, email, telefone</li>
                  <li>Dados de pagamento: processados de forma segura por nossa plataforma de pagamentos</li>
                  <li>Dados de navegação: endereço IP, tipo de navegador, páginas visitadas</li>
                  <li>Dados fornecidos voluntariamente: através de formulários ou contato</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  2. Uso dos Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Utilizamos seus dados para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Processar sua compra e fornecer acesso ao produto</li>
                  <li>Enviar comunicações sobre seu pedido e suporte</li>
                  <li>Enviar conteúdos e ofertas relevantes (com seu consentimento)</li>
                  <li>Melhorar nossos produtos e serviços</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  3. Compartilhamento de Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Seus dados podem ser compartilhados com:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Processadores de pagamento para efetuar transações</li>
                  <li>Plataformas de email marketing para envio de comunicações</li>
                  <li>Ferramentas de análise para melhorar nosso site</li>
                  <li>Autoridades legais quando exigido por lei</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  4. Cookies e Tecnologias de Rastreamento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                  lembrar suas preferências e analisar o tráfego do site. Você pode configurar 
                  seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  5. Seus Direitos (LGPD)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  De acordo com a LGPD, você tem direito a:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Confirmar a existência de tratamento de seus dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar seu consentimento a qualquer momento</li>
                  <li>Solicitar portabilidade dos dados</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  6. Segurança dos Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger 
                  seus dados pessoais contra acesso não autorizado, perda ou alteração. 
                  Utilizamos criptografia SSL em todas as transmissões de dados sensíveis.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  7. Retenção de Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas 
                  nesta política, exceto quando um período de retenção mais longo seja exigido 
                  ou permitido por lei.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  8. Contato
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                  entre em contato através do email: contato@mounjanatural.com.br
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
