
import {ParsedUrlQuery} from 'querystring';
import {isIntStr, isString} from '@/units/utils';

export function parseIntParam(query: ParsedUrlQuery, name: string): [boolean, number] {
  let error = true;
  let x = NaN;
  const paramStr = query[name];
  if (paramStr && isString(paramStr)) {
    x = parseInt(paramStr as string);
    if (Number.isInteger(x)) {
      error = false;
    }
  }
  return [error, x];
}

export function parseIntArrParam(query: ParsedUrlQuery, name: string): [boolean, number[]] {
  let error = true;
  let xArr: number[] = [];
  const paramStr = query[name];
  if (paramStr && isString(paramStr)) {
    xArr = (paramStr as string).split(/[_,\+]/).map(s => parseInt(s));
    let e = false;
    for (let x of xArr) {
      if (!Number.isInteger(x)) {
        e = true;
        break;
      }
    }
    error = e;
  }
  return [error, xArr];
}