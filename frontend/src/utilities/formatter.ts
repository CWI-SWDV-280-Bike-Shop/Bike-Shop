const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatPrice = (number: number) => {
  if (isNaN(number)) return number;
  return formatter.format(number);
};
