
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import css from './MainMenu.module.scss';

export function MainMenu() {

  const lang = useAppSelector(state => state.settings.lang);
  
  return (
    <div className={css['body']}>
      <p>
        <Link href='/'>Home</Link>{' | '}
        <Link href='/films'>Films</Link>{' | '}
        <Link href='/about'>About</Link>
      </p>
    </div>
  )
}