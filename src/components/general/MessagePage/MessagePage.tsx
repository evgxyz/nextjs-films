
import {MainLayout} from '@/components/layouts/MainLayout';
import css from './MessagePage.module.scss';

interface MessagePageProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: string,
  text?: string,
}

export function MessagePage({type = 'INFO', title, text}: MessagePageProps) {

  const pageEnv = {
    title,
    navStack: [{text: title}]
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <div className={[css['body'], css[type.toLowerCase()]].join(' ')}>
        <h1 className={css['title']}>{title}</h1>
        { text && <div className={css['text']}>{text}</div> }
      </div>
    </MainLayout>
  )
}