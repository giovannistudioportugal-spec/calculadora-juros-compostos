
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <article className="prose max-w-none prose-slate prose-h2:text-brand-red-800 prose-h2:border-b-2 prose-h2:border-brand-red-200 prose-h2:pb-2">
      <h2>Entendendo a Calculadora de Juros Compostos</h2>
      <p>
        Utilizar nossa calculadora de juros compostos é um processo simples e direto. Siga estes passos para simular seus investimentos:
      </p>
      <ol>
        <li><strong>Valor Inicial:</strong> Preencha este campo com a quantia que você deseja investir no início. Se não houver valor inicial, pode deixar como 0.</li>
        <li><strong>Valor Mensal:</strong> Informe o valor que você planeja aportar mensalmente ao longo do período.</li>
        <li><strong>Taxa de Juros:</strong> Insira a taxa de rendimento do seu investimento. Você pode escolher se a taxa é mensal ou anual.</li>
        <li><strong>Período:</strong> Defina por quanto tempo o seu dinheiro ficará investido, seja em meses ou anos.</li>
        <li><strong>Calcular:</strong> Clique em "Calcular" para ver a mágica dos juros compostos acontecer, com projeções detalhadas em gráficos e tabelas.</li>
      </ol>
      <p>
        <strong>Exemplo prático:</strong> Imagine investir R$ 1.000,00 iniciais, com aportes de R$ 1.000,00 todos os meses, durante 20 anos, a uma taxa de juros anual de 8%. Ao final, o total investido seria de R$ 241 mil. No entanto, o resultado final com juros compostos ultrapassaria R$ 573 mil, gerando mais de R$ 332 mil apenas em juros!
      </p>

      <h2>A Fórmula e o Cálculo dos Juros Compostos</h2>
      <p>
        A fórmula matemática que rege os juros compostos para um único aporte é:
      </p>
      <div className="bg-slate-100 p-4 rounded-md text-center font-mono text-lg">
        M = C (1 + i)<sup>t</sup>
      </div>
      <p>Onde:</p>
      <ul>
        <li><strong>M:</strong> Montante final, o valor total acumulado.</li>
        <li><strong>C:</strong> Capital inicial investido.</li>
        <li><strong>i:</strong> Taxa de juros (em formato decimal).</li>
        <li><strong>t:</strong> Tempo da aplicação.</li>
      </ul>
      <p>
        É crucial que a taxa de juros (i) e o tempo (t) estejam na mesma unidade. Se a taxa é mensal, o tempo deve ser em meses. Nossa calculadora lida com essas conversões e com os aportes mensais automaticamente para você.
      </p>

      <h2>Onde os Juros Compostos Atuam?</h2>
      <p>
        Conhecidos como "juros sobre juros", eles são aplicados em diversas operações financeiras. A experiência com eles depende da sua posição: credor ou devedor.
      </p>
      <h3>Investimentos</h3>
      <p>
        Nos investimentos, os juros compostos trabalham a seu favor. O rendimento de cada período é somado ao montante, e o próximo cálculo de juros incidirá sobre esse novo total. É uma excelente forma de acelerar o crescimento do seu patrimônio em CDBs, Tesouro Direto, fundos e até no mercado de ações (reinvestindo os dividendos).
      </p>
      <h3>Financiamentos e Dívidas</h3>
      <p>
        Em financiamentos, empréstimos ou no rotativo do cartão de crédito, os juros compostos atuam contra você. A dívida cresce exponencialmente, tornando-se uma "bola de neve" se não for controlada.
      </p>

      <h2>Diferença: Juros Simples vs. Juros Compostos</h2>
      <p>
        A principal diferença é a base de cálculo. <strong>Juros simples</strong> incidem sempre sobre o capital inicial. Já os <strong>juros compostos</strong> incidem sobre o capital inicial mais os juros acumulados de períodos anteriores.
      </p>
      <p>
        Vamos ver a diferença em um investimento de R$ 5.000,00 com 1% de juros ao mês, sem novos aportes:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
                <tr>
                    <th>Prazo</th>
                    <th>Juros Simples</th>
                    <th>Juros Compostos</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>5 anos</td>
                    <td>R$ 8.000,00</td>
                    <td>R$ 9.083,48</td>
                </tr>
                <tr>
                    <td>10 anos</td>
                    <td>R$ 11.000,00</td>
                    <td>R$ 16.501,93</td>
                </tr>
                <tr>
                    <td>20 anos</td>
                    <td>R$ 17.000,00</td>
                    <td>R$ 54.462,77</td>
                </tr>
                 <tr>
                    <td>30 anos</td>
                    <td>R$ 23.000,00</td>
                    <td>R$ 179.748,21</td>
                </tr>
            </tbody>
        </table>
      </div>
      <p>
        A longo prazo, a diferença é monumental. Essa "bola de neve" de rendimentos é o que torna os juros compostos tão poderosos para investidores.
      </p>
      <blockquote>
        <p>“Os juros compostos são a oitava maravilha do mundo. Aquele que entende, ganha. Aquele que não entende, paga.”</p>
        <cite>- Albert Einstein (atribuído)</cite>
      </blockquote>
    </article>
  );
};

export default InfoSection;
