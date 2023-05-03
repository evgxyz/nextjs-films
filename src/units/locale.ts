
import langDictRU from '@/data/lang/ru';
import langDictEN from '@/data/lang/en';
import { useAppSelector } from '@/store';

export enum Lang {
  RU = 'RU',
  EN = 'EN',
}

export const langsAll = Object.keys(Lang) as Lang[];

const langDict = {
  [Lang.RU]: langDictRU,
  [Lang.EN]: langDictEN,
}

export const langDefault = Lang.RU;
export type LangStrKey = keyof typeof langDictRU;

export function isLang(str: string) {
  return langsAll.includes(str as Lang);
}

export function locstr(key: LangStrKey, lang: Lang = Lang.RU) {
  return langDict[lang]?.[key] ?? langDict[langDefault]?.[key] ?? '?';
}