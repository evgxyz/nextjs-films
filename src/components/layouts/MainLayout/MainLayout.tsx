
import Head from 'next/head';
import {siteName} from '@/config';
import {Header} from '@/components/general/Header';
import {Footer} from '@/components/general/Footer';

interface MainLayoutProps {
  children: JSX.Element | JSX.Element[],
  title?: string
}

export function MainLayout({children, title}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | ${siteName}` : siteName}
        </title>
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