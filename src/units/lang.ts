
import langDictRU from '@/data/lang/ru';
import langDictEN from '@/data/lang/en';
import _ from 'lodash';

export enum Lang {
  RU = 'ru',
  EN = 'en',
}

export const langs = Object.values(Lang) as Lang[];

export const langKeys = {
  [Lang.RU]: 'LANG_RU',
  [Lang.EN]: 'LANG_EN',
};

export const langDefault = Lang.RU;

/**
 * Checks whether the value is a valid language code
 * @param value - any value
 * @returns boolean
 */
export function isLang(value: any): boolean {
  return _.isString(value) && langs.includes(value as Lang);
}

export type LangStrKey = string; //(keyof typeof langDictRU) 

type LangDict = Record<string, Record<string, string>>;

const langDict: LangDict = {
  [Lang.RU]: langDictRU,
  [Lang.EN]: langDictEN,
};

/**
 * Returns a string from the dictionary
 * @param key - key of the text string
 * @param lang - language
 * @returns a string in the specified language from the dictionary
 */
export function strlang(key: LangStrKey, lang: Lang = Lang.RU): string {
  return langDict[lang]?.[key] ?? langDict[langDefault]?.[key] ?? key;
}