export const validate = {
  lengthOf: (value: string) => ({
    isGreaterThan: (expectedLength: number) => () =>
      value.length < expectedLength
        ? [`${value} should be at least ${expectedLength} characters long`]
        : [],
  }),
  number: (value: number) => ({
    isPositive: () => () => value <= 0 ? [`${value} should be positive`] : [],
  }),
};
