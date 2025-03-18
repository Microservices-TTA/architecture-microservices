interface SumFunction {
  (a: number, b: number): number;
}

export const sum: SumFunction = (a, b) => {
  return a + b;
};
