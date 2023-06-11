
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessageBox} from '@/components/common/MessageBox';
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
      <MessageBox type={type} title={title} text={text} />
    </MainLayout>
  )
}