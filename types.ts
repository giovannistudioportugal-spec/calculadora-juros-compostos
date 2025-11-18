
export interface CalculationInput {
  initialValue: string;
  monthlyValue: string;
  interestRate: string;
  rateType: 'monthly' | 'yearly';
  period: string;
  periodType: 'months' | 'years';
}

export interface TableRow {
  month: number;
  monthlyInterest: number;
  totalInvested: number;
  totalInterest: number;
  totalAccumulated: number;
}

export interface ChartDataPoint {
  name: string;
  'Valor Investido': number;
  'Total com Juros': number;
}

export interface CalculationResult {
  finalAmount: number;
  totalInvested: number;
  totalInterest: number;
  tableData: TableRow[];
  chartData: ChartDataPoint[];
}
