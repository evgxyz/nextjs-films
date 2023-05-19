
import css from './MessageBox.module.scss';

interface MessageBoxProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: string,
  text?: string,
}

export function MessageBox({type = 'INFO', title, text}: MessageBoxProps) {
  return (
    <div className={[css['body'], css[type.toLowerCase()]].join(' ')}>
      <h3 className={css['title']}>{title}</h3>
      {text && <div className={css['text']}>{text}</div>}
    </div>
  )
}