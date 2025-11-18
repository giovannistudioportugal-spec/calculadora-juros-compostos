
import React from 'react';
import type { CalculationInput } from '../types';

interface InputGroupProps {
  label: string;
  children: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, children }) => (
  <div className="flex flex-col">
    <label className="mb-1.5 font-semibold text-slate-600">{label}</label>
    {children}
  </div>
);

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ prefix = 'R$', ...props }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
      {prefix}
    </span>
    <input
      type="number"
      step="0.01"
      min="0"
      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-brand-red-500 focus:border-brand-red-500 transition"
      {...props}
    />
  </div>
);

interface CalculatorFormProps {
  inputs: CalculationInput;
  setInputs: React.Dispatch<React.SetStateAction<CalculationInput>>;
  onCalculate: () => void;
  onClear: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, setInputs, onCalculate, onClear }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InputGroup label="Valor Inicial">
          <CurrencyInput name="initialValue" value={inputs.initialValue} onChange={handleChange} placeholder="1.000,00" />
        </InputGroup>
        <InputGroup label="Valor Mensal">
          <CurrencyInput name="monthlyValue" value={inputs.monthlyValue} onChange={handleChange} placeholder="1.000,00" />
        </InputGroup>
        <InputGroup label="Taxa de Juros">
            <div className="flex gap-2">
                <div className="relative flex-grow">
                    <input
                        type="number"
                        name="interestRate"
                        value={inputs.interestRate}
                        onChange={handleChange}
                        placeholder="8"
                        step="0.01"
                        min="0"
                        className="w-full pr-10 pl-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-brand-red-500 focus:border-brand-red-500 transition"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">%</span>
                </div>
                <select 
                    name="rateType" 
                    value={inputs.rateType} 
                    onChange={handleChange}
                    className="border border-slate-300 rounded-md shadow-sm focus:ring-brand-red-500 focus:border-brand-red-500 transition"
                >
                    <option value="yearly">anual</option>
                    <option value="monthly">mensal</option>
                </select>
            </div>
        </InputGroup>
        <InputGroup label="Período">
            <div className="flex gap-2">
                <input
                    type="number"
                    name="period"
                    value={inputs.period}
                    onChange={handleChange}
                    placeholder="20"
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-brand-red-500 focus:border-brand-red-500 transition"
                />
                <select 
                    name="periodType" 
                    value={inputs.periodType} 
                    onChange={handleChange}
                    className="border border-slate-300 rounded-md shadow-sm focus:ring-brand-red-500 focus:border-brand-red-500 transition"
                >
                    <option value="years">ano(s)</option>
                    <option value="months">mes(es)</option>
                </select>
            </div>
        </InputGroup>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button 
            type="submit" 
            className="w-full sm:w-auto bg-brand-red-700 text-white font-bold py-3 px-8 rounded-md hover:bg-brand-red-800 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red-500"
        >
          Calcular
        </button>
        <button 
            type="button" 
            onClick={onClear}
            className="w-full sm:w-auto text-brand-red-700 font-semibold hover:text-brand-red-900 transition-colors"
        >
          Limpar
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
