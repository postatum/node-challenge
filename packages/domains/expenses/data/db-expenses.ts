import format from 'pg-format';
import { query } from '@nc/utils/db';

export function getExpenses(urlQuery) {
  // Process filter fields
  const fields = ['merchant_name', 'currency', 'status'];
  let extraFilters = '';
  fields.forEach((field) => {
    if (urlQuery[field] !== undefined) {
      extraFilters += format(
        'AND UPPER(%1$I) LIKE UPPER(%2$L) ',
        field, urlQuery[field]
      );
    }
  });

  const sql = format(
    `SELECT *
    FROM expenses
    WHERE user_id = %1$L %2$s
    ORDER BY %3$I %4$s
    LIMIT %5$s
    OFFSET %6$s`,

    // WHERE
    urlQuery.userId,
    extraFilters,
    // ORDER BY
    urlQuery.sort,
    urlQuery.sortOrder.toUpperCase(),
    // LIMIT
    urlQuery.perPage,
    // OFFSET
    (urlQuery.page - 1) * urlQuery.perPage
  );

  return query(sql, []).then((response) => response.rows);
}
