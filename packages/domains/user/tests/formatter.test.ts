import { formatUser } from '../formatter';

describe('[Packages | User-domain | Formatter] formatUser', () => {
  test('formatUser should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(formatUser({
      first_name: 'john',
      last_name: 'smith',
      company_name: 'Pleo',
      ssn: 1,
    })).toEqual({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: 1,
    });
  });
});
