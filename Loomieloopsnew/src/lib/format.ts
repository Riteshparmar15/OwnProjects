import { FX_FROM_INR, type Currency } from './constants';

export function convertFromInr(amountInr: number, currency: Currency) {
  return amountInr * FX_FROM_INR[currency];
}

export function formatMoney(amountInr: number, currency: Currency) {
  const value = convertFromInr(amountInr, currency);
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : currency === 'EUR' ? 'de-DE' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'INR' ? 0 : 2,
  }).format(value);
}

export function createOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  return `LL-${stamp.slice(-8)}`;
}
