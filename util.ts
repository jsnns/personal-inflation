export function sum(a: number[]): number {
  let sum = 0;

  for (const n of a) {
    sum += n;
  }

  return sum;
}

export function getWeightedAverage(a: { n: number; weight: number }[]): number {
  let sumOfWeights = 0;
  let weightedSum = 0;

  for (const { weight, n } of a) {
    sumOfWeights += weight;
    weightedSum += n * weight;
  }

  return weightedSum / sumOfWeights;
}
