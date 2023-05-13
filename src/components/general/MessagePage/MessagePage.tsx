
import {MainLayout} from '@/components/layouts/MainLayout';
import styles from './MessagePage.module.scss';

interface MessagePageProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: string,
  text?: string,
}

export function MessagePage({type = 'INFO', title, text}: MessagePageProps) {
  return (
    <MainLayout title={title}>
      <div className={[styles['body'], styles[type.toLowerCase()]].join(' ')}>
        <h1 className={styles['title']}>{title}</h1>
        {text && <div className={styles['text']}>{text}</div>}
      </div>
    </MainLayout>
  )
}