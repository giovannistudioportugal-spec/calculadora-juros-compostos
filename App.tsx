
import React, { useState, useCallback } from 'react';
import type { CalculationInput, CalculationResult, ChartDataPoint, TableRow } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import InfoSection from './components/InfoSection';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInput>({
    initialValue: '1000',
    monthlyValue: '1000',
    interestRate: '8',
    rateType: 'yearly',
    period: '20',
    periodType: 'years',
  });
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCalculate = useCallback(() => {
    const initialValue = parseFloat(inputs.initialValue) || 0;
    const monthlyValue = parseFloat(inputs.monthlyValue) || 0;
    const interestRate = parseFloat(inputs.interestRate) || 0;
    const period = parseInt(inputs.period, 10) || 0;

    const totalMonths = inputs.periodType === 'years' ? period * 12 : period;
    const monthlyRate = inputs.rateType === 'yearly' ? interestRate / 12 / 100 : interestRate / 100;

    if (totalMonths <= 0) {
      setResults(null);
      return;
    }
    
    let balance = initialValue;
    let totalInvested = initialValue;
    let totalInterest = 0;
    
    const tableData: TableRow[] = [{
        month: 0,
        monthlyInterest: 0,
        totalInvested: initialValue,
        totalInterest: 0,
        totalAccumulated: initialValue
    }];

    for (let m = 1; m <= totalMonths; m++) {
      const monthlyInterest = balance * monthlyRate;
      balance += monthlyInterest + monthlyValue;
      totalInterest += monthlyInterest;
      totalInvested += monthlyValue;

      tableData.push({
        month: m,
        monthlyInterest,
        totalInvested,
        totalInterest,
        totalAccumulated: balance
      });
    }

    const chartData: ChartDataPoint[] = [];
    if (totalMonths <= 36) { // Show monthly for up to 3 years
        chartData.push(...tableData.map(row => ({
            name: `Mês ${row.month}`,
            'Valor Investido': row.totalInvested,
            'Total com Juros': row.totalAccumulated,
        })));
    } else { // Show yearly for more than 3 years
        chartData.push({
            name: 'Início',
            'Valor Investido': tableData[0].totalInvested,
            'Total com Juros': tableData[0].totalAccumulated,
        });
        for (let m = 1; m <= totalMonths; m++) {
            if (m % 12 === 0) {
                const year = m / 12;
                const row = tableData[m];
                chartData.push({
                    name: `Ano ${year}`,
                    'Valor Investido': row.totalInvested,
                    'Total com Juros': row.totalAccumulated,
                });
            }
        }
        // Add last point if not a full year
        if (totalMonths % 12 !== 0) {
            const lastRow = tableData[totalMonths];
             chartData.push({
                name: `Final`,
                'Valor Investido': lastRow.totalInvested,
                'Total com Juros': lastRow.totalAccumulated,
            });
        }
    }

    setResults({
      finalAmount: balance,
      totalInvested: totalInvested,
      totalInterest: totalInterest,
      tableData,
      chartData,
    });
  }, [inputs]);
  
  const handleClear = () => {
    setInputs({
      initialValue: '',
      monthlyValue: '',
      interestRate: '',
      rateType: 'yearly',
      period: '',
      periodType: 'years',
    });
    setResults(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-3xl font-bold text-blue-800">
            Simulador de Juros Compostos
          </h1>
          <p className="text-slate-600 mt-1">
            Planeje seu futuro financeiro e veja o poder dos juros sobre juros em ação.
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200">
          <CalculatorForm inputs={inputs} setInputs={setInputs} onCalculate={handleCalculate} onClear={handleClear} />
        </div>
        
        {results && (
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200">
            <ResultsDisplay results={results} />
          </div>
        )}

        <div className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200">
          <InfoSection />
        </div>
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Calculadora de Juros Compostos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
