
import {useAppSelector} from '@/store';
import {PageEnv} from '@/units/page-env';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import css from './Navline.module.scss';

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
    <div className={css['body']}>
      <pre>{'Navline: pageEnv:' + JSON.stringify(navStack)}</pre>
      <ul className={css['list']}>
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