
import {ParsedUrlQuery} from 'querystring';
import _ from 'lodash';

/**
 * Replace all '%20' to '+', delete '?' from end
 * @param str - string
 * @returns normalized string
 */
export function normalizeURL(str: string) {
  return (
    str
      .replace(/%20/g, '+')
      .replace(/\?$/, '')
  )
}

/**
 * Set the parameter to URL string
 * @param url - URL string
 * @param paramName - name of the parameter
 * @param paramValue - value of the parameter
 * @returns new URL string
 */
export function setURLParam(url: string, paramName: string, paramValue: string) {
  const [path, query] = url.split('?');
  const params = new URLSearchParams(query);
  params.set(paramName, paramValue);
  let url2 = path;
  const query2 = params.toString();
  if (query2 !== '') {
    url2 += '?' + query2;
  }
  return url2;
}

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
  if (_.isString(paramStr)) {
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
  if (_.isString(paramStr)) {
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
 * @param strArr - array of strings
 * @returns string representation
 */
export function buildStrArrParam(strArr: string[]): string {
  return strArr.join(' ');
}

