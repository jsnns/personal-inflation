import { sum } from "../util";
import {
  GetDollarWeight,
  GetInflationRate,
  ExpenseData,
  ExpenseConfig
} from "../main";

export interface TransportYear {
  monthlyCosts: number[];
  yearlyCosts: number[];
}

const getCostIndex = (a: TransportYear) =>
  sum(a.monthlyCosts) * 12 + sum(a.yearlyCosts);

const getDollarWeight: GetDollarWeight<TransportYear> = a => getCostIndex(a);

const getRate: GetInflationRate<TransportYear> = (a, b) => {
  return getCostIndex(a) / getCostIndex(b);
};

const data: ExpenseData<TransportYear> = {
  2019: { monthlyCosts: [500], yearlyCosts: [1000] },
  2020: { monthlyCosts: [350, 215, 200], yearlyCosts: [1000] }
};

export const transport: ExpenseConfig<TransportYear> = {
  getRate,
  getDollarWeight,
  data
};
