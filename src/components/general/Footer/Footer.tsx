
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import css from './Footer.module.scss'

export function Footer() {

  const lang = useAppSelector(state => state.settings.lang);

  return (
    <div className={css['body']}>
      <div>{strlang('FOOTER_SOME_TEXT', lang)}</div>
    </div>
  )
}