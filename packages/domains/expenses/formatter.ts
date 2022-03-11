import { capitalize } from '@nc/utils/formatter';
import { Expenses } from './types';

/**
 * Fields of user expenses visible through the API.
 */
export const publicFields = [
  'merchant_name',
  'amount_in_cents',
  'currency',
  'date_created',
  'status',
];

/**
 * Formats raw expenses data from a database.
 *
 * @param {object} rawData - Raw expenses data from a database.
 * @returns {Expenses} - Formatted expenses data.
 */
export function formatExpenses(rawData: Expenses): Expenses {
  return {
    id: rawData.id,
    merchant_name: capitalize(rawData.merchant_name),
    amount_in_cents: rawData.amount_in_cents,
    currency: rawData.currency.toUpperCase(),
    date_created: rawData.date_created,
    status: capitalize(rawData.status),
  };
}
