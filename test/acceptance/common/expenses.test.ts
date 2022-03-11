import { Api } from '../utils/api';
import lib from '@nc/utils/db';

describe('Expenses domain API', () => {
  describe('/get-user-expenses', () => {
    test('Should set default query string parameters', (done) => {
      Api.get('/expenses/v1/get-user-expenses?userId=123')
        .expect(200, done);
    });
  });
});
