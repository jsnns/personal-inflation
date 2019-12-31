import { RentYear, rent } from "./calculations/rent";
import { IncomeYear, income } from "./calculations/income";
import { TransportYear, transport } from "./calculations/transport";
import { displayMenu } from "./print";

export type GetInflationRate<T> = (a: T, b: T) => number;
export type GetDollarWeight<T> = (a: T) => number;
export type ExpenseData<T> = { [key in Year]: T };
export type Year = 2019 | 2020;

interface Expense {
  rent: RentYear;
  income: IncomeYear;
  transport: TransportYear;
}
type ExpenseType = keyof Expense;

export type ExpenseConfig<T> = {
  getRate: GetInflationRate<T>;
  getDollarWeight: GetDollarWeight<T>;
  data: ExpenseData<T>;
};

export const allExpenseTypes: {
  [key in ExpenseType]: ExpenseConfig<Expense[key]>;
} = {
  rent,
  income,
  transport
};

function getExpenseRate(
  expenseId: ExpenseType,
  years: { start: Year; end: Year }
): number | null {
  const { data, getRate } = allExpenseTypes[expenseId];
  return getRate(data[years.start] as any, data[years.end] as any);
}

function getWeight(expenseId: ExpenseType, year: Year): number {
  return allExpenseTypes[expenseId].getDollarWeight(
    allExpenseTypes[expenseId].data[year] as any
  );
}

function isExpenseType(key: string): key is ExpenseType {
  return Object.keys(allExpenseTypes).includes(key);
}

function main() {
  const values = Object.keys(allExpenseTypes).map(key => {
    if (isExpenseType(key)) {
      return {
        key,
        rate: getExpenseRate(key, { start: 2019, end: 2020 }),
        weight: getWeight(key, 2020)
      };
    }
    return;
  });

  displayMenu(values);
}

main();
