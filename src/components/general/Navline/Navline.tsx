
import {useAppSelector} from '@/store';
import {PageEnv} from '@/units/page-env';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import styles from './Navline.module.scss';

interface NavlineProps {
  pageEnv: PageEnv,
}

export function Navline({pageEnv}: NavlineProps) {

  const lang = useAppSelector(state => state.settings.lang);

  const {navStack = []} = pageEnv;

  navStack.unshift({
    url: '/', 
    text: strlang('INDEX_PAGE_TITLE', lang)
  });

  return (
    <div className={styles['body']}>
      <pre>{'Navline: pageEnv:' + JSON.stringify(navStack)}</pre>
      <ul className={styles['list']}>
        { navStack.map((item, idx) =>
            <li key={idx}>
              { 
                item.url ? 
                  <Link href={item.url}>{item.text}</Link>
                : item.text
              }
            </li>
          )
        }
      </ul>
    </div>
  )
}