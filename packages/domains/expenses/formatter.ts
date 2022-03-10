import { capitalize } from '@nc/utils/formatter';
import { Expenses } from './types';

export const publicFields = [
  'merchant_name',
  'amount_in_cents',
  'currency',
  'date_created',
  'status',
];

export function formatExpenses(rawData): Expenses {
  return {
    id: rawData.id,
    merchant_name: capitalize(rawData.merchant_name),
    amount_in_cents: rawData.amount_in_cents,
    currency: rawData.currency.toUpperCase(),
    date_created: rawData.date_created,
    status: capitalize(rawData.status),
  };
}
