export function formatLKR(amount: number): string {
  return `LKR ${Math.trunc(amount).toLocaleString('en-LK')}`;
}

export function formatPriceDisplay(
  amount: number | null,
  showFrom: boolean,
  askForPricing: boolean
): string {
  if (askForPricing || amount === null || amount === 0) {
    return 'Ask for pricing';
  }

  if (showFrom) {
    return `From ${formatLKR(amount)}`;
  }

  return formatLKR(amount);
}
