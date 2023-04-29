
import Head from 'next/head'
import { siteName } from '@/config'
import { Header } from '@/components/general/Header'
import styles from './MainLayout.module.scss'

interface MainLayoutProps {
  children: JSX.Element | JSX.Element[],
  title?: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | ${siteName}` : siteName}
        </title>
      </Head>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        footer
      </footer>
    </>
  )
}