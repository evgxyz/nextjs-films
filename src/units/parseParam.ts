
import { ParsedUrlQuery } from 'querystring';
import { isString } from '@/units/utils';

export function parseIntParam(query: ParsedUrlQuery, name: string) {
  if (isString(query[name])) {
    const x = parseInt(query[name] as string);
    if (isFinite(x)) {
      return { error: false, value: x };
    }
  }
  return { error: true, value: NaN };
}