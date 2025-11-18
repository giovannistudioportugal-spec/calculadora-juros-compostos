
import React from 'react';
import type { CalculationResult } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

interface StatCardProps {
    title: string;
    value: string;
    isHighlighted?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, isHighlighted }) => (
    <div className={`p-4 rounded-lg border ${isHighlighted ? 'bg-brand-red-800 text-white border-brand-red-900' : 'bg-slate-100 border-slate-200 text-slate-800'}`}>
        <p className={`text-sm ${isHighlighted ? 'text-red-100' : 'text-slate-500'}`}>{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);


const ResultsDisplay: React.FC<{ results: CalculationResult }> = ({ results }) => {
    const { finalAmount, totalInvested, totalInterest, chartData, tableData } = results;

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
            <p className="label font-bold text-slate-700">{`${label}`}</p>
            {payload.map((pld: any) => (
              <p key={pld.dataKey} style={{ color: pld.color }}>
                {`${pld.name}: ${formatCurrency(pld.value)}`}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-brand-red-800 border-b-2 border-brand-red-200 pb-2">Resultado</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Valor total final" value={formatCurrency(finalAmount)} isHighlighted />
                <StatCard title="Valor total investido" value={formatCurrency(totalInvested)} />
                <StatCard title="Total em juros" value={formatCurrency(totalInterest)} />
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-700 mb-4">Gráfico de Evolução</h3>
                <div className="w-full h-80">
                    <ResponsiveContainer>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#475569" />
                            <YAxis tickFormatter={(value) => formatCurrency(value as number)} stroke="#475569" width={100} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="Total com Juros" stroke="#b91c1c" strokeWidth={2} dot={{ r: 4, fill: '#b91c1c' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="Valor Investido" stroke="#475569" strokeWidth={2} dot={{ r: 4, fill: '#475569' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-700 mb-4">Tabela Detalhada</h3>
                <div className="max-h-96 overflow-y-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left">
                        <thead className="bg-slate-100 sticky top-0">
                            <tr>
                                <th className="p-3 font-semibold">Mês</th>
                                <th className="p-3 font-semibold">Juros do Mês</th>
                                <th className="p-3 font-semibold">Total Investido</th>
                                <th className="p-3 font-semibold">Total Juros</th>
                                <th className="p-3 font-semibold">Total Acumulado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.month} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                    <td className="p-3">{row.month}</td>
                                    <td className="p-3">{formatCurrency(row.monthlyInterest)}</td>
                                    <td className="p-3">{formatCurrency(row.totalInvested)}</td>
                                    <td className="p-3">{formatCurrency(row.totalInterest)}</td>
                                    <td className="p-3 font-semibold">{formatCurrency(row.totalAccumulated)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
