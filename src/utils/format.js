export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const { format: formatDateTime } = new Intl.DateTimeFormat('pt-BR', {
  style: 'datetime',
  datetime: 'BRL',
});
