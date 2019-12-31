import {
  ExpenseData,
  GetInflationRate,
  GetDollarWeight,
  ExpenseConfig
} from "../main";

export interface IncomeYear {
  pretaxIncome: number;
  taxRate: number;
}

const getCostIndex = (a: IncomeYear) => a.pretaxIncome;

const getDollarWeight: GetDollarWeight<IncomeYear> = (a: IncomeYear) =>
  getCostIndex(a);

const getRate: GetInflationRate<IncomeYear> = (a, b) => {
  return getCostIndex(b) / getCostIndex(a);
};

const data: ExpenseData<IncomeYear> = {
  2019: { pretaxIncome: 120000, taxRate: 0 },
  2020: { pretaxIncome: 228000, taxRate: 0 }
};

export const income: ExpenseConfig<IncomeYear> = {
  getRate,
  data,
  getDollarWeight
};
