
import Head from 'next/head';
import {useAppSelector} from '@/store';
import {Header} from '@/components/general/Header';
import {Footer} from '@/components/general/Footer';

interface MainLayoutProps {
  children: JSX.Element | JSX.Element[]
}

export function MainLayout({children}: MainLayoutProps) {

  const {title, navStack} = useAppSelector(state => state.pageEnv);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div id='page-wrapper'>
        <div id='page-content'>
          <header className='page-header'>
            <Header />
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