
import { useAppSelector } from '@/store';
import { locstr } from '@/units/locale';
import styles from './Footer.module.scss'

export function Footer() {

  const lang = useAppSelector(state => state.settings.lang);

  return (
    <div className={styles.footer}>
      <div>{locstr('FOOTER_SOME_TEXT', lang)}</div>
    </div>
  )
}