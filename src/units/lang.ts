
import langDictRU from '@/data/lang/ru';
import langDictEN from '@/data/lang/en';
import { useAppSelector } from '@/store';

/* const langs = {
  RU: 'RU',
  EN: 'EN',
}

type TLang = keyof typeof langs; */

export enum Lang {
  RU = 'RU',
  EN = 'EN',
}

const langDict = {
  [Lang.RU]: langDictRU,
  [Lang.EN]: langDictEN,
}

export const defaultLang = Lang.RU;
export type LangStrKey = keyof typeof langDictRU;

export function langStr(key: LangStrKey, lang = Lang.RU) {
  lang || (lang = useAppSelector(state => state.settings.lang));
  return langDict[lang]?.[key] ?? langDict[defaultLang]?.[key] ?? '?';
}