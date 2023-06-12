
import Image from 'next/image';
import Link from 'next/link';
import {PageEnv} from '@/units/page-env';
import {MainMenu} from '@/components/general/MainMenu';
import {UserMenuTray} from '@/components/general/UserMenuTray';
import {Navline} from '@/components/general/Navline';
import css from './Header.module.scss';

interface HeaderProps {
  pageEnv: PageEnv,
}

export function Header({pageEnv}: HeaderProps) {
  return (
    <div className={css['body']}>
      <div className={css['top-line']}>
        <div><MainMenu /></div>
      </div>
      <div className={css['middle-line']}>
        <div className={css['logo-box']}>
          <Link href='/'>
            <Image
              src='/images/general/logo.png'
              width={0}
              height={0}
              sizes="100vw"
              className={css['logo-image']}
              unoptimized
              alt='Logo'
            />
          </Link>
        </div>
        <div><UserMenuTray /></div>
      </div>
      <div className={css['navline']}>
        <Navline pageEnv={pageEnv} />
      </div>
    </div>
  )
}