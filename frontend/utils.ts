export function calculateConversionRate(
  views: number,
  addToCarts: number,
): number {
  if (views === 0) return 0;
  return (addToCarts / views) * 100;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
