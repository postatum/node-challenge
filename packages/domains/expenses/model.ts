import { Expenses } from './types';
import { getExpenses } from './data/db-expenses';
import { secureTrim } from '@nc/utils/formatter';
import { to } from '@nc/utils/async';
import { formatExpenses, publicFields } from './formatter';
import { InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(urlQuery): Promise<Expenses> {
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
