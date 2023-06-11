
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessageBox} from '@/components/common/MessageBox';
import css from './MessagePage.module.scss';

interface MessagePageProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: string,
  text?: string,
  redirect?: {url: string, delay: number}
}

export function MessagePage(props: MessagePageProps) {

  const title = props.title;

  const pageEnv = {
    title,
    navStack: [{text: title}]
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <MessageBox {...props} />
    </MainLayout>
  )
}