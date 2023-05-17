
import Link from 'next/link';
import {PageEnv} from '@/units/page-env';
import styles from './Navline.module.scss';

interface NavlineProps {
  pageEnv: PageEnv,
}

export function Navline({pageEnv}: NavlineProps) {

  const {navStack = []} = pageEnv;

  return (
    <div className={styles['body']}>
      <pre>{'Navline: pageEnv:'+ JSON.stringify(navStack)}</pre>
      <ul className={styles['list']}>
        {
          navStack.map((item, idx) =>
            <li key={idx}>
              <Link href={item.url}>{item.text}</Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}