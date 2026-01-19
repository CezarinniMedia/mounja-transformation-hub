import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Termos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 py-8 px-4">
        <div className="container max-w-2xl mx-auto">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-2xl font-bold text-foreground mb-6">
              Termos de Uso
            </h1>
            
            <p className="text-small text-muted-foreground mb-8">
              Última atualização: Janeiro de 2025
            </p>

            <section className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  1. Aceitação dos Termos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao acessar e utilizar o site mounjanatural.com.br e adquirir nossos produtos ou serviços, 
                  você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar 
                  com qualquer parte destes termos, não deverá utilizar nosso site ou serviços.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  2. Descrição do Serviço
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O Mounja Natural é um programa educacional digital que oferece informações sobre 
                  receitas e métodos naturais para bem-estar e saúde. O acesso ao conteúdo é fornecido 
                  através de uma área de membros online, disponível 24 horas por dia, 7 dias por semana.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  3. Uso do Serviço
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Você concorda em utilizar o serviço apenas para fins legais e de acordo com estes Termos. 
                  É expressamente proibido:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Compartilhar seu acesso com terceiros</li>
                  <li>Reproduzir, distribuir ou comercializar o conteúdo</li>
                  <li>Utilizar o material para fins comerciais sem autorização</li>
                  <li>Tentar contornar medidas de segurança do site</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  4. Propriedade Intelectual
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todo o conteúdo disponibilizado no Mounja Natural, incluindo textos, vídeos, imagens, 
                  gráficos, logotipos e marcas, são de propriedade exclusiva da empresa ou de seus 
                  licenciadores, protegidos pelas leis de direitos autorais e propriedade intelectual.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  5. Garantia e Reembolso
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Oferecemos garantia incondicional de 30 dias a partir da data da compra. Se por 
                  qualquer motivo você não estiver satisfeito com o produto, basta entrar em contato 
                  com nosso suporte para solicitar o reembolso integral, sem perguntas.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  6. Limitação de Responsabilidade
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O conteúdo do Mounja Natural é fornecido apenas para fins informativos e educacionais. 
                  Não nos responsabilizamos por resultados individuais, que podem variar de pessoa para 
                  pessoa. Recomendamos sempre consultar um profissional de saúde antes de iniciar 
                  qualquer programa.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  7. Modificações dos Termos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após sua publicação no site. 
                  O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  8. Contato
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para dúvidas sobre estes Termos de Uso, entre em contato através do email: 
                  contato@mounjanatural.com.br
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
