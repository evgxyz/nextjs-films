
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

export function isLang(str: string) {
  return langsAll.includes(str as Lang);
}

export function strlang(key: LangStrKey, lang: Lang = Lang.RU): string {
  return langDict[lang]?.[key] ?? langDict[langDefault]?.[key] ?? key;
}