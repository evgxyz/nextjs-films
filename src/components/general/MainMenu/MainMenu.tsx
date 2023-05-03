
import { useAppSelector } from '@/store';
import { locstr } from '@/units/locale';
import Link from 'next/link';
import styles from './MainMenu.module.scss';

export function MainMenu() {

  const lang = useAppSelector(state => state.settings.lang);
  
  return (
    <div className={styles.mainMenu}>
      <p>
        <Link href='/'>Home</Link>{' | '}
        <Link href='/films'>Films</Link>{' | '}
        <Link href='/about'>About</Link>
      </p>
    </div>
  )
}