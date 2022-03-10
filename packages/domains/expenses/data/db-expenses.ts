import { query } from '@nc/utils/db';

export function getExpenses(userId) {
  return query('SELECT * FROM expenses WHERE user_id = $1', [userId])
    .then((response) => response.rows);
}
