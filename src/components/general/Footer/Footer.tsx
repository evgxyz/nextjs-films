
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import styles from './Footer.module.scss'

export function Footer() {

  const lang = useAppSelector(state => state.settings.lang);

  return (
    <div className={styles.footer}>
      <div>{strlang('FOOTER_SOME_TEXT', lang)}</div>
    </div>
  )
}