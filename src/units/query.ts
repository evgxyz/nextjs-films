
import {ParsedUrlQuery} from 'querystring';
import {isString, isIntStr} from '@/units/utils';

/**
 * Parse an integer parameter from a ParsedUrlQuery object
 * @param query - object from router.query or ctx.query
 * @param name - name of parsed parameter
 * @returns array of error and parsed value
 */
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

/**
 * Parse an array of integers parameter from a ParsedUrlQuery object
 * @param query - object from router.query or ctx.query
 * @param name - name of parsed parameter
 * @returns array of error and parsed value
 */
export function parseIntArrParam(query: ParsedUrlQuery, name: string): [boolean, number[]] {
  let error = true;
  let xArr: number[] = [];
  const paramStr = query[name];
  if (paramStr && isString(paramStr)) {
    xArr = decodeURI(paramStr as string).split(/[_\ ]/).map(s => parseInt(s));
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

/**
 * Build a string representation an array of integers parameter for a url query
 * @param intArr - array of integers
 * @returns string representation
 */
export function buildIntArrParam(intArr: number[]): string {
  return intArr.join(' ');
}

/**
 * Build a string representation an array of strings parameter for a url query
 * @param strArr array of strings
 * @returns string representation
 */
export function buildStrArrParam(strArr: string[]): string {
  return strArr.join(' ');
}