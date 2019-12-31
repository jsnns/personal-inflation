import {
  GetInflationRate,
  ExpenseData,
  GetDollarWeight,
  ExpenseConfig
} from "../main";

export interface RentYear {
  monthlyCost: number;
  fairMarket: number;
}

const getCostIndex = (a: RentYear) => a.monthlyCost / a.fairMarket;

const getDollarWeight: GetDollarWeight<RentYear> = a => a.monthlyCost * 12;

const getRate: GetInflationRate<RentYear> = (a, b) => {
  return getCostIndex(a) / getCostIndex(b);
};

const data: ExpenseData<RentYear> = {
  2019: { monthlyCost: 2000, fairMarket: 1519 },
  2020: { monthlyCost: 3000, fairMarket: 2900 }
};

export const rent: ExpenseConfig<RentYear> = {
  getRate,
  data,
  getDollarWeight
};
