
import { ParsedUrlQuery } from 'querystring';
import { isString } from '@/units/utils';

export function parseIntParam(query: ParsedUrlQuery, name: string): [boolean, number] {
  if (isString(query[name])) {
    const x = parseInt(query[name] as string);
    if (isFinite(x)) {
      return [false, x];
    }
  }
  return [true, NaN];
}