
import { useAppSelector, useAppDispatch } from '@/store';
import { setLang } from '@/store/settings';
import { Lang, isLang, langsAll, locstr } from '@/units/locale'
import styles from './UserMenuTray.module.scss'

export function UserMenuTray() {

  const lang = useAppSelector(state => state.settings.lang);
  const dispatch = useAppDispatch();

  const changeLang = function(ev: React.ChangeEvent<HTMLSelectElement>) {
    ev.preventDefault();
    const lang = ev.target.value;
    if (isLang(lang)) {
      dispatch(setLang(lang as Lang))
    }
  }

  return (
    <div className={styles.userMenuTray}>
      {locstr('SELECT_LANG') + ': '}
      <select value={lang} onChange={changeLang}>
        {
          langsAll.map(lang => 
            <option key={lang} value={lang}>{lang}</option>
          )
        }
      </select>
    </div>
  )
}