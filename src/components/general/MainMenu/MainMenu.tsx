
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import css from './MainMenu.module.scss';

export function MainMenu() {

  const lang = useAppSelector(state => state.settings.lang);
  
  return (
    <div className={css['body']}>
        <Link href='/'>{strlang('INDEX_PAGE_TITLE', lang)}</Link>{' | '}
        <Link href='/films'>{strlang('FILM_SEARCH_SHORT_TITLE', lang)}</Link>{' | '}
        <Link href='/about'>{strlang('ABOUT_PAGE_SHORT_TITLE', lang)}</Link>
    </div>
  )
}