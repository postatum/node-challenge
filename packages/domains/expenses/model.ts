import { Expenses } from './types';
import { getExpenses } from './data/db-expenses';
import { secureTrim } from '@nc/utils/formatter';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { formatExpenses, publicFields } from './formatter';

export async function getUserExpenses(userId): Promise<Expenses> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawData] = await to(getExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawData) {
    throw NotFound(`Could not find expenses of user with id ${userId}`);
  }

  return rawData
    .map((expenses) => formatExpenses(secureTrim(expenses, publicFields)));
}
