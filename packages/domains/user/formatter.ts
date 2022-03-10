import { capitalize } from '@nc/utils/formatter';
import { User } from './types';

export const publicFields = ['first_name', 'last_name', 'company_name'];

export function formatUser(rawUser): User {
  return {
    id: rawUser.id,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
    ssn: rawUser.ssn,
  };
}
