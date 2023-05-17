
import Head from 'next/head';
import {PageEnv} from '@/units/page-env';
import {Header} from '@/components/general/Header';
import {Footer} from '@/components/general/Footer';

interface MainLayoutProps {
  pageEnv: PageEnv,
  children: JSX.Element | JSX.Element[]
}

export function MainLayout({pageEnv, children}: MainLayoutProps) {

  const {title} = pageEnv;

  return (
    <>
      <Head>
        <title>{title}</title>
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