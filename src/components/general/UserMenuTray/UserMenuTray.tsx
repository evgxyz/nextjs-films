
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/store';
import {Lang, isLang, langsAll, strlang} from '@/units/lang';
import {setLang} from '@/store/settings';
import styles from './UserMenuTray.module.scss';

export function UserMenuTray() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const dispatch = useAppDispatch();

  const changeLang = function(ev: React.ChangeEvent<HTMLSelectElement>) {
    ev.preventDefault();
    const lang2 = ev.target.value;
    if (isLang(lang2)) {
      dispatch(setLang(lang2 as Lang));
      router.push(
        {query: {...router.query, lang: lang2}}, 
        undefined, {shallow: true}
      );
    }
  }

  return (
    <div className={styles['user-menu-tray']}>
      { strlang('SELECT_LANG', lang) + ': ' }
      <select value={lang} onChange={changeLang}>
        { langsAll.map(lang => 
            <option key={lang} value={lang}>{lang}</option>
          )
        }
      </select>
    </div>
  )
}