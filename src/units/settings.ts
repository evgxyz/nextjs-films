
import {Lang, langDefault} from '@/units/lang';

export interface Settings {
  cookies: Record<string, string>,
  lang: Lang,
}

export const settingsDefault: Settings = {
  cookies: {},
  lang: langDefault,
}