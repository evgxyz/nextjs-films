
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
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

  const lang = useAppSelector(state => state.settings.lang);

  return (
    <div className={css['body']}>
      <div className={css['top-line']}>
        <div><MainMenu /></div>
      </div>
      <div className={css['middle-line']}>
        <Link href='/' className={css['logo-box-link']}>
          <div className={css['logo-box']}>
            <div className={css['logo']}>
              <Image
                src='/images/general/logo.png'
                width={0}
                height={0}
                sizes="100vw"
                className={css['logo-img']}
                unoptimized
                alt='Logo'
              />
            </div>
            <div className={css['logo-title']}>
              {strlang('APP_NAME', lang)}
            </div>
          </div>
        </Link>
        <div className={css['right']}>
          <UserMenuTray />
        </div>
      </div>
      <div className={css['navline']}>
        <Navline pageEnv={pageEnv} />
      </div>
    </div>
  )
}