
import Head from 'next/head';
import {useAppSelector} from '@/store';
import {PageEnv} from '@/units/page-env';
import {Header} from '@/components/general/Header';
import {Footer} from '@/components/general/Footer';
import { strlang } from '@/units/lang';

interface MainLayoutProps {
  pageEnv: PageEnv,
  children: JSX.Element | JSX.Element[]
}

export function MainLayout({pageEnv, children}: MainLayoutProps) {

  const lang = useAppSelector(state => state.settings.lang);

  const {
    title = '', 
    description = '', 
    keywords = ''
  } = pageEnv;

  const appName = strlang('APP_NAME', lang);
  const winTitle = (title !== '') ? `${title} | ${appName}` : appName;

  return (
    <>
      <Head>
        <title>{winTitle}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <div id='page-wrapper'>
        <div id='page-content'>
          <header className='page-header'>
            <Header pageEnv={pageEnv} />
          </header>
          <main className='page-main'>
            {children}
          </main>
          <footer className='page-footer'>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  )
}