import { getExpenses } from './data/db-expenses';
import { secureTrim } from '@nc/utils/formatter';
import { to } from '@nc/utils/async';
import { Expenses, URLQuery } from './types';
import { formatExpenses, publicFields } from './formatter';
import { InternalError, NotFound } from '@nc/utils/errors';

/**
 * Gets user expenses dat afrom a database and handles exceptions.
 *
 * @param {URLQuery} urlQuery - URL Query data to search expenses with.
 * @returns {Array<Expenses>} - Promise with formatted Expenses list.
 */
export async function getUserExpenses(urlQuery: URLQuery): Array<Expenses> {
  const [dbError, rawData] = await to(getExpenses(urlQuery));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawData) {
    throw NotFound(`Could not find expenses of user with id ${urlQuery.userId}`);
  }

  return rawData
    .map((expenses) => formatExpenses(secureTrim(expenses, publicFields)));
}
