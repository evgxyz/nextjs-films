
import langDictRU from '@/data/lang/ru';
import langDictEN from '@/data/lang/en';
import { useAppSelector } from '@/store';

export enum Lang {
  RU = 'RU',
  EN = 'EN',
}

export const langs = Object.keys(Lang) as Lang[];

const langDict = {
  [Lang.RU]: langDictRU,
  [Lang.EN]: langDictEN,
}

export const langDefault = Lang.RU;
export type LangStrKey = keyof typeof langDictRU;

export function langStr(key: LangStrKey, lang?: Lang) {
  if (!lang) {
    lang = useAppSelector(state => state.settings.lang);
    lang ??= langDefault;
  }
  return langDict[lang]?.[key] ?? langDict[langDefault]?.[key] ?? '?';
}