export function formatPrice(value) {
  return new Intl.NumberFormat('uk-UA', {
    useGrouping: true,
    minimumFractionDigits: 0,
    style: 'currency',
    currency: 'UAH'
  }).format(value);
}
