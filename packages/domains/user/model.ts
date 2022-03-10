import { readUser } from './data/db-user';
import { secureTrim } from '@nc/utils/formatter';
import { to } from '@nc/utils/async';
import { User } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { formatUser, publicFields } from './formatter';

export async function getUserDetails(userId): Promise<User> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawUser] = await to(readUser(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return formatUser(secureTrim(rawUser, publicFields));
}
