import { getWeightedAverage } from "./util";

export function displayMenu(
  values: (
    | {
        key: "rent" | "income" | "transport";
        rate: number | null;
        weight: number;
      }
    | undefined
  )[]
) {
  console.log("\n= Categories ".padEnd(36, "="));
  console.log(
    values
      .map(value => {
        if (!value) return;
        return (
          value.key.padEnd(15) +
          prettyInflationRate(value.rate || 0).padStart(10) +
          ("$" + value.weight).padStart(10)
        );
      })
      .join("\n")
  );
  console.log("".padEnd(35, "="));

  const average = getWeightedAverage(
    values.map(a => ({ weight: a?.weight || 0, n: a?.rate || 0 }))
  );

  console.log("\t");

  const sign: 1 | -1 = 1 - average > 0 ? 1 : -1;

  switch (sign) {
    case -1:
      console.log(
        "Yay! Your personal inflation rate is negative. That means you're on track to save more this year."
      );
      break;
    case 1:
      console.log(
        "On no, your personal inflation rate is positive. You won't be able to save as much this year. See if you can trim the fat."
      );
  }

  console.log(`Personal Inflation Rate: ${prettyInflationRate(average)}`);
}

function prettyInflationRate(rate: number): string {
  return ((1 - rate) * 100).toFixed(2) + "%";
}
