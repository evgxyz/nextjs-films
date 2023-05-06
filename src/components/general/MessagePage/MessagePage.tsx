
import {MainLayout} from '@/components/layouts/MainLayout'
import styles from './MessagePage.module.scss'

interface MessagePageProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: string,
  text?: string,
}

export function MessagePage({type = 'INFO', title, text}: MessagePageProps) {
  return (
    <MainLayout title={title}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.text}>{text}</div>
    </MainLayout>
  )
}