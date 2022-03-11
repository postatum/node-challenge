import { formatExpenses } from '../formatter';

describe('[Packages | Expenses-domain | Formatter] formatExpenses', () => {
  test('formatExpenses should return an instance of expenses that fits the API model, based on the db raw value', () => {
    return expect(formatExpenses({
      id: 123,
      merchant_name: 'banana seller',
      amount_in_cents: 298,
      currency: 'caps',
      date_created: '2021-09-21T17:57:40.021Z',
      status: 'pending',
    })).toEqual({
      id: 123,
      merchant_name: 'Banana seller',
      amount_in_cents: 298,
      currency: 'CAPS',
      date_created: '2021-09-21T17:57:40.021Z',
      status: 'Pending',
    });
  });
});
