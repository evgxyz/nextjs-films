
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import _ from 'lodash';
import css from './MessageBox.module.scss';

interface MessageBoxProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: React.ReactNode,
  text?: React.ReactNode,
  redirect?: {url: string, delay: number}
}

export function MessageBox({
  type = 'INFO', 
  title, 
  text,
  redirect
}: MessageBoxProps) {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);

  if (redirect) {
    _.delay(() => router.push(redirect.url), redirect.delay)
  }

  return (
    <div className={[css['body'], css[type.toLowerCase()]].join(' ')}>
      <h3 className={css['title']}>{title}</h3>
      { text && 
        <div className={css['text']}>{text}</div> 
      }
      { redirect && 
        <div className={css['link']}>
          <Link href={redirect.url}>{strlang('GOTO_LINK', lang)}</Link>
        </div> 
      }
    </div>
  )
}