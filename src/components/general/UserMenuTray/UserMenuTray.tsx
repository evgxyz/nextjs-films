
import {useAppSelector, useAppDispatch} from '@/store';
import {Lang, isLang, langsAll, strlang} from '@/units/lang';
import {setLang} from '@/store/settings';
import styles from './UserMenuTray.module.scss';

export function UserMenuTray() {

  const lang = useAppSelector(state => state.settings.lang);
  const dispatch = useAppDispatch();

  const changeLang = function(ev: React.ChangeEvent<HTMLSelectElement>) {
    ev.preventDefault();
    const newLang = ev.target.value;
    if (isLang(newLang)) {
      dispatch(setLang(newLang as Lang))
    }
  }

  return (
    <div className={styles['user-menu-tray']}>
      {strlang('SELECT_LANG', lang) + ': '}
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