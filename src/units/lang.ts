
import langDictRU from '@/data/lang/ru';
import langDictEN from '@/data/lang/en';

export enum Lang {
  RU = 'RU',
  EN = 'EN',
}

export const langsAll = Object.keys(Lang) as Lang[];

type LangDict = Record<string, Record<string, string>>;

const langDict: LangDict = {
  [Lang.RU.valueOf()]: langDictRU,
  [Lang.EN.valueOf()]: langDictEN,
};

export const langDefault = Lang.RU;
export type LangStrKey = string; //(keyof typeof langDictRU) 

/**
 * Checks whether the string code is a valid language code
 * @param str - string code
 * @returns boolean
 */
export function isLang(str: string): boolean {
  return langsAll.includes(str as Lang);
}

/**
 * Returns a string from the dictionary
 * @param key - key of the text string
 * @param lang - language
 * @returns a string in the specified language from the dictionary
 */
export function strlang(key: LangStrKey, lang: Lang = Lang.RU): string {
  return langDict[lang]?.[key] ?? langDict[langDefault]?.[key] ?? key;
}